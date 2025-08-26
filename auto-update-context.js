#!/usr/bin/env node

/**
 * Automated AI Context Updater
 * Updates ai-context.md with deployment information
 * Can be run manually or integrated into git hooks
 */

const fs = require('fs');
const { execSync } = require('child_process');

class AIContextUpdater {
    constructor() {
        this.contextFile = 'ai-context.md';
        this.deploymentCount = 0;
    }

    getCurrentGitInfo() {
        try {
            return {
                branch: execSync('git branch --show-current', { encoding: 'utf8' }).trim(),
                commit: execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(),
                message: execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf8' }).trim(),
                date: execSync('git log -1 --pretty=format:"%ci"', { encoding: 'utf8' }).trim(),
                author: execSync('git log -1 --pretty=format:"%an"', { encoding: 'utf8' }).trim()
            };
        } catch (error) {
            console.error('Error getting git info:', error.message);
            return null;
        }
    }

    getFileStats() {
        try {
            const jsFiles = execSync('find js/ -name "*.js" -exec wc -c {} + 2>/dev/null | tail -1', { encoding: 'utf8' }).trim();
            const cssFiles = execSync('find css/ -name "*.css" -exec wc -c {} + 2>/dev/null | tail -1', { encoding: 'utf8' }).trim();
            const totalFiles = execSync('find . -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.md" | wc -l', { encoding: 'utf8' }).trim();
            
            return {
                totalFiles: parseInt(totalFiles) || 0,
                jsSize: parseInt(jsFiles.split(' ')[0]) || 0,
                cssSize: parseInt(cssFiles.split(' ')[0]) || 0
            };
        } catch (error) {
            return { totalFiles: 0, jsSize: 0, cssSize: 0 };
        }
    }

    getCurrentDeploymentCount() {
        try {
            const content = fs.readFileSync(this.contextFile, 'utf8');
            const matches = content.match(/### \*\*Deployment #/g);
            return matches ? matches.length : 0;
        } catch (error) {
            return 0;
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    createDeploymentEntry(gitInfo, stats, deploymentNum, userRequest = '', keyChanges = '', techNotes = '') {
        const currentUTC = new Date().toUTCString().replace('GMT', 'UTC');
        
        return `### **Deployment #${deploymentNum}** - ${currentUTC}
**Branch**: \`${gitInfo.branch}\` → \`main\`  
**Commit**: \`${gitInfo.commit}\` - "${gitInfo.message}"

#### 🎯 **User Request**
> "${userRequest || 'Automated deployment update'}"

#### 🔧 **AI Implementation**
**Key Changes:**
${keyChanges ? keyChanges.split(',').map(c => `- ${c.trim()}`).join('\n') : '- Automated context update'}

**Technical Metrics:**
- Total Files: ${stats.totalFiles}
- JavaScript: ${this.formatBytes(stats.jsSize)}
- CSS: ${this.formatBytes(stats.cssSize)}
- Commit: ${gitInfo.commit}
- Author: ${gitInfo.author}

${techNotes ? `**Technical Notes:**\n${techNotes}\n` : ''}
---`;
    }

    updateContextFile(deploymentEntry) {
        try {
            let content = fs.readFileSync(this.contextFile, 'utf8');
            
            // Insert new deployment after "## 🚀 Deployment History"
            const deploymentHistoryIndex = content.indexOf('## 🚀 Deployment History');
            if (deploymentHistoryIndex === -1) {
                throw new Error('Deployment History section not found');
            }
            
            const insertIndex = content.indexOf('\n', deploymentHistoryIndex) + 1;
            const beforeInsert = content.substring(0, insertIndex);
            const afterInsert = content.substring(insertIndex);
            
            const newContent = beforeInsert + '\n' + deploymentEntry + '\n' + afterInsert;
            
            // Update the "Last Updated" timestamp
            const updatedContent = newContent.replace(
                /\*\*Last Updated\*\*:.*/,
                `**Last Updated**: ${new Date().toUTCString().replace('GMT', 'UTC')}`
            );
            
            fs.writeFileSync(this.contextFile, updatedContent);
            return true;
        } catch (error) {
            console.error('Error updating context file:', error.message);
            return false;
        }
    }

    run(options = {}) {
        console.log('🤖 AI Context Updater');
        console.log('=====================');
        
        // Check if context file exists
        if (!fs.existsSync(this.contextFile)) {
            console.error(`❌ ${this.contextFile} not found`);
            return false;
        }
        
        // Get git information
        const gitInfo = this.getCurrentGitInfo();
        if (!gitInfo) {
            console.error('❌ Failed to get git information');
            return false;
        }
        
        // Get file statistics
        const stats = this.getFileStats();
        
        // Get deployment count
        const deploymentCount = this.getCurrentDeploymentCount();
        const newDeploymentNum = deploymentCount + 1;
        
        console.log(`📊 Deployment #${newDeploymentNum}`);
        console.log(`📝 Commit: ${gitInfo.commit} - ${gitInfo.message}`);
        console.log(`📁 Files: ${stats.totalFiles} total`);
        
        // Create deployment entry
        const deploymentEntry = this.createDeploymentEntry(
            gitInfo,
            stats,
            newDeploymentNum,
            options.userRequest,
            options.keyChanges,
            options.techNotes
        );
        
        // Update context file
        if (this.updateContextFile(deploymentEntry)) {
            console.log('✅ AI context updated successfully!');
            
            if (options.autoCommit) {
                try {
                    execSync(`git add ${this.contextFile}`);
                    execSync(`git commit -m "Update AI context for deployment #${newDeploymentNum}"`);
                    console.log('📝 Changes committed to git');
                } catch (error) {
                    console.log('⚠️  Auto-commit failed, please commit manually');
                }
            }
            
            return true;
        } else {
            console.error('❌ Failed to update context file');
            return false;
        }
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const options = {};
    
    // Parse command line arguments
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        options[key] = value;
    }
    
    const updater = new AIContextUpdater();
    const success = updater.run(options);
    process.exit(success ? 0 : 1);
}

module.exports = AIContextUpdater;
