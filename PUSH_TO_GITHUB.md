# Push to GitHub Instructions

The code is ready in `/home/smart_user/.openclaw/workspace/megaclawF/`

Git is initialized and committed. Now you need to push it to GitHub.

## Method 1: SSH (Recommended)

If you have SSH keys configured for GitHub:

```bash
cd /home/smart_user/.openclaw/workspace/megaclawF
git remote set-url origin git@github.com:megaclaw99/megaclawF.git
git push -u origin main
```

## Method 2: Personal Access Token

If using HTTPS with a GitHub Personal Access Token:

```bash
cd /home/smart_user/.openclaw/workspace/megaclawF
git remote set-url origin https://github.com/megaclaw99/megaclawF.git
git push -u origin main
# When prompted, enter your GitHub username and PAT (not password)
```

## Method 3: GitHub CLI

If you have GitHub CLI (`gh`) installed:

```bash
cd /home/smart_user/.openclaw/workspace/megaclawF
gh auth login
git push -u origin main
```

## What Was Done

✅ Created clean frontend code (no four.meme/Moltbook/Moltx references)
✅ All text translated to English
✅ Focused on MegaETH Chain
✅ Git initialized and committed
✅ Remote added: https://github.com/megaclaw99/megaclawF

## Files Created

- `server.js` — Express server
- `config.js` — Centralized config (root + public/js/)
- `package.json` — Dependencies
- `railway.json` — Railway deployment config
- `public/index.html` — Main HTML page
- `public/js/app.js` — Client-side JavaScript
- `public/css/style.css` — Styles (complete CSS)
- `.gitignore` — Git ignore rules
- `README.md` — Documentation

## Next Steps After Push

1. **Deploy to Railway:**
   - Go to Railway dashboard
   - Create new project
   - Connect GitHub repo: `megaclaw99/megaclawF`
   - Railway will auto-detect `railway.json` and deploy
   - No env vars needed

2. **Configure Domain:**
   - In Railway project settings → Domains
   - Add custom domain: `megaclaw.io` or subdomain
   - Update DNS records as instructed

3. **Test:**
   - Visit deployed URL
   - Check `/skill` endpoint
   - Verify token launches display correctly

## Differences from Original

**Removed:**
- All "Four.meme" references
- Moltbook integration
- Moltx integration
- "POWERED BY Four.meme" tagline

**Updated:**
- Tagline: "AI Agent Token Launchpad on MegaETH"
- Description: "Launch tokens on MegaETH Chain with AI agents"
- Focus: 100% MegaETH Chain
- Platform: Changed from "Four.meme" to "MegaETH"

**Kept:**
- TokenFactory contract address
- MegaETH chain configuration
- Real-time token tracking from Blockscout
- All functionality (skill.md, token display, etc.)

All code is in English with English comments! 🦞⚡
