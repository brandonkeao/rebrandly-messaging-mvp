# GitHub Pages Deployment Guide

## 🚀 Quick Deployment Steps

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository settings:
   - **Name**: `rebrandly-messaging-mvp` (or your preferred name)
   - **Description**: `Rebrandly Messaging MVP - SMS Campaign Management Prototype`
   - **Visibility**: Public (required for free GitHub Pages)
   - **Initialize**: Leave unchecked (we already have files)
5. Click "Create repository"

### Step 2: Push Code to GitHub
Copy and run these commands in your terminal:

```bash
# Add the GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/rebrandly-messaging-mvp.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab (top of the repository)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Access Your Live Site
- GitHub will provide a URL like: `https://YOUR_USERNAME.github.io/rebrandly-messaging-mvp`
- It may take 5-10 minutes for the site to be available
- You'll see a green checkmark when deployment is complete

## 🎯 Share with Stakeholders

Once deployed, send this message:

---

**Subject**: Rebrandly Messaging MVP - Live Prototype Ready for Testing

Hi Team,

The Rebrandly Messaging MVP prototype is now live and ready for your review:

**🔗 Live Demo**: https://YOUR_USERNAME.github.io/rebrandly-messaging-mvp

**Test Instructions**:
1. Navigate through the campaign builder flow (Import → Compose → etc.)
2. Try uploading a CSV file (sample file available in the demo)
3. Compose a message with variables like {{name}} and {{company}}
4. Check the real-time phone preview
5. Test on both desktop and mobile devices

**Key Features to Evaluate**:
- User experience and flow intuitiveness
- Visual design and branding alignment
- Mobile responsiveness
- Overall concept validation

**Note**: This is a functional prototype - file uploads and message sending are simulated for demo purposes.

Please provide feedback on the overall concept, user experience, and any suggestions for improvement.

Best regards,
[Your Name]

---

## 🔄 Making Updates

When you need to update the prototype:

```bash
# Make your changes to the files
# Then commit and push:
git add .
git commit -m "Update: describe your changes"
git push origin main
```

The GitHub Pages site will automatically update within a few minutes.

## 🛠️ Troubleshooting

### Site Not Loading?
- Wait 10 minutes after first deployment
- Check repository Settings > Pages for deployment status
- Ensure repository is public
- Verify the correct branch is selected

### Need Custom Domain?
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

### Analytics & Monitoring
Consider adding:
- Google Analytics for usage tracking
- Simple feedback form for stakeholder input
- Error monitoring for any issues

## 📊 Repository Structure
```
rebrandly-messaging-mvp/
├── index.html              # Main entry point
├── css/                    # Stylesheets
├── js/                     # JavaScript files
├── assets/                 # Static assets
├── README.md              # Project documentation
└── DEPLOYMENT.md          # This guide
```

## 🎉 Success!
Your prototype is now live and shareable with stakeholders worldwide!
