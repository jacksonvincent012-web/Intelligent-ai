export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const r = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await r.text();

    const results = [];
    const regex = /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const url = match[1].replace(/\/\/duckduckgo\.com\/l\/\?uddg=([^&]+).*/, '$1');
      const title = match[2].replace(/<[^>]*>/g, '').trim();
      if (url && title) results.push({ title, url: decodeURIComponent(url) });
      if (results.length >= 8) break;
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
