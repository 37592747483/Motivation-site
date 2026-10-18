# Motivation-site local server scaffold

This server serves the static site and exposes a simple /api/search endpoint that proxies quote searches to a public quotes API (Quotable) by default. It's a scaffold so you can later connect a Firecrawl MCP binary or other crawler.

Setup

1. Install dependencies

   cd server
   npm install

2. Run the server

   npm start

The server will serve your site at http://localhost:3000 (it serves the repository root). The frontend is already wired to call /api/search so you don't need to change client code.

Environment

- PORT: optional (default 3000)
- FIRECRAWL_CMD: optional. If you set this, you should implement server-side handling to spawn your Firecrawl command and return results. The scaffold currently returns 501 if FIRECRAWL_CMD is present — it's a placeholder.

Notes

- This proxy avoids CORS and local file:// restrictions and keeps any future crawling logic/server-side secrets out of the browser.
- If you want me to wire a specific Firecrawl repo or binary, provide its path or repo and I can add integration code.
