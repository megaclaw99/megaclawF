# MegaClaw Frontend - Complete File List

## 📁 Directory Structure

```
megaclawF/
├── .gitignore              # Git ignore rules
├── PUSH_TO_GITHUB.md       # Instructions for pushing to GitHub
├── README.md               # Main documentation
├── config.js               # Centralized configuration (server-side)
├── package.json            # NPM dependencies & scripts
├── railway.json            # Railway deployment config
├── server.js               # Express server (serves static files + /skill route)
│
└── public/                 # Static files served by Express
    ├── index.html          # Main SPA HTML page
    │
    ├── css/
    │   └── style.css       # Complete CSS (dark/light theme)
    │
    └── js/
        ├── config.js       # Config for browser (copied from root)
        └── app.js          # Client-side JavaScript
```

## 📄 File Descriptions

### Root Files

**`.gitignore`**
- Excludes node_modules, .env, logs, OS files
- Standard Node.js project ignore rules

**`config.js`** (73 lines)
- Centralized configuration for entire site
- Brand name, tagline, emojis
- Chain info (MegaETH RPC, explorer, chain ID)
- Token Factory contract address
- Featured token data
- Social links
- Export: `module.exports = CONFIG`

**`package.json`** (18 lines)
- Project metadata
- Dependencies: `express@^4.18.2`
- Scripts: `start`, `dev`
- Node version: `>=18.0.0`

**`server.js`** (120 lines)
- Express web server
- Serves static files from `/public`
- Route `/skill` → returns generated skill.md
- Route `/api/v1/config` → returns JSON config
- SPA fallback: all routes → index.html
- Generates skill.md dynamically from CONFIG

**`railway.json`** (9 lines)
- Railway deployment configuration
- Builder: NIXPACKS
- Start command: `npm start`
- Restart policy: ON_FAILURE (max 10 retries)

**`README.md`** (150 lines)
- Project overview
- Features list
- Quick start guide
- Deployment instructions (Railway, Vercel, Netlify, etc.)
- Chain info (MegaETH)
- API endpoints
- Contributing guide

**`PUSH_TO_GITHUB.md`** (115 lines)
- Instructions for pushing to GitHub (SSH, HTTPS, GitHub CLI)
- What was done summary
- Next steps (Railway deployment)
- Differences from original (removed four.meme)

---

### Public Files

**`public/index.html`** (340 lines)
- Main SPA HTML page
- Single-page app with multiple views:
  - Main page (hero, featured token, recent launches)
  - Terms of Service
  - Privacy Policy
  - Cookie Policy
  - Documentation
- Navigation with page switching
- Includes theme toggle button
- Links to config.js and app.js

**`public/css/style.css`** (670 lines)
- Complete CSS with dark/light theme support
- CSS variables for theming
- Responsive design (mobile-first)
- Sections:
  - Root variables (colors, spacing)
  - Matrix background animation
  - Navigation (sticky)
  - Hero section (typing effect, floating mascot)
  - Featured token card
  - Installation steps grid
  - Terminal UI
  - Recent launches grid
  - Footer
  - Copy toast notification
  - SPA page switching
  - Responsive breakpoints

**`public/js/config.js`** (73 lines)
- Copy of root config.js
- Used by browser-side JavaScript
- Same configuration as server

**`public/js/app.js`** (240 lines)
- Client-side JavaScript
- Page navigation (SPA)
- Theme toggle (dark/light mode, localStorage)
- Clipboard copy functionality
- Token loading from Blockscout API:
  - Strategy 1: Factory transactions
  - Strategy 2: Event logs
  - Strategy 3: Internal transactions
- Token enrichment (fetch name/symbol)
- Real-time refresh (30s interval)
- No backend needed (all data from Blockscout)

---

## 🔧 Key Features

1. **Zero backend dependency** — All token data fetched from Blockscout API
2. **Dark/light theme** — Persists in localStorage
3. **SPA architecture** — No page reloads
4. **Skill.md generation** — Dynamically created from config
5. **Responsive design** — Works on mobile/desktop
6. **Copy-to-clipboard** — For contract addresses
7. **Real-time updates** — Auto-refresh every 30s

## 📊 File Sizes

```
Total files: 11
Total lines: ~1,798

Breakdown:
- HTML: 340 lines
- CSS: 670 lines
- JavaScript: 313 lines (app.js) + 120 lines (server.js)
- Config: 73 lines
- Docs: 265 lines (README) + 115 lines (PUSH_TO_GITHUB)
```

## 🎨 Customization

All branding/config in **`config.js`**:
- Change `BRAND_NAME` to rename the protocol
- Update `TOKEN_FACTORY` to use different contract
- Modify `CHAIN_*` to switch chains
- Edit `FEATURED_*` to showcase different token

## 🚀 Deploy Checklist

- [x] All files created
- [x] Git initialized
- [x] Git committed
- [x] Remote added
- [ ] **Push to GitHub** ← YOU ARE HERE
- [ ] Connect Railway to repo
- [ ] Deploy (auto-detects railway.json)
- [ ] Add custom domain

---

Everything is **translated to English** and **four.meme-free**! 🦞⚡
