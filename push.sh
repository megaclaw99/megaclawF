#!/bin/bash
# Push MegaClaw Frontend to GitHub

echo "🚀 Pushing to GitHub: megaclaw99/megaclawF"
echo ""

cd /home/smart_user/.openclaw/workspace/megaclawF

# Show current status
echo "📊 Current status:"
git status --short
echo ""

# Show commits ready to push
echo "📝 Commits to push:"
git log origin/main..HEAD --oneline 2>/dev/null || git log --oneline | head -5
echo ""

# Push to GitHub
echo "⬆️  Pushing to origin main..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub"
    echo "🌐 View at: https://github.com/megaclaw99/megaclawF"
    echo ""
    echo "🚂 Next: Deploy on Railway"
    echo "   1. Go to railway.app"
    echo "   2. New Project → Deploy from GitHub"
    echo "   3. Select megaclaw99/megaclawF"
    echo "   4. Wait for deployment"
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common fixes:"
    echo "1. If SSH key issue:"
    echo "   git remote set-url origin https://github.com/megaclaw99/megaclawF.git"
    echo "   git push -u origin main"
    echo ""
    echo "2. If authentication needed:"
    echo "   Use GitHub Personal Access Token as password"
    echo ""
    echo "3. If repo doesn't exist:"
    echo "   Create it first at github.com/megaclaw99/megaclawF"
fi
