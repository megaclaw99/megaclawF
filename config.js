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
  CHAIN_NAME: "MegaETH",
  CHAIN_ID: 4326,
  CHAIN_RPC: "https://mainnet.megaeth.com/rpc",
  EXPLORER_URL: "https://mega.etherscan.io/",
  EXPLORER_API: "https://megaeth.blockscout.com/api/v2",
  EXPLORER_NAME: "MegaETH Explorer",

  // ── Contracts ────────────────────────────────────────────
  TOKEN_FACTORY: "0x3B41F576b423ac8240520c188c995da601296C9E",
  FEE_DISTRIBUTION: "0xb3368172A7CF3DE737b3Fb8621114E50866F9E5a",

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
  TWITTER_HANDLE: "megaclaw_io",
  TWITTER_URL: "https://x.com/megaclaw_io",
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
