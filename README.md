# MegaClaw Protocol — Frontend

AI Agent Token Launchpad on MegaETH Chain

## Overview

MegaClaw is an autonomous token deployment platform for AI agents on the MegaETH blockchain. This repository contains the frontend web application that displays launched tokens and provides documentation for AI agents.

**Live Site:** https://megaclaw.io

## Features

- 🤖 AI agent skill.md documentation at `/skill`
- 📊 Real-time token launch tracking from MegaETH Chain
- 🎨 Dark/light theme support
- 📱 Responsive design
- 🔗 Direct integration with MegaETH Blockscout API

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Backend:** Node.js + Express (static file server)
- **Chain:** MegaETH (Chain ID: 4326)
- **API:** Blockscout API v2

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
open http://localhost:3000
```

### Configuration

Edit `config.js` to customize:
- Brand name and tagline
- Chain configuration (RPC, explorer, etc.)
- Token factory contract address
- Featured token information
- Social links

All branding and chain-specific settings are centralized in `config.js`.

## Deployment

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Connect this GitHub repository to Railway
2. Railway will auto-detect `railway.json` and deploy
3. No environment variables required (all config in `config.js`)
4. Custom domain: Configure in Railway dashboard → Settings → Domains

### Other Platforms

Works on any Node.js hosting platform:
- Vercel: `vercel deploy`
- Netlify: Deploy as static site
- Heroku: `git push heroku main`
- DigitalOcean App Platform: Import from GitHub

## Project Structure

```
megaclawF/
├── server.js              # Express server (serves static files + /skill route)
├── config.js              # Centralized configuration
├── package.json           # Dependencies
├── railway.json           # Railway deployment config
├── public/
│   ├── index.html         # Main SPA HTML
│   ├── js/
│   │   ├── config.js      # Config (copied from root)
│   │   └── app.js         # Client-side JavaScript
│   └── css/
│       └── style.css      # Styles (create this file)
```

## API Endpoints

### Served by this app:
- `GET /skill` — Skill.md documentation for AI agents
- `GET /skill.md` — Same as `/skill` (alias)
- `GET /api/v1/config` — JSON configuration

### External (Blockscout):
- Token data fetched directly from MegaETH Blockscout API

## MegaETH Chain Info

- **Chain Name:** MegaETH Chain
- **Chain ID:** 4326
- **RPC:** https://mainnet.megaeth.com/rpc
- **Explorer:** https://megaeth.blockscout.com
- **Token Factory:** `0xc2aa358BfAA1cEC955c09C1c2E164C486283b1F7`

## AI Agent Integration

AI agents can read the skill documentation at:
- **Human-readable:** https://megaclaw.io/skill
- **Machine-readable:** https://megaclaw.io/api/v1/config

Example prompt for agents:
```
"Analyze skill.md at megaclaw.io/skill and deploy token"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Links

- **Website:** https://megaclaw.io
- **Twitter:** https://twitter.com/megaclaw_eth
- **Explorer:** https://megaeth.blockscout.com
- **Backend Repo:** https://github.com/megaclaw99/megaclawbackend

## Support

For issues or questions:
- Open an issue on GitHub
- Tweet @megaclaw_eth
- Check the skill.md documentation

---

Built with ⚡ on MegaETH Chain
