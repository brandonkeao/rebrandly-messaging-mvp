#!/bin/bash

# AI Context Update Script
# Automatically updates ai-context.md with deployment information

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 AI Context Update Script${NC}"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "ai-context.md" ]; then
    echo -e "${RED}❌ Error: ai-context.md not found${NC}"
    echo "Please run this script from the app directory"
    exit 1
fi

# Get current git information
CURRENT_BRANCH=$(git branch --show-current)
LATEST_COMMIT=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log -1 --pretty=format:"%s")
COMMIT_DATE=$(git log -1 --pretty=format:"%ci")
DEPLOYMENT_COUNT=$(grep -c "### \*\*Deployment #" ai-context.md)
NEW_DEPLOYMENT_NUM=$((DEPLOYMENT_COUNT + 1))

echo -e "${YELLOW}📊 Current Status:${NC}"
echo "Branch: $CURRENT_BRANCH"
echo "Commit: $LATEST_COMMIT"
echo "Message: $COMMIT_MESSAGE"
echo "Date: $COMMIT_DATE"
echo "Deployment #: $NEW_DEPLOYMENT_NUM"
echo ""

# Prompt for deployment information
echo -e "${BLUE}📝 Deployment Information:${NC}"
read -p "User request/feature description: " USER_REQUEST
read -p "Key changes made (comma-separated): " KEY_CHANGES
read -p "Files modified (comma-separated): " FILES_MODIFIED
read -p "Technical decisions/notes: " TECH_NOTES

# Get file statistics
TOTAL_FILES=$(find . -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.md" | wc -l | tr -d ' ')
JS_SIZE=$(find js/ -name "*.js" -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
CSS_SIZE=$(find css/ -name "*.css" -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")

# Create backup of current ai-context.md
cp ai-context.md ai-context.md.backup

# Create new deployment entry
CURRENT_UTC=$(date -u +"%B %d, %Y %H:%M UTC")

# Prepare the new deployment entry
NEW_ENTRY="### **Deployment #${NEW_DEPLOYMENT_NUM}** - ${CURRENT_UTC}
**Branch**: \`${CURRENT_BRANCH}\` → \`main\`  
**Commit**: \`${LATEST_COMMIT}\` - \"${COMMIT_MESSAGE}\"

#### 🎯 **User Request**
> \"${USER_REQUEST}\"

#### 🔧 **AI Implementation**
**Key Changes:**
$(echo "$KEY_CHANGES" | sed 's/,/\n- /g' | sed 's/^/- /')

**Files Modified:**
$(echo "$FILES_MODIFIED" | sed 's/,/\n- /g' | sed 's/^/- /')

**Technical Notes:**
${TECH_NOTES}

**Code Statistics:**
- Total Files: ${TOTAL_FILES}
- JavaScript: ~${JS_SIZE} bytes
- CSS: ~${CSS_SIZE} bytes
- Commit: ${LATEST_COMMIT}

---"

# Insert the new entry after the "## 🚀 Deployment History" line
awk -v new_entry="$NEW_ENTRY" '
/^## 🚀 Deployment History/ {
    print $0
    print ""
    print new_entry
    next
}
/^### \*\*Deployment #/ && !inserted {
    print new_entry
    print ""
    inserted = 1
}
{ print }
' ai-context.md > ai-context.md.tmp

# Replace the original file
mv ai-context.md.tmp ai-context.md

# Update the "Last Updated" timestamp at the bottom
sed -i.bak "s/\*\*Last Updated\*\*:.*/\*\*Last Updated\*\*: ${CURRENT_UTC}/" ai-context.md
rm ai-context.md.bak

echo -e "${GREEN}✅ AI context updated successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Review the updated ai-context.md file"
echo "2. Commit the changes: git add ai-context.md && git commit -m 'Update AI context for deployment #${NEW_DEPLOYMENT_NUM}'"
echo "3. Push to GitHub: git push origin main"
echo ""

# Ask if user wants to commit automatically
read -p "Commit and push changes automatically? (y/n): " AUTO_COMMIT

if [ "$AUTO_COMMIT" = "y" ] || [ "$AUTO_COMMIT" = "Y" ]; then
    echo -e "${BLUE}🚀 Committing changes...${NC}"
    git add ai-context.md
    git commit -m "Update AI context for deployment #${NEW_DEPLOYMENT_NUM}

- Added deployment entry for commit ${LATEST_COMMIT}
- Updated technical metrics and file statistics
- Documented user request: ${USER_REQUEST}
- Recorded key changes and technical decisions"
    
    echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
    git push origin main
    
    echo -e "${GREEN}🎉 Deployment #${NEW_DEPLOYMENT_NUM} context updated and pushed!${NC}"
else
    echo -e "${YELLOW}⏸️  Changes saved locally. Remember to commit and push manually.${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Live Site:${NC} https://brandonkeao.github.io/rebrandly-messaging-mvp/"
echo -e "${BLUE}📁 Repository:${NC} https://github.com/brandonkeao/rebrandly-messaging-mvp"
