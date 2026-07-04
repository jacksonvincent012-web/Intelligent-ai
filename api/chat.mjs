const API_BASE = 'https://openrouter.ai/api/v1';
const ALLOWED_MODELS = [
  'openai/gpt-4o-mini', 'openai/gpt-4o', 'openai/gpt-4o-mini-2024-07-18',
  'openai/gpt-4o-2024-08-06', 'openai/o3-mini', 'openai/o1-mini',
  'anthropic/claude-3.5-sonnet', 'anthropic/claude-3-haiku',
  'meta-llama/llama-3.3-70b-instruct',
  'meta-llama/llama-3.2-90b-vision-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'cohere/north-mini-code:free',
  'openai/gpt-oss-120b:free',
  'google/gemma-4-26b-a4b-it:free',
  'google/gemma-4-31b-it:free',
  'nousresearch/hermes-3-llama-3.1-405b:free'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.V_MIND_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured with an API key. Contact the site owner.' });
  }

  const { model, messages, tools, tool_choice, stream = true } = req.body;
  if (!model || !messages) {
    return res.status(400).json({ error: 'Missing model or messages' });
  }

  if (!ALLOWED_MODELS.includes(model)) {
    return res.status(400).json({ error: 'Model not allowed' });
  }

  try {
    const body = { model, messages, stream };
    if (tools) body.tools = tools;
    if (tool_choice) body.tool_choice = tool_choice;

    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://vm-deploy.vercel.app'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `API error: ${err}` });
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(decoder.decode(value));
      }
      res.end();
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
