#!/bin/bash

# Rebrandly Messaging MVP - Quick Deployment Script
# This script helps deploy the app to various hosting platforms

echo "🚀 Rebrandly Messaging MVP Deployment Helper"
echo "============================================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the /app directory"
    echo "   Current directory should contain index.html"
    exit 1
fi

echo "✅ Found index.html - ready to deploy!"
echo ""

echo "📋 Deployment Options:"
echo "1. Netlify (Drag & Drop)"
echo "2. Surge.sh (Command Line)"
echo "3. GitHub Pages (Git Required)"
echo "4. Local Server (Testing)"
echo ""

read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Netlify Deployment:"
        echo "1. Go to https://netlify.com"
        echo "2. Sign up for free account"
        echo "3. Drag the entire 'app' folder to the deploy area"
        echo "4. Wait for deployment to complete"
        echo "5. Share the generated URL with stakeholders"
        echo ""
        echo "💡 Tip: You'll get a URL like: https://amazing-name-123456.netlify.app"
        ;;
    2)
        echo ""
        echo "⚡ Surge.sh Deployment:"
        if command -v surge &> /dev/null; then
            echo "✅ Surge is installed"
            echo "🚀 Deploying to Surge..."
            surge
        else
            echo "📦 Installing Surge..."
            npm install -g surge
            echo "🚀 Deploying to Surge..."
            surge
        fi
        ;;
    3)
        echo ""
        echo "📚 GitHub Pages Deployment:"
        echo "1. Push this code to a GitHub repository"
        echo "2. Go to repository Settings > Pages"
        echo "3. Select source branch (usually 'main' or 'master')"
        echo "4. Your site will be available at:"
        echo "   https://yourusername.github.io/repository-name"
        echo ""
        if command -v git &> /dev/null; then
            echo "Git commands to get started:"
            echo "  git init"
            echo "  git add ."
            echo "  git commit -m 'Initial commit'"
            echo "  git remote add origin https://github.com/yourusername/repo-name.git"
            echo "  git push -u origin main"
        fi
        ;;
    4)
        echo ""
        echo "🖥️  Starting Local Server:"
        if command -v python3 &> /dev/null; then
            echo "✅ Starting Python server on http://localhost:8000"
            echo "📱 Share this URL for local testing"
            echo "🛑 Press Ctrl+C to stop the server"
            echo ""
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "✅ Starting Python server on http://localhost:8000"
            echo "📱 Share this URL for local testing"
            echo "🛑 Press Ctrl+C to stop the server"
            echo ""
            python -m SimpleHTTPServer 8000
        elif command -v npx &> /dev/null; then
            echo "✅ Starting Node.js server on http://localhost:8000"
            echo "📱 Share this URL for local testing"
            echo "🛑 Press Ctrl+C to stop the server"
            echo ""
            npx http-server -p 8000
        else
            echo "❌ No suitable server found"
            echo "Please install Python or Node.js to run a local server"
        fi
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-4."
        ;;
esac

echo ""
echo "📋 Don't forget to:"
echo "   • Test the deployment on both desktop and mobile"
echo "   • Use the sample CSV file in /assets/sample-contacts.csv"
echo "   • Share the DEPLOYMENT.md guide with stakeholders"
echo ""
echo "🎉 Happy testing!"
