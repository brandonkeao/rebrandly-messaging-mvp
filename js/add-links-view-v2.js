// Add Links View v2 - Enhanced Components

class LinksManager {
    constructor() {
        this.links = this.loadLinks();
        this.selectedLinks = new Set();
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.renderLinks();
        this.attachEventListeners();
        this.updateStats();
    }

    loadLinks() {
        // Load from localStorage or return sample data
        const saved = localStorage.getItem('rebrandly_links');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return [
            {
                id: '1',
                title: 'Product Launch',
                originalUrl: 'https://example.com/product-launch-2025',
                shortUrl: 'https://rebrand.ly/launch2025',
                clicks: 1250,
                category: 'marketing',
                created: new Date('2025-01-15').toISOString(),
                status: 'active'
            },
            {
                id: '2',
                title: 'Special Offer',
                originalUrl: 'https://example.com/special-offer',
                shortUrl: 'https://rebrand.ly/offer50',
                clicks: 890,
                category: 'sales',
                created: new Date('2025-01-20').toISOString(),
                status: 'active'
            }
        ];
    }

    saveLinks() {
        localStorage.setItem('rebrandly_links', JSON.stringify(this.links));
    }

    renderLinks() {
        const container = document.getElementById('linksContainer');
        const filteredLinks = this.getFilteredLinks();
        
        if (filteredLinks.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }

        container.innerHTML = `
            <div class="links-grid">
                ${filteredLinks.map(link => this.renderLinkCard(link)).join('')}
            </div>
        `;
    }

    renderLinkCard(link) {
        const isSelected = this.selectedLinks.has(link.id);
        return `
            <div class="link-card ${isSelected ? 'selected' : ''}" data-id="${link.id}">
                <div class="link-card-header">
                    <div>
                        <h3 class="link-title">${link.title}</h3>
                        <div class="link-domain">${new URL(link.originalUrl).hostname}</div>
                    </div>
                    <div class="link-actions">
                        <button class="action-btn copy" onclick="linksManager.copyLink('${link.id}')" title="Copy Link">
                            📋
                        </button>
                        <button class="action-btn edit" onclick="linksManager.editLink('${link.id}')" title="Edit">
                            ✏️
                        </button>
                        <button class="action-btn delete" onclick="linksManager.deleteLink('${link.id}')" title="Delete">
                            🗑️
                        </button>
                    </div>
                </div>
                
                <div class="link-url" onclick="linksManager.copyLink('${link.id}')" style="cursor: pointer;">
                    ${link.shortUrl}
                </div>
                
                <div class="analytics-preview">
                    <div class="analytics-row">
                        <span class="analytics-label">Total Clicks</span>
                        <span class="analytics-value">${link.clicks.toLocaleString()}</span>
                    </div>
                    <div class="analytics-row">
                        <span class="analytics-label">Created</span>
                        <span class="analytics-value">${new Date(link.created).toLocaleDateString()}</span>
                    </div>
                    <div class="analytics-row">
                        <span class="analytics-label">Status</span>
                        <span class="analytics-value">
                            <span class="status-badge ${link.status}">${link.status}</span>
                        </span>
                    </div>
                </div>
                
                <div class="link-stats">
                    <div class="link-clicks">
                        <span>📊</span>
                        <span class="click-count">${link.clicks}</span>
                        <span>clicks</span>
                    </div>
                    <div class="link-date">
                        ${this.getRelativeTime(link.created)}
                    </div>
                </div>
                
                <input type="checkbox" ${isSelected ? 'checked' : ''} 
                       onchange="linksManager.toggleSelection('${link.id}')"
                       style="position: absolute; top: 12px; left: 12px;">
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🔗</div>
                <h3 class="empty-state-title">No links found</h3>
                <p class="empty-state-message">
                    ${this.currentCategory === 'all' 
                        ? 'Create your first branded link to get started.' 
                        : `No links found in the "${this.currentCategory}" category.`}
                </p>
                <button class="btn btn-primary" onclick="linksManager.showAddForm()">
                    Create Link
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        // Add link form
        const form = document.getElementById('addLinkForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addLink();
            });
        }

        // URL input validation
        const urlInput = document.getElementById('originalUrl');
        if (urlInput) {
            urlInput.addEventListener('input', () => this.validateUrl());
            urlInput.addEventListener('blur', () => this.generateShortUrl());
        }

        // Category filters
        document.addEventListener('click', (e) => {
            if (e.target.matches('.category-btn')) {
                this.setCategory(e.target.dataset.category);
            }
        });
    }

    validateUrl() {
        const input = document.getElementById('originalUrl');
        const preview = document.getElementById('urlPreview');
        const url = input.value.trim();

        if (!url) {
            preview.textContent = 'Enter a URL to see preview';
            preview.className = 'url-preview';
            input.classList.remove('error');
            return false;
        }

        try {
            new URL(url);
            preview.textContent = url;
            preview.className = 'url-preview';
            input.classList.remove('error');
            return true;
        } catch {
            preview.textContent = 'Invalid URL format';
            preview.className = 'url-preview error';
            input.classList.add('error');
            return false;
        }
    }

    generateShortUrl() {
        const titleInput = document.getElementById('linkTitle');
        const shortUrlPreview = document.getElementById('shortUrlPreview');
        const title = titleInput.value.trim();

        if (title && this.validateUrl()) {
            const slug = title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 20);
            
            shortUrlPreview.textContent = `https://rebrand.ly/${slug}`;
            shortUrlPreview.className = 'url-preview generated';
        }
    }

    addLink() {
        const title = document.getElementById('linkTitle').value.trim();
        const originalUrl = document.getElementById('originalUrl').value.trim();
        const category = document.getElementById('linkCategory').value;

        if (!title || !originalUrl || !this.validateUrl()) {
            showToast('Please fill in all required fields correctly', 'error');
            return;
        }

        const newLink = {
            id: Date.now().toString(),
            title,
            originalUrl,
            shortUrl: `https://rebrand.ly/${title.toLowerCase().replace(/\s+/g, '-')}`,
            clicks: 0,
            category,
            created: new Date().toISOString(),
            status: 'active'
        };

        this.links.unshift(newLink);
        this.saveLinks();
        this.renderLinks();
        this.updateStats();
        this.clearForm();
        
        showToast('Link created successfully!', 'success');
    }

    clearForm() {
        document.getElementById('addLinkForm').reset();
        document.getElementById('urlPreview').textContent = 'Enter a URL to see preview';
        document.getElementById('urlPreview').className = 'url-preview';
        document.getElementById('shortUrlPreview').textContent = 'Generated short URL will appear here';
        document.getElementById('shortUrlPreview').className = 'url-preview';
    }

    copyLink(id) {
        const link = this.links.find(l => l.id === id);
        if (link) {
            navigator.clipboard.writeText(link.shortUrl).then(() => {
                showToast('Link copied to clipboard!', 'success');
            });
        }
    }

    editLink(id) {
        const link = this.links.find(l => l.id === id);
        if (link) {
            showModal({
                title: 'Edit Link',
                size: 'medium',
                content: `
                    <form id="editLinkForm">
                        <div class="form-group">
                            <label for="editTitle">Title</label>
                            <input type="text" id="editTitle" class="form-control" value="${link.title}" required>
                        </div>
                        <div class="form-group">
                            <label for="editOriginalUrl">Original URL</label>
                            <input type="url" id="editOriginalUrl" class="form-control" value="${link.originalUrl}" required>
                        </div>
                        <div class="form-group">
                            <label for="editCategory">Category</label>
                            <select id="editCategory" class="form-control">
                                <option value="marketing" ${link.category === 'marketing' ? 'selected' : ''}>Marketing</option>
                                <option value="sales" ${link.category === 'sales' ? 'selected' : ''}>Sales</option>
                                <option value="social" ${link.category === 'social' ? 'selected' : ''}>Social Media</option>
                                <option value="other" ${link.category === 'other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                    </form>
                `,
                buttons: [
                    { text: 'Cancel', class: 'btn-secondary' },
                    { text: 'Save Changes', class: 'btn-primary', onclick: `linksManager.saveEdit('${id}')` }
                ]
            });
        }
    }

    saveEdit(id) {
        const title = document.getElementById('editTitle').value.trim();
        const originalUrl = document.getElementById('editOriginalUrl').value.trim();
        const category = document.getElementById('editCategory').value;

        if (!title || !originalUrl) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        const linkIndex = this.links.findIndex(l => l.id === id);
        if (linkIndex !== -1) {
            this.links[linkIndex] = {
                ...this.links[linkIndex],
                title,
                originalUrl,
                category
            };
            
            this.saveLinks();
            this.renderLinks();
            closeModal();
            showToast('Link updated successfully!', 'success');
        }
    }

    deleteLink(id) {
        const link = this.links.find(l => l.id === id);
        if (link) {
            confirmAction({
                title: 'Delete Link',
                message: `Are you sure you want to delete "${link.title}"? This action cannot be undone.`,
                type: 'danger',
                onConfirm: () => {
                    this.links = this.links.filter(l => l.id !== id);
                    this.selectedLinks.delete(id);
                    this.saveLinks();
                    this.renderLinks();
                    this.updateStats();
                    showToast('Link deleted successfully!', 'success');
                }
            });
        }
    }

    toggleSelection(id) {
        if (this.selectedLinks.has(id)) {
            this.selectedLinks.delete(id);
        } else {
            this.selectedLinks.add(id);
        }
        this.updateBulkActions();
    }

    updateBulkActions() {
        const bulkBar = document.getElementById('bulkActionsBar');
        const count = this.selectedLinks.size;
        
        if (count > 0) {
            bulkBar.classList.add('show');
            bulkBar.querySelector('.bulk-info').textContent = `${count} link${count > 1 ? 's' : ''} selected`;
        } else {
            bulkBar.classList.remove('show');
        }
    }

    setCategory(category) {
        this.currentCategory = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.renderLinks();
    }

    getFilteredLinks() {
        if (this.currentCategory === 'all') {
            return this.links;
        }
        return this.links.filter(link => link.category === this.currentCategory);
    }

    updateStats() {
        const totalLinks = this.links.length;
        const totalClicks = this.links.reduce((sum, link) => sum + link.clicks, 0);
        const activeLinks = this.links.filter(link => link.status === 'active').length;

        document.getElementById('totalLinks').textContent = totalLinks;
        document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
        document.getElementById('activeLinks').textContent = activeLinks;
    }

    getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    showAddForm() {
        document.getElementById('addLinkForm').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('linkTitle').focus();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.linksManager = new LinksManager();
});
