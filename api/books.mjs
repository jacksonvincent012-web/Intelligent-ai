export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const results = [];
  const seen = new Set();

  // 1) Open Library search
  try {
    const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12&fields=key,title,author_name,first_publish_year,isbn,cover_i,edition_count,language`);
    const d = await r.json();
    if (d.docs) for (const b of d.docs) {
      const key = b.key || '';
      const title = b.title || '';
      if (seen.has(key)) continue;
      seen.add(key);
      const cover = b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : '';
      results.push({
        id: key.replace('/works/', ''),
        title, author: (b.author_name || []).join(', '), year: b.first_publish_year || '',
        pages: b.edition_count ? `${b.edition_count} editions` : '',
        cover, source: 'Open Library', url: `https://openlibrary.org${key}`
      });
    }
  } catch (_) {}

  // 2) Project Gutenberg (if OL returns few results)
  if (results.length < 4) {
    try {
      const r = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
      const d = await r.json();
      if (d.results) for (const b of d.results) {
        const key = 'gutenberg_' + b.id;
        if (seen.has(key)) continue;
        seen.add(key);
        const title = b.title || '';
        const author = (b.authors || []).map(a => a.name).join(', ');
        const cover = b.formats?.['image/jpeg'] || '';
        const txtUrl = b.formats?.['text/plain; charset=us-ascii'] || b.formats?.['text/plain'] || '';
        results.push({
          id: key, title, author, year: b.download_count ? `${b.download_count.toLocaleString()} downloads` : '',
          pages: '', cover, source: 'Gutenberg', url: txtUrl
        });
      }
    } catch (_) {}
  }

  res.json({ results: results.slice(0, 15) });
}
