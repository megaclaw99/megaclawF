// ╔══════════════════════════════════════════════════════════════╗
// ║ MEGACLAW CONFIG — Edit this file to customize your site ║
// ║ All brand names, addresses, links are pulled from here ║
// ╚══════════════════════════════════════════════════════════════╝

const CONFIG = {
  // ── Brand ────────────────────────────────────────────────
  BRAND_NAME: "MEGACLAW",
  BRAND_TAGLINE: "AI Agent Token Launchpad on MegaETH",
  BRAND_DESCRIPTION: "Launch tokens on MegaETH Chain with AI agents.\nAutonomous deployment for OpenClaw agents.",
  BRAND_EMOJI: "🤖",           // Logo emoji (nav & footer)
  MASCOT_EMOJI: "🐾",          // Hero mascot emoji
  SITE_DOMAIN: "megaclaw.io",

  // ── Chain ────────────────────────────────────────────────
  CHAIN_NAME: "MegaETH Chain",
  CHAIN_ID: 4326,
  CHAIN_RPC: "https://mainnet.megaeth.com/rpc",
  EXPLORER_URL: "https://megaeth.blockscout.com",
  EXPLORER_API: "https://megaeth.blockscout.com/api/v2",
  EXPLORER_NAME: "MegaETH Explorer",

  // ── Contracts ────────────────────────────────────────────
  TOKEN_FACTORY: "0xc2aa358BfAA1cEC955c09C1c2E164C486283b1F7",

  // ── Featured Token (the card on the homepage) ────────────
  FEATURED_SYMBOL: "$MEGACLAW",
  FEATURED_NOTE: "TEST COIN (DON'T BUY)",
  FEATURED_CONTRACT: "0xb6000000000000000000000000000000000ffff",
  FEATURED_SHORT: "0xb6...ffff",
  FEATURED_MCAP: "$23.0K",
  FEATURED_VOLUME: "$18.1K",
  FEATURED_DIVIDEND: "99%",
  FEATURED_RECIPIENT_PCT: "1%",
  FEATURED_RECIPIENT_ADDR: "0x5f0a...2d4e",
  FEATURED_DEX_URL: "#",
  FEATURED_TRADE_URL: "#",
  FEATURED_SCAN_URL: "#",

  // ── Socials & Links ──────────────────────────────────────
  TWITTER_HANDLE: "megaclaw_eth",
  TWITTER_URL: "https://twitter.com/megaclaw_eth",
  SKILL_URL: "https://megaclaw.io/skill",
  ALERTS_URL: "#",

  // ── Platforms ────────────────────────────────────────────
  DEX_PLATFORM: "MegaETH",

  // ── Misc ─────────────────────────────────────────────────
  COPYRIGHT_YEAR: "2025",
  LAUNCH_TRIGGER: "!megaclaw",   // The trigger word for posts
  REFRESH_INTERVAL: 30000,       // ms between data refreshes
};

// For Node.js (server-side)
if (typeof module !== 'undefined') module.exports = CONFIG;
