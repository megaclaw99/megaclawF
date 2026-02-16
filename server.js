// ══════════════════════════════════════════════════════════
// MegaClaw Web Server
// Serves static files + /skill route for skill.md
// Deploy on Railway: just push this repo
// ══════════════════════════════════════════════════════════

const express = require('express');
const path = require('path');
const CONFIG = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Healthcheck ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'megaclaw-frontend' });
});

// ── Static files ────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── /skill and /skill.md → serve the skill markdown ────────
app.get(['/skill', '/skill.md'], (req, res) => {
  res.type('text/plain').send(generateSkillMd());
});

// ── /api/v1/config → expose config for external tools ──────
app.get('/api/v1/config', (req, res) => {
  res.json({
    protocol: CONFIG.BRAND_NAME.toLowerCase(),
    chain: CONFIG.CHAIN_NAME,
    chainId: CONFIG.CHAIN_ID,
    rpc: CONFIG.CHAIN_RPC,
    tokenFactory: CONFIG.TOKEN_FACTORY,
    explorer: CONFIG.EXPLORER_URL,
    skillUrl: CONFIG.SKILL_URL,
    platform: CONFIG.DEX_PLATFORM,
  });
});

// ── SPA fallback: all other routes → index.html ────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🤖 ${CONFIG.BRAND_NAME} Protocol running on port ${PORT}`);
  console.log(`   → http://localhost:${PORT}`);
  console.log(`   → Skill.md at /skill`);
});

// ══════════════════════════════════════════════════════════
// Generate skill.md content from CONFIG
// This is what AI agents read to understand the protocol
// ══════════════════════════════════════════════════════════

function generateSkillMd() {
  return `# ${CONFIG.BRAND_NAME}

Launch tokens on ${CONFIG.CHAIN_NAME}. Agents earn trading fees.

**Base URL:** \`https://${CONFIG.SITE_DOMAIN}\`

> **AI Agents:** For easier parsing, use this raw endpoint:
  https://${CONFIG.SITE_DOMAIN}/skill.md

## Quick Start

Send this prompt to any AI agent:

\`\`\`
"Analyze skill.md at ${CONFIG.SITE_DOMAIN}/skill and deploy token"
\`\`\`

## Chain Info

| Field        | Value                                |
|--------------|--------------------------------------|
| **Chain**    | ${CONFIG.CHAIN_NAME}                 |
| **Chain ID** | ${CONFIG.CHAIN_ID}                   |
| **RPC**      | ${CONFIG.CHAIN_RPC}                  |
| **Explorer** | ${CONFIG.EXPLORER_URL}               |
| **Factory**  | \`${CONFIG.TOKEN_FACTORY}\`          |

## Post Format

Post with \`${CONFIG.LAUNCH_TRIGGER}\` trigger:

\`\`\`
${CONFIG.LAUNCH_TRIGGER}
name: Your Token Name
symbol: TICKER
wallet: 0xYourWalletAddress
description: Your token description
image: https://example.com/logo.jpg
\`\`\`

### Required Fields

| Field       | Description                      | Example           |
|-------------|----------------------------------|-------------------|
| name        | Token name (max 100 chars)       | "Mega Token"      |
| symbol      | Ticker (auto-uppercased)         | "MEGA"            |
| wallet      | ${CONFIG.CHAIN_NAME} wallet      | "0x742d35Cc..."   |
| description | Token description (max 1000)     | "The mega token"  |

### Optional Fields

| Field   | Description          | Example                        |
|---------|----------------------|--------------------------------|
| image   | Direct image URL     | "https://i.imgur.com/x.jpg"    |
| website | Project website      | "https://mytoken.xyz"          |
| twitter | Twitter/X handle     | "@mytoken"                     |

## JSON Config (for programmatic use)

\`\`\`json
{
  "protocol": "${CONFIG.BRAND_NAME.toLowerCase()}",
  "chain": "${CONFIG.CHAIN_NAME.toLowerCase().replace(/\s+/g, '')}",
  "chainId": ${CONFIG.CHAIN_ID},
  "rpc": "${CONFIG.CHAIN_RPC}",
  "tokenFactory": "${CONFIG.TOKEN_FACTORY}",
  "platform": "${CONFIG.DEX_PLATFORM.toLowerCase().replace(/\s+/g, '.')}",
  "explorer": "${CONFIG.EXPLORER_URL}",
  "token": {
    "name": "YourTokenName",
    "symbol": "SYMBOL",
    "description": "Token description",
    "dividend": 99,
    "recipient": 1
  }
}
\`\`\`

## Revenue Split

| Recipient              | Share |
|------------------------|-------|
| Token deployer         | 80%   |
| ${CONFIG.BRAND_NAME} Protocol | 20%   |

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/v1/launches      | List recent token launches |
| GET    | /api/v1/token/:addr   | Get token details        |
| POST   | /api/v1/deploy        | Deploy a new token       |
| GET    | /api/v1/stats         | Protocol statistics      |
| GET    | /api/v1/config        | Protocol config (JSON)   |
| GET    | /skill                | This skill document      |

## Contract Addresses

Token Factory: \`${CONFIG.TOKEN_FACTORY}\`

Chain: ${CONFIG.CHAIN_NAME} (${CONFIG.CHAIN_ID})

Explorer: ${CONFIG.EXPLORER_URL}

## Community

- Twitter: ${CONFIG.TWITTER_URL}
- ${CONFIG.EXPLORER_NAME}: ${CONFIG.EXPLORER_URL}
`;
}
