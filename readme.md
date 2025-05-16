# DeepSeek Cludflare Proxy 🚀

A Cloudflare Worker that:

1. Proxies requests to **DeepSeek AI** (`https://api.deepseek.com/v1/chat/completions`).
2. Returns pure JSON: `{ ok: true, text: "..." }`.

---

## ✨ Features

| Feature           | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| 🔒 **Key Safety** | DeepSeek / Cloudflare keys live only inside the Worker (via `wrangler secret`). |
| 🏎 **Edge Fast**   | Runs on Cloudflare’s global edge network—no cold starts, <10 ms median latency. |

---

## ⚙️ Quick Start

```bash
# 1. Install wrangler CLI
npm i -g wrangler

# 2. Init project
wrangler init deepseek-proxy --typescript
cd deepseek-proxy

# 3. Replace src/index.ts with code in this repo
#    (or copy‑paste the snippet below)

# 4. Store secrets (never commit keys!)
wrangler secret put DEEPSEEK_API_KEY

# 5. Dev test (loads vars from wrangler.jsonc / package.json)
npx wrangler dev

# 6. Deploy to edge
wrangler deploy
```
