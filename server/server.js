const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static site from repo root
app.use(express.static(path.join(__dirname, '..')));

// Simple /api/search that proxies to Quotable by default
app.get('/api/search', async (req, res) => {
  try {
    // If you have a Firecrawl command/binary you want to run, detect it here (not implemented by default)
    if (process.env.FIRECRAWL_CMD) {
      return res.status(501).json({
        error: 'FIRECRAWL_CMD is set but server-side integration is not implemented in this scaffold. Provide a Firecrawl endpoint or request integration.'
      });
    }

    const { query, author, minLength, maxLength, limit } = req.query;
    const params = new URLSearchParams();
    params.append('limit', limit || '20');
    if (query) params.append('query', query);
    if (author) params.append('author', author);
    if (minLength) params.append('minLength', minLength);
    if (maxLength) params.append('maxLength', maxLength);

    const url = 'https://api.quotable.io/quotes?' + params.toString();

    const resp = await axios.get(url, { timeout: 10000 });

    // Return the provider results directly so the frontend can render them
    return res.json({ source: 'quotable', results: resp.data.results, totalCount: resp.data.totalCount || resp.data.count || 0 });
  } catch (err) {
    console.error('Search error', err && err.toString());
    const body = err.response && err.response.data ? err.response.data : undefined;
    return res.status(500).json({ error: 'Failed to fetch quotes', details: err.message, body });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
