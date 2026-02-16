# Railway Deployment Guide

## ✅ Fixes Applied

The following issues have been fixed for successful Railway deployment:

1. **Added `package-lock.json`** — Railway needs this for reproducible builds
2. **Added `/health` endpoint** — Healthcheck route for Railway monitoring
3. **Created `nixpacks.toml`** — Explicit build configuration for Nixpacks
4. **Updated `railway.toml`** — Correct healthcheck path and timeout
5. **Updated `.gitignore`** — Now tracks `package-lock.json` (was excluded before)
6. **Added `.npmrc`** — Proper npm configuration

## 🚀 Deployment Steps

### Option 1: Direct GitHub Push (Recommended)

```bash
cd /home/smart_user/.openclaw/workspace/megaclawF
git push -u origin main
```

Then in Railway:
1. Go to Railway dashboard → New Project
2. Choose "Deploy from GitHub repo"
3. Select `megaclaw99/megaclawF`
4. Railway auto-detects `railway.toml` and deploys
5. Wait for build to complete (~2-3 minutes)
6. Click on the generated URL to test

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project (in megaclawF directory)
cd /home/smart_user/.openclaw/workspace/megaclawF
railway link

# Deploy
railway up

# Open in browser
railway open
```

### Option 3: Manual Deploy (if GitHub fails)

1. Zip the project: `cd /home/smart_user/.openclaw/workspace && tar -czf megaclawF.tar.gz megaclawF/`
2. Go to Railway → New Project → Empty Project
3. Add a service → From Local Directory
4. Upload the zip file
5. Railway will auto-build

## 📋 Deployment Checklist

Before deploying, verify:

- [ ] `package.json` has `"start": "node server.js"`
- [ ] `package-lock.json` exists and is tracked in git
- [ ] `railway.toml` has correct `healthcheckPath = "/health"`
- [ ] `server.js` has `/health` endpoint
- [ ] `node_modules/` is NOT tracked (in `.gitignore`)
- [ ] All files committed to git

## 🔍 Troubleshooting

### Build Fails: "Cannot find module 'express'"

**Fix:** Make sure `package-lock.json` is in the repo:
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Health Check Timeout

**Fix:** Verify the healthcheck endpoint works:
```bash
# Test locally
npm start
# In another terminal:
curl http://localhost:3000/health
# Should return: {"status":"ok","service":"megaclaw-frontend"}
```

If it works locally but fails on Railway:
- Check Railway logs for port binding errors
- Verify `PORT` environment variable is being used (it is: `const PORT = process.env.PORT || 3000`)

### Build Succeeds but Site Shows 404

**Fix:** Check file paths in `server.js`:
- `app.use(express.static(path.join(__dirname, 'public')))` — Serves `public/` folder
- Verify `public/index.html` exists
- Verify `public/css/style.css` exists
- Verify `public/js/app.js` and `public/js/config.js` exist

### Deployment Slow or Hanging

**Fix:** Railway free tier can be slow on first deploy. Wait 5-10 minutes. Check:
- Railway dashboard → Deployments → Logs
- Look for "Listening on port 3000" or similar message

## 📊 Expected Build Output

```
==> Building with Nixpacks
==> Installing Node.js 18.x
==> Running npm ci
==> Starting with npm start
🤖 MEGACLAW Protocol running on port 3000
   → Skill.md at /skill
==> Deployment successful!
```

## 🌐 After Deployment

1. **Test the deployed site:**
   - Visit the Railway-generated URL (e.g., `https://megaclawf-production.up.railway.app`)
   - Check `/health` endpoint
   - Check `/skill` endpoint
   - Verify tokens load from MegaETH Blockscout

2. **Add custom domain (optional):**
   - Railway dashboard → Settings → Domains
   - Add custom domain: `megaclaw.io`
   - Update DNS records as instructed:
     ```
     CNAME @ <your-railway-app>.up.railway.app
     ```
   - Wait for DNS propagation (5-30 minutes)

3. **Monitor:**
   - Railway dashboard → Metrics
   - Check CPU, memory, requests
   - View logs for errors

## 📁 File Structure (for reference)

```
megaclawF/
├── .gitignore          ✅ Excludes node_modules
├── .npmrc              ✅ NPM config
├── package.json        ✅ Dependencies
├── package-lock.json   ✅ Lock file (MUST be tracked)
├── server.js           ✅ Express server
├── config.js           ✅ Site config
├── railway.toml        ✅ Railway config
├── nixpacks.toml       ✅ Build config
└── public/
    ├── index.html      ✅ Main page
    ├── css/style.css   ✅ Styles
    └── js/
        ├── config.js   ✅ Client config
        └── app.js      ✅ Client JS
```

## 🆘 Still Failing?

Check Railway logs:
```bash
railway logs
```

Common error patterns:

| Error | Cause | Fix |
|-------|-------|-----|
| `MODULE_NOT_FOUND` | Missing dependencies | Add to `package.json`, commit |
| `EADDRINUSE` | Port already in use | Railway handles this automatically |
| `ENOENT: no such file` | Missing file | Verify file exists and is committed |
| `Healthcheck timeout` | Server not responding | Check `/health` endpoint works |

## 📞 Support

- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app
- GitHub Issues: Open an issue on `megaclaw99/megaclawF`

---

**Current Status:** ✅ All deployment blockers fixed. Ready to deploy!

**Last tested:** 2026-02-16
