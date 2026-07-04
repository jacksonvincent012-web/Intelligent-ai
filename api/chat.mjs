const API_BASE = 'https://openrouter.ai/api/v1';
const ALLOWED_MODELS = [
  'openai/gpt-4o-mini', 'openai/gpt-4o',
  'anthropic/claude-3.5-sonnet',
  'meta-llama/llama-3.3-70b-instruct',
  'cohere/north-mini-code:free',
  'openai/gpt-oss-120b:free',
  'google/gemma-4-26b-a4b-it:free',
  'google/gemma-4-31b-it:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'mistralai/mistral-7b-instruct'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.V_MIND_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured with an API key. Contact the site owner.' });
  }

  const { model, messages } = req.body;
  if (!model || !messages) {
    return res.status(400).json({ error: 'Missing model or messages' });
  }

  if (!ALLOWED_MODELS.includes(model)) {
    return res.status(400).json({ error: 'Model not allowed' });
  }

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://vm-deploy.vercel.app'
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `API error: ${err}` });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
