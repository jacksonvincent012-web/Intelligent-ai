export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const results = [];
  const seen = new Set();

  function add(title, url, snippet, source) {
    const key = title + url;
    if (seen.has(key) || results.length >= 8) return;
    seen.add(key);
    results.push({ title: title.slice(0, 200), url: url.slice(0, 500), snippet: (snippet || '').slice(0, 300), source });
  }

  // 1) DuckDuckGo Instant Answer API
  try {
    const ia = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    const d = await ia.json();
    if (d.AbstractText) add(d.Headline || 'Summary', d.AbstractURL || '', d.AbstractText, 'DuckDuckGo');
    if (d.RelatedTopics) for (const t of d.RelatedTopics) {
      if (t.Text) add(t.Text.split(' - ')[0] || t.Text, t.FirstURL || '', t.Text, 'DuckDuckGo');
    }
  } catch (_) {}

  // 2) DuckDuckGo HTML scrape for snippets
  try {
    const html = await (await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    })).text();
    const items = html.split('<div class="result results_links_deep highlight_d">');
    for (const item of items) {
      const tMatch = item.match(/<a[^>]*class="result__a"[^>]*>([\s\S]*?)<\/a>/);
      const uMatch = item.match(/uddg=([^&"]+)/);
      const sMatch = item.match(/class="result__snippet">([\s\S]*?)<\/a>/);
      if (tMatch && uMatch) {
        add(tMatch[1].replace(/<[^>]*>/g, '').trim(), decodeURIComponent(uMatch[1]),
            sMatch ? sMatch[1].replace(/<[^>]*>/g, '').trim() : '', 'DuckDuckGo');
      }
    }
  } catch (_) {}

  // 3) Google scrape fallback
  if (results.length < 4) {
    try {
      const html = await (await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
      })).text();
      const items = html.split('<div class="g"');
      for (const item of items) {
        const tMatch = item.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
        const uMatch = item.match(/href="\/url\?q=([^"&]+)/);
        const sMatch = item.match(/<div[^>]*class="[^"]*VwiC3b[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        if (tMatch && uMatch) {
          add(tMatch[1].replace(/<[^>]*>/g, '').trim(), decodeURIComponent(uMatch[1]),
              sMatch ? sMatch[1].replace(/<[^>]*>/g, '').trim() : '', 'Google');
        }
      }
    } catch (_) {}
  }

  res.json({ results });
}
