// ══════════════════════════════════════════════════════════
//  MegaClaw — Client-side App Logic
//  Reads CONFIG from config.js (must be loaded first)
// ══════════════════════════════════════════════════════════

// ── Page Navigation (SPA) ─────────────────────────────────
function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + name);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ── Copy to Clipboard ─────────────────────────────────────
function copyText(el) {
    const text = el.getAttribute('data-full') || el.textContent.trim();
    navigator.clipboard.writeText(text).then(showToast).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast();
    });
}

function showToast() {
    const t = document.getElementById('copy-toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

// ── Theme Toggle ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if ((localStorage.getItem('theme') || 'light') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Start loading real tokens
    loadTokens();
    setInterval(loadTokens, CONFIG.REFRESH_INTERVAL);
});

// ── Helpers ───────────────────────────────────────────────
function shortAddr(a) {
    return a ? (a.slice(0, 6) + '...' + a.slice(-4)) : '???';
}

function timeAgo(d) {
    const s = Math.floor((Date.now() - d) / 1000);
    if (s < 60) return s + 's ago';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
}

// ══════════════════════════════════════════════════════════
//  Real-time Token Launches from Token Factory
//  Fetches data from Blockscout API (no backend needed)
// ══════════════════════════════════════════════════════════

const launchesEl = document.getElementById('launches-container');

function renderCard(t, isNew) {
    const link = CONFIG.EXPLORER_URL + '/token/' + t.address;
    return `<div class="launch-card">
        <div class="launch-header">
            <div class="token-info">
                <h3>${t.name}</h3>
                <span class="token-symbol">$${t.symbol}</span>
            </div>
            ${isNew ? '<span class="launch-badge new">New</span>' : '<span class="launch-badge">Live</span>'}
        </div>
        <div class="launch-stats">
            <div class="stat">
                <span class="stat-label">Contract</span>
                <span class="stat-value" style="font-size:.8rem;cursor:pointer" data-full="${t.address}" onclick="copyText(this)">${shortAddr(t.address)} 📋</span>
            </div>
            <div class="stat">
                <span class="stat-label">Deployer</span>
                <span class="stat-value" style="font-size:.8rem">${shortAddr(t.deployer)}</span>
            </div>
        </div>
        <div class="launch-footer">
            <span class="launch-time">${t.timeStr || 'recently'}</span>
            <a href="${link}" target="_blank" class="view-token">View Token</a>
        </div>
    </div>`;
}

function renderTokens(tokens) {
    if (!tokens.length) {
        launchesEl.innerHTML = '<div class="loading-text">No tokens found yet — be the first to launch!</div>';
        return;
    }
    launchesEl.innerHTML = tokens.slice(0, 12).map((t, i) => renderCard(t, i === 0)).join('');
}

// ── Fetch Strategy 1: Transactions from factory ───────────
async function fetchFactoryTxs() {
    try {
        const url = CONFIG.EXPLORER_API + '/addresses/' + CONFIG.TOKEN_FACTORY + '/transactions?filter=from';
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        if (!data.items || !data.items.length) return null;

        const tokens = [];
        const seen = new Set();

        for (const tx of data.items) {
            if (tx.token_transfers) {
                for (const tt of tx.token_transfers) {
                    const addr = tt.token?.address;
                    if (addr && !seen.has(addr)) {
                        seen.add(addr);
                        tokens.push({
                            name: tt.token?.name || 'Token',
                            symbol: tt.token?.symbol || '???',
                            address: addr,
                            deployer: tx.from?.hash || CONFIG.TOKEN_FACTORY,
                            timeStr: tx.timestamp ? timeAgo(new Date(tx.timestamp)) : 'recently',
                            ts: tx.timestamp ? new Date(tx.timestamp).getTime() : Date.now()
                        });
                    }
                }
            }
            if (tx.created_contract && !seen.has(tx.created_contract.hash)) {
                seen.add(tx.created_contract.hash);
                tokens.push({
                    name: tx.created_contract.name || 'New Token',
                    symbol: '???',
                    address: tx.created_contract.hash,
                    deployer: tx.from?.hash || CONFIG.TOKEN_FACTORY,
                    timeStr: tx.timestamp ? timeAgo(new Date(tx.timestamp)) : 'recently',
                    ts: tx.timestamp ? new Date(tx.timestamp).getTime() : Date.now()
                });
            }
        }
        return tokens.length ? tokens : null;
    } catch (e) { console.log('fetchFactoryTxs:', e.message); return null; }
}

// ── Fetch Strategy 2: Event logs from factory ─────────────
async function fetchFactoryLogs() {
    try {
        const url = CONFIG.EXPLORER_API + '/addresses/' + CONFIG.TOKEN_FACTORY + '/logs';
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        if (!data.items || !data.items.length) return null;

        const tokens = [];
        for (const log of data.items) {
            let addr = null;
            if (log.topics && log.topics.length > 1) {
                addr = '0x' + log.topics[1].slice(-40);
            }
            if (!addr && log.data && log.data.length >= 66) {
                addr = '0x' + log.data.slice(26, 66);
            }
            if (addr && addr.length === 42 && addr !== '0x0000000000000000000000000000000000000000') {
                tokens.push({
                    name: 'Token',
                    symbol: '???',
                    address: addr,
                    deployer: (log.topics && log.topics.length > 2) ? '0x' + log.topics[2].slice(-40) : CONFIG.TOKEN_FACTORY,
                    timeStr: log.block_number ? 'Block #' + log.block_number : 'recently',
                    ts: Date.now() - tokens.length * 60000
                });
            }
        }
        return tokens.length ? tokens : null;
    } catch (e) { console.log('fetchFactoryLogs:', e.message); return null; }
}

// ── Fetch Strategy 3: Internal txs (contract creates) ─────
async function fetchFactoryInternal() {
    try {
        const url = CONFIG.EXPLORER_API + '/addresses/' + CONFIG.TOKEN_FACTORY + '/internal-transactions';
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        if (!data.items || !data.items.length) return null;

        const creates = data.items.filter(tx => tx.type === 'create' || tx.type === 'create2');
        if (!creates.length) return null;

        return creates.map(tx => ({
            name: 'New Token',
            symbol: '???',
            address: tx.created_contract?.address_hash || tx.to?.hash || '0x',
            deployer: tx.from?.hash || CONFIG.TOKEN_FACTORY,
            timeStr: tx.timestamp ? timeAgo(new Date(tx.timestamp)) : 'recently',
            ts: tx.timestamp ? new Date(tx.timestamp).getTime() : Date.now()
        }));
    } catch (e) { console.log('fetchFactoryInternal:', e.message); return null; }
}

// ── Enrich token with name/symbol ─────────────────────────
async function enrichToken(t) {
    if (t.symbol !== '???' && t.name !== 'Token' && t.name !== 'New Token') return t;
    try {
        const res = await fetch(CONFIG.EXPLORER_API + '/tokens/' + t.address);
        if (res.ok) {
            const d = await res.json();
            if (d.name) t.name = d.name;
            if (d.symbol) t.symbol = d.symbol;
        }
    } catch (e) { /* skip */ }
    return t;
}

// ── Main Loader ───────────────────────────────────────────
async function loadTokens() {
    let tokens = await fetchFactoryTxs();
    if (!tokens) tokens = await fetchFactoryLogs();
    if (!tokens) tokens = await fetchFactoryInternal();

    if (tokens && tokens.length) {
        tokens.sort((a, b) => (b.ts || 0) - (a.ts || 0));
        const top = tokens.slice(0, 9);
        await Promise.all(top.map(enrichToken));
        renderTokens(top);
    } else {
        launchesEl.innerHTML = '<div class="loading-text">No tokens launched from factory yet — be the first!</div>';
    }
}
