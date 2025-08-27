/**
 * Add Links View JavaScript
 * Handles link management functionality, modals, and data table integration
 */

class LinksView {
    constructor() {
        this.linksData = [
            { id: 1, title: 'Product Launch Page', url: 'https://example.com/product-launch', shortUrl: 'yrbrand.co/launch', clicks: 1250, status: 'active', created: '2024-01-15', lastClick: '2024-01-26', ctr: 8.5 },
            { id: 2, title: 'Summer Sale Campaign', url: 'https://example.com/summer-sale', shortUrl: 'yrbrand.co/summer', clicks: 890, status: 'active', created: '2024-01-20', lastClick: '2024-01-25', ctr: 12.3 },
            { id: 3, title: 'Newsletter Signup', url: 'https://example.com/newsletter', shortUrl: 'yrbrand.co/news', clicks: 456, status: 'inactive', created: '2024-01-10', lastClick: '2024-01-20', ctr: 6.7 },
            { id: 4, title: 'Contact Us Page', url: 'https://example.com/contact', shortUrl: 'yrbrand.co/contact', clicks: 234, status: 'active', created: '2024-01-25', lastClick: '2024-01-26', ctr: 15.2 },
            { id: 5, title: 'About Our Company', url: 'https://example.com/about', shortUrl: 'yrbrand.co/about', clicks: 678, status: 'active', created: '2024-01-12', lastClick: '2024-01-24', ctr: 9.8 },
            { id: 6, title: 'Blog Post - SEO Tips', url: 'https://example.com/blog/seo-tips', shortUrl: 'yrbrand.co/seo', clicks: 1456, status: 'active', created: '2024-01-08', lastClick: '2024-01-26', ctr: 18.7 },
            { id: 7, title: 'Free Trial Signup', url: 'https://example.com/free-trial', shortUrl: 'yrbrand.co/trial', clicks: 2134, status: 'active', created: '2024-01-05', lastClick: '2024-01-26', ctr: 22.1 },
            { id: 8, title: 'Webinar Registration', url: 'https://example.com/webinar', shortUrl: 'yrbrand.co/webinar', clicks: 567, status: 'paused', created: '2024-01-18', lastClick: '2024-01-23', ctr: 11.4 }
        ];
        
        this.dataTable = null;
        this.init();
    }

    init() {
        this.updateStats();
        this.initializeDataTable();
    }

    updateStats() {
        const totalLinks = this.linksData.length;
        const totalClicks = this.linksData.reduce((sum, link) => sum + link.clicks, 0);
        const activeLinks = this.linksData.filter(link => link.status === 'active').length;
        const avgCtr = (this.linksData.reduce((sum, link) => sum + link.ctr, 0) / totalLinks).toFixed(1);

        document.getElementById('totalLinks').textContent = totalLinks.toLocaleString();
        document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
        document.getElementById('avgCtr').textContent = `${avgCtr}%`;
        document.getElementById('activeLinks').textContent = activeLinks.toLocaleString();
    }

    initializeDataTable() {
        this.dataTable = new DataTable('#linksDataTable', {
            title: 'Your Links',
            data: this.linksData,
            columns: [
                { 
                    key: 'title', 
                    label: 'Title', 
                    sortable: true,
                    render: (value, row) => `
                        <div>
                            <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 2px;">${value}</div>
                            <div style="font-size: 12px; color: var(--color-text-secondary);">${this.truncateUrl(row.url, 50)}</div>
                        </div>
                    `
                },
                { 
                    key: 'shortUrl', 
                    label: 'Short URL', 
                    render: (value) => `
                        <div class="short-url" onclick="copyToClipboard('https://${value}')" style="cursor: pointer;" title="Click to copy">
                            ${value}
                        </div>
                    `
                },
                { 
                    key: 'clicks', 
                    label: 'Clicks', 
                    type: 'number', 
                    sortable: true,
                    render: (value, row) => {
                        const trend = this.getClickTrend(value);
                        return `
                            <div class="click-metrics">
                                <span class="click-count">${value.toLocaleString()}</span>
                                <span class="click-trend ${trend.direction}">${trend.symbol}${trend.percent}%</span>
                            </div>
                        `;
                    }
                },
                { 
                    key: 'ctr', 
                    label: 'CTR', 
                    type: 'number', 
                    sortable: true,
                    render: (value) => `${value}%`
                },
                { 
                    key: 'status', 
                    label: 'Status', 
                    filterable: true, 
                    render: (value) => `<span class="status-badge ${value}">${value}</span>`
                },
                { 
                    key: 'created', 
                    label: 'Created', 
                    type: 'date', 
                    sortable: true,
                    render: (value) => new Date(value).toLocaleDateString()
                },
                { 
                    key: 'lastClick', 
                    label: 'Last Click', 
                    type: 'date', 
                    sortable: true,
                    render: (value) => value ? this.getRelativeTime(value) : 'Never'
                }
            ],
            pageSize: 10,
            searchable: true,
            selectable: true,
            rowActions: [
                { icon: '📊', label: 'Analytics', onClick: 'viewLinkAnalytics', type: 'view' },
                { icon: '✏️', label: 'Edit', onClick: 'editLink', type: 'edit' },
                { icon: '📋', label: 'Copy', onClick: 'copyLink', type: 'view' },
                { icon: '⏸️', label: 'Pause', onClick: 'pauseLink', type: 'edit' },
                { icon: '🗑️', label: 'Delete', onClick: 'deleteLink', type: 'delete' }
            ],
            bulkActions: [
                { label: 'Export Selected', onClick: 'exportSelectedLinks' },
                { label: 'Pause Selected', onClick: 'pauseSelectedLinks' },
                { label: 'Delete Selected', onClick: 'deleteSelectedLinks' }
            ],
            headerActions: [
                { label: 'Create Link', onClick: 'createNewLink' },
                { label: 'Import Links', onClick: 'importLinks' }
            ],
            emptyMessage: 'No links found. Create your first branded short link to get started.',
            emptyAction: { label: 'Create Link', onClick: 'createNewLink' }
        });
    }

    truncateUrl(url, maxLength) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength) + '...';
    }

    getClickTrend(clicks) {
        // Simulate trend data (in real app, this would come from API)
        const change = Math.floor(Math.random() * 30) - 10; // -10 to +20
        return {
            direction: change >= 0 ? 'up' : 'down',
            symbol: change >= 0 ? '↗' : '↘',
            percent: Math.abs(change)
        };
    }

    getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        return date.toLocaleDateString();
    }

    createLink(linkData) {
        const newLink = {
            id: Date.now(),
            title: linkData.title,
            url: linkData.url,
            shortUrl: linkData.customSlug ? `yrbrand.co/${linkData.customSlug}` : `yrbrand.co/${this.generateSlug()}`,
            clicks: 0,
            status: 'active',
            created: new Date().toISOString().split('T')[0],
            lastClick: null,
            ctr: 0
        };
        
        this.linksData.unshift(newLink);
        this.dataTable.updateData(this.linksData);
        this.updateStats();
        
        return newLink;
    }

    generateSlug() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    updateLink(id, updates) {
        const linkIndex = this.linksData.findIndex(link => link.id == id);
        if (linkIndex !== -1) {
            this.linksData[linkIndex] = { ...this.linksData[linkIndex], ...updates };
            this.dataTable.updateData(this.linksData);
            this.updateStats();
        }
    }

    deleteLink(id) {
        this.linksData = this.linksData.filter(link => link.id != id);
        this.dataTable.updateData(this.linksData);
        this.updateStats();
    }

    getLinkById(id) {
        return this.linksData.find(link => link.id == id);
    }

    refreshData() {
        this.dataTable.updateData(this.linksData);
        this.updateStats();
    }
}

// Global instance
let linksView;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('linksDataTable')) {
        linksView = new LinksView();
    }
});

// Global functions for UI interactions
function createNewLink() {
    showFormModal({
        title: 'Create New Link',
        fields: [
            { 
                name: 'title', 
                label: 'Link Title', 
                required: true, 
                placeholder: 'e.g., Product Launch Page'
            },
            { 
                name: 'url', 
                label: 'Destination URL', 
                type: 'url', 
                required: true, 
                placeholder: 'https://example.com/page'
            },
            { 
                name: 'customSlug', 
                label: 'Custom Slug (Optional)', 
                placeholder: 'custom-name'
            },
            { 
                name: 'description', 
                label: 'Description (Optional)', 
                type: 'textarea', 
                placeholder: 'Brief description of this link...'
            }
        ],
        submitText: 'Create Link',
        onSubmit: (data) => {
            const newLink = linksView.createLink(data);
            showToast({ 
                title: 'Link Created!', 
                message: `Short link created: ${newLink.shortUrl}`, 
                type: 'success' 
            });
        }
    });
}

function editLink(id) {
    const link = linksView.getLinkById(id);
    if (!link) return;
    
    showFormModal({
        title: 'Edit Link',
        fields: [
            { 
                name: 'title', 
                label: 'Link Title', 
                required: true, 
                value: link.title
            },
            { 
                name: 'url', 
                label: 'Destination URL', 
                type: 'url', 
                required: true, 
                value: link.url
            },
            { 
                name: 'status', 
                label: 'Status', 
                type: 'select',
                options: [
                    { value: 'active', label: 'Active' },
                    { value: 'paused', label: 'Paused' },
                    { value: 'inactive', label: 'Inactive' }
                ],
                value: link.status
            }
        ],
        submitText: 'Update Link',
        onSubmit: (data) => {
            linksView.updateLink(id, data);
            showToast({ 
                title: 'Link Updated', 
                message: 'Link has been updated successfully', 
                type: 'success' 
            });
        }
    });
}

function deleteLink(id) {
    const link = linksView.getLinkById(id);
    if (!link) return;
    
    showConfirmDialog({
        title: 'Delete Link',
        message: `Are you sure you want to delete "${link.title}"? This action cannot be undone.`,
        type: 'danger',
        confirmText: 'Delete Link',
        onConfirm: () => {
            linksView.deleteLink(id);
            showToast({ 
                title: 'Link Deleted', 
                message: 'Link has been deleted successfully', 
                type: 'success' 
            });
        }
    });
}

function viewLinkAnalytics(id) {
    const link = linksView.getLinkById(id);
    if (!link) return;
    
    const analyticsContent = `
        <div class="analytics-overview">
            <div class="analytics-metric">
                <div class="analytics-metric-value">${link.clicks.toLocaleString()}</div>
                <div class="analytics-metric-label">Total Clicks</div>
            </div>
            <div class="analytics-metric">
                <div class="analytics-metric-value">${link.ctr}%</div>
                <div class="analytics-metric-label">CTR</div>
            </div>
            <div class="analytics-metric">
                <div class="analytics-metric-value">${Math.floor(link.clicks / 30)}</div>
                <div class="analytics-metric-label">Daily Avg</div>
            </div>
            <div class="analytics-metric">
                <div class="analytics-metric-value">${link.status === 'active' ? 'Active' : 'Paused'}</div>
                <div class="analytics-metric-label">Status</div>
            </div>
        </div>
        
        <div class="analytics-chart-placeholder">
            📈 Click Analytics Chart (Coming Soon)
        </div>
        
        <div class="analytics-details">
            <div class="analytics-section">
                <h4>Top Referrers</h4>
                <ul class="analytics-list">
                    <li><span>Direct</span><span>45%</span></li>
                    <li><span>Social Media</span><span>28%</span></li>
                    <li><span>Email</span><span>18%</span></li>
                    <li><span>Other</span><span>9%</span></li>
                </ul>
            </div>
            <div class="analytics-section">
                <h4>Geographic Data</h4>
                <ul class="analytics-list">
                    <li><span>United States</span><span>52%</span></li>
                    <li><span>United Kingdom</span><span>18%</span></li>
                    <li><span>Canada</span><span>12%</span></li>
                    <li><span>Australia</span><span>8%</span></li>
                    <li><span>Other</span><span>10%</span></li>
                </ul>
            </div>
        </div>
    `;
    
    showModal({
        title: `Analytics: ${link.title}`,
        content: analyticsContent,
        size: 'lg',
        footer: `
            <button class="btn-website-secondary" onclick="exportLinkAnalytics('${id}')">Export Data</button>
            <button class="btn-website-primary" onclick="window.ModalSystem.closeModal(this.closest('.modal-overlay'))">Close</button>
        `
    });
}

function copyLink(id) {
    const link = linksView.getLinkById(id);
    if (!link) return;
    
    copyToClipboard(`https://${link.shortUrl}`);
}

function pauseLink(id) {
    const link = linksView.getLinkById(id);
    if (!link) return;
    
    const newStatus = link.status === 'active' ? 'paused' : 'active';
    linksView.updateLink(id, { status: newStatus });
    
    showToast({ 
        title: newStatus === 'paused' ? 'Link Paused' : 'Link Activated', 
        message: `Link has been ${newStatus}`, 
        type: 'info' 
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast({ 
            title: 'Copied!', 
            message: 'Link copied to clipboard', 
            type: 'success',
            duration: 2000
        });
    }).catch(() => {
        showToast({ 
            title: 'Copy Failed', 
            message: 'Could not copy to clipboard', 
            type: 'error' 
        });
    });
}

// Bulk actions
function exportSelectedLinks(selectedIds) {
    showToast({ 
        title: 'Export Started', 
        message: `Exporting ${selectedIds.length} links`, 
        type: 'info' 
    });
}

function pauseSelectedLinks(selectedIds) {
    selectedIds.forEach(id => {
        linksView.updateLink(id, { status: 'paused' });
    });
    showToast({ 
        title: 'Links Paused', 
        message: `${selectedIds.length} links have been paused`, 
        type: 'info' 
    });
}

function deleteSelectedLinks(selectedIds) {
    showConfirmDialog({
        title: 'Delete Selected Links',
        message: `Are you sure you want to delete ${selectedIds.length} selected links? This action cannot be undone.`,
        type: 'danger',
        confirmText: 'Delete Links',
        onConfirm: () => {
            selectedIds.forEach(id => {
                linksView.deleteLink(id);
            });
            showToast({ 
                title: 'Links Deleted', 
                message: `${selectedIds.length} links have been deleted`, 
                type: 'success' 
            });
        }
    });
}

// Quick actions
function importLinks() {
    showToast({ 
        title: 'Import Links', 
        message: 'Opening CSV import dialog...', 
        type: 'info' 
    });
}

function bulkCreateLinks() {
    showToast({ 
        title: 'Bulk Create', 
        message: 'Opening bulk creation tool...', 
        type: 'info' 
    });
}

function exportAnalytics() {
    showToast({ 
        title: 'Export Analytics', 
        message: 'Preparing analytics export...', 
        type: 'info' 
    });
}

function linkSettings() {
    showToast({ 
        title: 'Link Settings', 
        message: 'Opening link configuration...', 
        type: 'info' 
    });
}

function viewReports() {
    showToast({ 
        title: 'View Reports', 
        message: 'Opening detailed reports...', 
        type: 'info' 
    });
}

function exportLinkAnalytics(id) {
    showToast({ 
        title: 'Export Started', 
        message: 'Exporting link analytics data...', 
        type: 'info' 
    });
}
