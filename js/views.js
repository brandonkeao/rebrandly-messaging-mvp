/**
 * Views Manager
 * Contains HTML templates for all application views
 */

class Views {
    static getGettingStartedView() {
        return `
            <div class="getting-started-container">
                <!-- Hero Section -->
                <div class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Rebrandly Messaging</h1>
                        <p class="hero-subtitle">Create personalized SMS campaigns with branded short links</p>
                        <div class="hero-badges">
                            <span class="badge badge-primary">SMS Marketing</span>
                            <span class="badge badge-success">Link Tracking</span>
                            <span class="badge badge-info">Campaign Builder</span>
                        </div>
                    </div>
                </div>

                <!-- Overview Section -->
                <div class="overview-section">
                    <div class="card">
                        <h2 class="section-title">🎯 What This Tool Does</h2>
                        <p class="section-description" style="margin-bottom: var(--space-lg);">
                            This messaging platform helps you create and send personalized SMS campaigns using your branded short links. 
                            Perfect for marketing campaigns, product launches, event promotions, and customer engagement.
                        </p>
                        
                        <div class="feature-grid">
                            <div class="feature-item">
                                <div class="feature-icon">📋</div>
                                <h3>Contact Management</h3>
                                <p>Import and organize your contact lists with CSV support</p>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">🔗</div>
                                <h3>Link Integration</h3>
                                <p>Use your existing Rebrandly short links in campaigns</p>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">✏️</div>
                                <h3>Message Composer</h3>
                                <p>Create personalized messages with dynamic placeholders</p>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">📊</div>
                                <h3>Campaign Tracking</h3>
                                <p>Monitor delivery status and link click analytics</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step-by-Step Guide -->
                <div class="guide-section">
                    <div class="card">
                        <h2 class="section-title">🚀 How to Create Your First Campaign</h2>
                        
                        <div class="steps-container">
                            <div class="step-item">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h3>Select Contacts</h3>
                                    <p>Choose recipients from your contact list or import new contacts via CSV file. You can select individual contacts or entire groups.</p>
                                    <div class="step-actions">
                                        <button class="btn btn-outline" onclick="window.RebrandlyApp.navigateToView('contacts')">
                                            👥 Manage Contacts
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="step-item">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h3>Select Links</h3>
                                    <p>Choose which Rebrandly short links to include in your campaign. Links will be automatically inserted into your messages.</p>
                                    <div class="step-actions">
                                        <button class="btn btn-outline" onclick="window.RebrandlyApp.navigateToView('links')">
                                            🔗 View Links
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="step-item">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h3>Compose Message</h3>
                                    <p>Write your SMS message using personalization tokens like {name} and {company}. Preview how messages will look for different contacts.</p>
                                    <div class="step-features">
                                        <span class="feature-tag">📝 Rich Text Editor</span>
                                        <span class="feature-tag">🔤 Personalization</span>
                                        <span class="feature-tag">👀 Live Preview</span>
                                    </div>
                                </div>
                            </div>

                            <div class="step-item">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h3>Review & Send</h3>
                                    <p>Review your campaign details, preview messages, and schedule or send immediately. Track delivery and engagement in real-time.</p>
                                    <div class="step-features">
                                        <span class="feature-tag">⏰ Scheduling</span>
                                        <span class="feature-tag">📊 Analytics</span>
                                        <span class="feature-tag">📱 SMS Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions-section">
                    <div class="card">
                        <h2 class="section-title">⚡ Quick Actions</h2>
                        <div class="quick-actions-grid">
                            <button class="quick-action-btn" onclick="window.RebrandlyApp.navigateToView('select-contacts')">
                                <div class="action-icon">🚀</div>
                                <div class="action-text">
                                    <h3>Start New Campaign</h3>
                                    <p>Begin creating your SMS campaign</p>
                                </div>
                            </button>
                            
                            <button class="quick-action-btn" onclick="window.RebrandlyApp.navigateToView('contacts')">
                                <div class="action-icon">👥</div>
                                <div class="action-text">
                                    <h3>Manage Contacts</h3>
                                    <p>View and organize your contact lists</p>
                                </div>
                            </button>
                            
                            <button class="quick-action-btn" onclick="window.RebrandlyApp.navigateToView('links')">
                                <div class="action-icon">🔗</div>
                                <div class="action-text">
                                    <h3>Manage Links</h3>
                                    <p>Create and organize short links</p>
                                </div>
                            </button>
                            
                            <button class="quick-action-btn" onclick="window.RebrandlyApp.navigateToView('campaigns')">
                                <div class="action-icon">📊</div>
                                <div class="action-text">
                                    <h3>View Campaigns</h3>
                                    <p>Check campaign performance</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tips Section -->
                <div class="tips-section">
                    <div class="card">
                        <h2 class="section-title">💡 Pro Tips</h2>
                        <div class="tips-grid">
                            <div class="tip-item">
                                <div class="tip-icon">📋</div>
                                <div class="tip-content">
                                    <h4>CSV Import Format</h4>
                                    <p>Use columns: name, company, email, phone for best results</p>
                                </div>
                            </div>
                            <div class="tip-item">
                                <div class="tip-icon">🔤</div>
                                <div class="tip-content">
                                    <h4>Personalization Tokens</h4>
                                    <p>Use {name}, {company}, {email} to personalize messages</p>
                                </div>
                            </div>
                            <div class="tip-item">
                                <div class="tip-icon">📱</div>
                                <div class="tip-content">
                                    <h4>SMS Best Practices</h4>
                                    <p>Keep messages under 160 characters for single SMS</p>
                                </div>
                            </div>
                            <div class="tip-item">
                                <div class="tip-icon">⏰</div>
                                <div class="tip-content">
                                    <h4>Timing Matters</h4>
                                    <p>Send during business hours for better engagement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getLinksView() {
        return `
            <div class="links-view-container">
                <!-- Links Header -->
                <div class="view-header">
                    <div class="view-header-content">
                        <h1 class="view-title">🔗 Manage Links</h1>
                        <p class="view-subtitle">Create, manage, and track your branded short links</p>
                    </div>
                </div>

                <!-- Links Table Container -->
                <div class="links-table-section">
                    <div id="linksDataTable"></div>
                </div>

                <!-- Quick Actions Panel -->
                <div class="quick-actions-panel">
                    <h3 class="panel-title">Quick Actions</h3>
                    <div class="quick-actions-grid">
                        <button class="quick-action-card" onclick="bulkCreateLinks()">
                            <div class="action-icon">📋</div>
                            <div class="action-content">
                                <h4>Bulk Create</h4>
                                <p>Create multiple links at once</p>
                            </div>
                        </button>
                        <button class="quick-action-card" onclick="exportAnalytics()">
                            <div class="action-icon">📊</div>
                            <div class="action-content">
                                <h4>Export Analytics</h4>
                                <p>Download link performance data</p>
                            </div>
                        </button>
                        <button class="quick-action-card" onclick="linkSettings()">
                            <div class="action-icon">⚙️</div>
                            <div class="action-content">
                                <h4>Link Settings</h4>
                                <p>Configure default link options</p>
                            </div>
                        </button>
                        <button class="quick-action-card" onclick="viewReports()">
                            <div class="action-icon">📈</div>
                            <div class="action-content">
                                <h4>View Reports</h4>
                                <p>Detailed analytics and insights</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static getCampaignsView() {
        return `
            <div class="campaign-stats">
                <div class="stat-card">
                    <div class="stat-value info">12</div>
                    <div class="stat-label">Total Campaigns</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value success">8,547</div>
                    <div class="stat-label">Messages Sent</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value info">2,341</div>
                    <div class="stat-label">Link Clicks</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value success">27.4%</div>
                    <div class="stat-label">Click Rate</div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recent Campaigns</h2>
                    <button class="btn btn-primary" id="createCampaignBtn">
                        + New Campaign
                    </button>
                </div>
                
                <div class="campaign-list">
                    <div class="campaign-item" data-campaign-id="1">
                        <div class="campaign-info">
                            <h3>Q3 Product Launch</h3>
                            <div class="campaign-meta">
                                Sent to 1,247 contacts • 2 days ago
                            </div>
                        </div>
                        <div class="campaign-status">
                            <span class="badge badge-success">Completed</span>
                        </div>
                    </div>
                    
                    <div class="campaign-item" data-campaign-id="2">
                        <div class="campaign-info">
                            <h3>Customer Survey</h3>
                            <div class="campaign-meta">
                                Sent to 892 contacts • 1 week ago
                            </div>
                        </div>
                        <div class="campaign-status">
                            <span class="badge badge-success">Completed</span>
                        </div>
                    </div>
                    
                    <div class="campaign-item" data-campaign-id="3">
                        <div class="campaign-info">
                            <h3>Holiday Promotion</h3>
                            <div class="campaign-meta">
                                Draft • Created 3 days ago
                            </div>
                        </div>
                        <div class="campaign-status">
                            <span class="badge badge-warning">Draft</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getContactsView() {
        return `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">All Contacts</h2>
                    <button class="btn btn-primary" id="importContactsBtn">
                        Import Contacts
                    </button>
                </div>
                
                <div class="contact-filters">
                    <select class="form-input">
                        <option>All Lists</option>
                        <option>Customers</option>
                        <option>Prospects</option>
                        <option>Partners</option>
                    </select>
                    <button class="btn btn-secondary">Export</button>
                </div>
                
                <div class="contact-table">
                    <div class="contact-row" style="font-weight: 600; background: #f8fafc;">
                        <div>Name</div>
                        <div>Company</div>
                        <div>Email</div>
                        <div>Phone</div>
                        <div>Actions</div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-primary">M</div>
                            <span>Maria Thomas</span>
                        </div>
                        <div>Acme Corp</div>
                        <div>maria@acme.com</div>
                        <div style="color: var(--success-color);">+1 (555) 123-4567</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-info">B</div>
                            <span>Brandon Keao</span>
                        </div>
                        <div>Tech Solutions</div>
                        <div>brandon@techsol.com</div>
                        <div style="color: var(--success-color);">+1 (555) 234-5678</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-success">A</div>
                            <span>Alison Charles</span>
                        </div>
                        <div>Marketing Inc</div>
                        <div>alison@marketing.com</div>
                        <div style="color: var(--success-color);">+1 (555) 345-6789</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-warning">G</div>
                            <span>Grace Thompson</span>
                        </div>
                        <div>Digital Marketing Pro</div>
                        <div>grace@digitalmarketing.com</div>
                        <div style="color: var(--success-color);">+1 (555) 456-7890</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-error">H</div>
                            <span>Henry Rodriguez</span>
                        </div>
                        <div>E-commerce Solutions</div>
                        <div>henry@ecommerce.com</div>
                        <div style="color: var(--success-color);">+1 (555) 567-8901</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-neutral">I</div>
                            <span>Isabella Chen</span>
                        </div>
                        <div>Cloud Systems Inc</div>
                        <div>isabella@cloudsystems.com</div>
                        <div style="color: var(--success-color);">+1 (555) 678-9012</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                    
                    <div class="contact-row">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="contact-avatar-small contact-avatar-primary-dark">J</div>
                            <span>Jack Anderson</span>
                        </div>
                        <div>Retail Dynamics</div>
                        <div>jack@retaildynamics.com</div>
                        <div style="color: var(--success-color);">+1 (555) 789-0123</div>
                        <div>
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getMainLinksView() {
        return `
            <!-- Pro Tip Component -->
            <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd; margin-bottom: 24px;">
                <h4 style="color: #0369a1; font-size: 16px; font-weight: 600; margin-bottom: 12px;">💡 Pro Tip</h4>
                <p style="font-size: 14px; color: #0c4a6e; margin: 0; line-height: 1.5;">
                    Create branded short links here, then use them in your SMS campaigns. 
                    All clicks are automatically tracked with detailed analytics, giving you insights into campaign performance.
                </p>
            </div>

            <!-- Link Management Component -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Link Management</h2>
                    <button class="btn btn-primary" id="createLinkBtn">
                        + Create New Link
                    </button>
                </div>
                
                <div style="display: flex; gap: 12px; margin-bottom: 20px; align-items: center;">
                    <input type="text" class="form-input" id="linkSearch" placeholder="Search links..." style="flex: 1; max-width: 300px;">
                    <select class="form-input" style="width: auto;">
                        <option>All Links</option>
                        <option>Active</option>
                        <option>Archived</option>
                    </select>
                </div>
                
                <div class="links-list">
                    <div class="link-item" data-link-id="1">
                        <div class="link-icon">🔗</div>
                        <div class="link-details">
                            <div class="link-original">https://rebrandly.com/products/demo-2024</div>
                            <div class="link-short">rbly.co/demo-2024</div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                                Created 2 days ago • 47 clicks
                            </div>
                        </div>
                        <div class="link-actions" style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary link-copy-btn" style="padding: 6px 12px; font-size: 12px;">Copy</button>
                            <button class="btn btn-secondary link-edit-btn" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                            <button class="btn btn-secondary link-delete-btn" style="padding: 6px 12px; font-size: 12px; color: var(--error-color);">Delete</button>
                        </div>
                    </div>
                    
                    <div class="link-item" data-link-id="2">
                        <div class="link-icon">🔗</div>
                        <div class="link-details">
                            <div class="link-original">https://rebrandly.com/pricing</div>
                            <div class="link-short">rbly.co/pricing</div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                                Created 1 week ago • 123 clicks
                            </div>
                        </div>
                        <div class="link-actions" style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary link-copy-btn" style="padding: 6px 12px; font-size: 12px;">Copy</button>
                            <button class="btn btn-secondary link-edit-btn" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                            <button class="btn btn-secondary link-delete-btn" style="padding: 6px 12px; font-size: 12px; color: var(--error-color);">Delete</button>
                        </div>
                    </div>
                    
                    <div class="link-item" data-link-id="3">
                        <div class="link-icon">🔗</div>
                        <div class="link-details">
                            <div class="link-original">https://rebrandly.com/blog/sms-marketing-guide</div>
                            <div class="link-short">rbly.co/sms-guide</div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                                Created 2 weeks ago • 89 clicks
                            </div>
                        </div>
                        <div class="link-actions" style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary link-copy-btn" style="padding: 6px 12px; font-size: 12px;">Copy</button>
                            <button class="btn btn-secondary link-edit-btn" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                            <button class="btn btn-secondary link-delete-btn" style="padding: 6px 12px; font-size: 12px; color: var(--error-color);">Delete</button>
                        </div>
                    </div>
                    
                    <div class="link-item" data-link-id="4">
                        <div class="link-icon">🔗</div>
                        <div class="link-details">
                            <div class="link-original">https://rebrandly.com/features/analytics</div>
                            <div class="link-short">rbly.co/analytics</div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                                Created 3 weeks ago • 234 clicks
                            </div>
                        </div>
                        <div class="link-actions" style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary link-copy-btn" style="padding: 6px 12px; font-size: 12px;">Copy</button>
                            <button class="btn btn-secondary link-edit-btn" style="padding: 6px 12px; font-size: 12px;">Edit</button>
                            <button class="btn btn-secondary link-delete-btn" style="padding: 6px 12px; font-size: 12px; color: var(--error-color);">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getSelectContactsView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active"></div>
                    
                    <div class="step active">
                        <div class="step-number">1</div>
                        <div class="step-label">Select Contacts</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-label">Select Links</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Select Contacts for Campaign</h2>
                    <div style="color: var(--text-secondary); font-size: 14px;">
                        Choose existing contacts or import a new list
                    </div>
                </div>
                
                <div class="two-column">
                    <!-- Left Column - Existing Contacts -->
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">
                            📋 Existing Contacts
                        </h3>
                        
                        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
                            <input type="text" class="form-input" placeholder="Search contacts..." style="flex: 1; max-width: 300px;">
                            <button class="btn btn-secondary" style="padding: 8px 16px;">Select All</button>
                        </div>
                        
                        <div class="contacts-selection-list" style="max-height: 400px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
                            <div class="contact-selection-item">
                                <input type="checkbox" class="contact-checkbox" id="contact-1" data-contact-id="1">
                                <label for="contact-1" class="contact-selection-label">
                                    <div class="contact-avatar-small">S</div>
                                    <div class="contact-selection-info">
                                        <div class="contact-name">Sarah Johnson</div>
                                        <div class="contact-details">TechCorp • sarah@techcorp.com • +1 (555) 123-4567</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="contact-selection-item">
                                <input type="checkbox" class="contact-checkbox" id="contact-2" data-contact-id="2">
                                <label for="contact-2" class="contact-selection-label">
                                    <div class="contact-avatar-small">M</div>
                                    <div class="contact-selection-info">
                                        <div class="contact-name">Mike Chen</div>
                                        <div class="contact-details">StartupXYZ • mike@startupxyz.com • +1 (555) 234-5678</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="contact-selection-item">
                                <input type="checkbox" class="contact-checkbox" id="contact-3" data-contact-id="3">
                                <label for="contact-3" class="contact-selection-label">
                                    <div class="contact-avatar-small">B</div>
                                    <div class="contact-selection-info">
                                        <div class="contact-name">Brandon Keao</div>
                                        <div class="contact-details">Tech Solutions • brandon@techsol.com • +1 (555) 345-6789</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="contact-selection-item">
                                <input type="checkbox" class="contact-checkbox" id="contact-4" data-contact-id="4">
                                <label for="contact-4" class="contact-selection-label">
                                    <div class="contact-avatar-small">A</div>
                                    <div class="contact-selection-info">
                                        <div class="contact-name">Alison Charles</div>
                                        <div class="contact-details">Marketing Inc • alison@marketing.com • +1 (555) 456-7890</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 14px; color: var(--text-secondary);">
                            <span id="selectedContactsCount">0</span> contacts selected
                        </div>
                    </div>
                    
                    <!-- Right Column - Import New Contacts -->
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">
                            📤 Import New Contacts
                        </h3>
                        
                        <div class="upload-area">
                            <div class="upload-icon">📄</div>
                            <div class="upload-text">
                                <strong>Drop your CSV file here</strong><br>
                                or click to browse
                            </div>
                            <div class="upload-hint">
                                Supports CSV files up to 10MB
                            </div>
                            <input type="file" id="csvFileInput" accept=".csv" style="display: none;">
                        </div>
                        
                        <div class="csv-format-info">
                            <h4>Required CSV Format:</h4>
                            <div class="csv-example">
                                <div class="csv-header">name,company,email,phone</div>
                                <div class="csv-row">John Doe,Acme Corp,john@acme.com,+1234567890</div>
                                <div class="csv-row">Jane Smith,Tech Inc,jane@tech.com,+0987654321</div>
                            </div>
                            <a href="assets/sample-contacts.csv" download class="sample-link">
                                📥 Download Sample CSV
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="button-group right">
                    <button class="btn btn-secondary" onclick="window.RebrandlyApp.navigateToView('campaigns')">Cancel</button>
                    <button class="btn btn-primary" id="continueToSelectLinks" disabled>
                        Continue to Select Links →
                    </button>
                </div>
            </div>
        `;
    }

    static getSelectLinksView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active"></div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Select Contacts</div>
                    </div>
                    
                    <div class="step active">
                        <div class="step-number">2</div>
                        <div class="step-label">Select Links</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Select Links for Campaign</h2>
                    <div style="color: var(--text-secondary); font-size: 14px;">
                        Choose existing short links or create new ones
                    </div>
                </div>
                
                <div class="two-column">
                    <!-- Left Column - Existing Links -->
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">
                            🔗 Existing Links
                        </h3>
                        
                        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
                            <input type="text" class="form-input" placeholder="Search links..." style="flex: 1; max-width: 300px;">
                        </div>
                        
                        <div class="links-selection-list" style="max-height: 400px; overflow-y: auto;">
                            <div class="link-selection-item">
                                <input type="checkbox" class="link-checkbox" id="link-1" data-link-id="1">
                                <label for="link-1" class="link-selection-label">
                                    <div class="link-selection-info">
                                        <div class="link-short-url">rbly.co/demo-2024</div>
                                        <div class="link-original-url">https://rebrandly.com/products/demo-2024</div>
                                        <div class="link-stats">47 clicks • Created 2 days ago</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="link-selection-item">
                                <input type="checkbox" class="link-checkbox" id="link-2" data-link-id="2">
                                <label for="link-2" class="link-selection-label">
                                    <div class="link-selection-info">
                                        <div class="link-short-url">rbly.co/pricing</div>
                                        <div class="link-original-url">https://rebrandly.com/pricing</div>
                                        <div class="link-stats">123 clicks • Created 1 week ago</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="link-selection-item">
                                <input type="checkbox" class="link-checkbox" id="link-3" data-link-id="3">
                                <label for="link-3" class="link-selection-label">
                                    <div class="link-selection-info">
                                        <div class="link-short-url">rbly.co/sms-guide</div>
                                        <div class="link-original-url">https://rebrandly.com/blog/sms-marketing-guide</div>
                                        <div class="link-stats">89 clicks • Created 2 weeks ago</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 14px; color: var(--text-secondary);">
                            <span id="selectedLinksCount">0</span> links selected (optional)
                        </div>
                    </div>
                    
                    <!-- Right Column - Create New Link -->
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">
                            ➕ Create New Link
                        </h3>
                        
                        <div class="card" style="background: #f8fafc; border: 1px solid var(--border-color);">
                            <div style="text-align: center; padding: 24px;">
                                <div style="font-size: 48px; margin-bottom: 16px;">🔗</div>
                                <h4 style="margin-bottom: 8px;">Need a new short link?</h4>
                                <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">
                                    Create a branded short link to include in your SMS campaign
                                </p>
                                <button class="btn btn-primary" id="createNewLinkBtn">
                                    + Create New Link
                                </button>
                            </div>
                        </div>
                        
                        <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd; margin-top: 16px;">
                            <h4 style="color: #0369a1; font-size: 14px; font-weight: 600; margin-bottom: 8px;">💡 Pro Tip</h4>
                            <p style="font-size: 13px; color: #0c4a6e; margin: 0;">
                                Links are optional but recommended. They help track engagement and provide better analytics for your SMS campaigns.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="button-group right">
                    <button class="btn btn-secondary" onclick="window.RebrandlyApp.navigateToView('select-contacts')">← Back</button>
                    <button class="btn btn-primary" id="continueToCompose">
                        Continue to Compose →
                    </button>
                </div>
            </div>
        `;
    }

    // Legacy method for backward compatibility
    static getImportView() {
        return this.getSelectContactsView();
    }
    static getComposeView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active step-3"></div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Select Contacts</div>
                    </div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Select Links</div>
                    </div>
                    
                    <div class="step active">
                        <div class="step-number">3</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>
            
            <div class="two-column compose">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Compose Message</h2>
                        <span class="badge badge-warning">Draft</span>
                    </div>
                    
                    <div class="test-banner">
                        <div class="test-icon">!</div>
                        <div style="flex: 1;">
                            <strong>Test Mode Active</strong>
                            <p style="font-size: 12px; margin-top: 2px;">Messages will only be sent to internal team members</p>
                        </div>
                    </div>
                    
                    <form class="compose-form">
                        <div class="message-composer">
                            <div class="composer-header">
                                <label class="form-label">Message Content</label>
                                <span class="char-counter" id="charCounter">0/160 characters</span>
                            </div>
                            <textarea 
                                class="form-textarea" 
                                id="messageContent"
                                name="message"
                                placeholder="Type your message here..."
                                maxlength="160"
                            >Hi {{name}}! Check out our latest updates for {{company}} at rbly.co/demo-2024</textarea>
                            
                            <div class="variable-pills">
                                <div class="variable-pill">{{name}}</div>
                                <div class="variable-pill">{{company}}</div>
                                <div class="variable-pill">{{email}}</div>
                                <div class="variable-pill">+ Add Link</div>
                            </div>
                        </div>
                        
                        <div class="card" style="background: #f8fafc; padding: 16px; margin-top: 20px;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Branded Links</h3>
                            
                            <div class="link-item">
                                <div class="link-icon">🔗</div>
                                <div class="link-details">
                                    <div class="link-original">https://rebrandly.com/products/demo-2024</div>
                                    <div class="link-short">rbly.co/demo-2024</div>
                                </div>
                            </div>
                            
                            <button type="button" class="btn btn-secondary" style="width: 100%; margin-top: 12px;">+ Add Another Link</button>
                        </div>
                        
                        <div class="button-group right">
                            <button type="button" class="btn btn-secondary">Save Draft</button>
                            <button type="button" class="btn btn-primary" id="continueToReview">Continue to Review →</button>
                        </div>
                    </form>
                </div>
                
                <div class="card message-preview-container">
                    <div class="phone-preview">
                        <div class="phone-screen">
                            <div class="phone-header">
                                <div class="contact-avatar">R</div>
                                <div>
                                    <div style="font-weight: 500;">Rebrandly</div>
                                    <div style="font-size: 12px; color: var(--text-muted);">SMS</div>
                                </div>
                            </div>
                            
                            <div class="message-bubble">
                                Hi Maria! Check out our latest updates for Acme Corp at <a href="#" class="message-link">rbly.co/demo-2024</a>
                            </div>
                            
                            <div style="margin-top: 20px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #86efac;">
                                <div style="font-size: 12px; color: #166534; font-weight: 500; margin-bottom: 4px;">✓ Link Analytics Active</div>
                                <div style="font-size: 11px; color: #15803d;">Track clicks, locations, and conversions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getCampaignLinksView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active step-3"></div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Import Contacts</div>
                    </div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step active">
                        <div class="step-number">3</div>
                        <div class="step-label">Add Links</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Manage Links</h2>
                    <span class="badge badge-info">Step 3 of 4</span>
                </div>
                
                <p style="color: var(--text-secondary); margin-bottom: 24px;">
                    Add and customize branded links for your campaign. All links will be automatically shortened and tracked.
                </p>
                
                <div class="two-column">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Current Links</h3>
                        
                        <div class="link-item">
                            <div class="link-icon">🔗</div>
                            <div class="link-details">
                                <div class="link-original">https://rebrandly.com/products/demo-2024</div>
                                <div class="link-short">rbly.co/demo-2024</div>
                            </div>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">Edit</button>
                        </div>
                        
                        <button class="btn btn-primary" id="addLinkBtn" style="width: 100%; margin-top: 16px;">
                            + Add New Link
                        </button>
                    </div>
                    
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Link Analytics Preview</h3>
                        
                        <div class="stat-card">
                            <div class="stat-value info">Real-time</div>
                            <div class="stat-label">Click Tracking</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-value success">Geographic</div>
                            <div class="stat-label">Location Data</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-value info">Device & Browser</div>
                            <div class="stat-label">User Analytics</div>
                        </div>
                    </div>
                </div>
                
                <div class="button-group right">
                    <button class="btn btn-secondary">Save Draft</button>
                    <button class="btn btn-primary" id="continueToReview">Continue →</button>
                </div>
            </div>
        `;
    }

    static getReviewView() {
        return `
            <div class="review-send-container">
                <!-- Review Header -->
                <div class="view-header">
                    <div class="view-header-content">
                        <h1 class="view-title">📋 Review & Send Campaign</h1>
                        <p class="view-subtitle">Review your campaign details before sending to contacts</p>
                    </div>
                    <div class="view-header-actions">
                        <button class="btn-website-secondary" onclick="saveDraft()">
                            Save Draft
                        </button>
                        <button class="btn-website-primary" onclick="sendCampaign()" id="sendCampaignBtn">
                            Send Campaign
                        </button>
                    </div>
                </div>

                <!-- Campaign Summary Cards -->
                <div class="campaign-summary-grid">
                    <div class="summary-card">
                        <div class="summary-content">
                            <div class="summary-value" id="contactCount">4</div>
                            <div class="summary-label">Contacts Selected</div>
                            <div class="summary-detail">Ready to receive messages</div>
                        </div>
                        <button class="summary-action" onclick="editContacts()">Edit</button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-content">
                            <div class="summary-value" id="linkCount">2</div>
                            <div class="summary-label">Links Included</div>
                            <div class="summary-detail">Branded short links</div>
                        </div>
                        <button class="summary-action" onclick="editLinks()">Edit</button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-content">
                            <div class="summary-value" id="messageLength">142</div>
                            <div class="summary-label">Characters</div>
                            <div class="summary-detail">Message length</div>
                        </div>
                        <button class="summary-action" onclick="editMessage()">Edit</button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-content">
                            <div class="summary-value" id="estimatedCost">$0.12</div>
                            <div class="summary-label">Estimated Cost</div>
                            <div class="summary-detail">Based on contact count</div>
                        </div>
                        <button class="summary-action" onclick="viewPricing()">Details</button>
                    </div>
                </div>

                <!-- Message Preview -->
                <div class="message-preview-section">
                    <h2 class="section-title">Message Preview</h2>
                    <div class="message-preview-container">
                        <div class="phone-mockup">
                            <div class="phone-screen">
                                <div class="message-bubble">
                                    <div class="message-content" id="previewMessage">
                                        Hi Sarah! 👋 Check out our new product demo at rbly.co/demo-2024 and see our pricing at rbly.co/pricing. Let me know what you think!
                                    </div>
                                    <div class="message-time">Now</div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-details">
                            <h3>Message Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">From:</span>
                                <span class="detail-value">Your Business Name</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Type:</span>
                                <span class="detail-value">SMS Text Message</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Delivery:</span>
                                <span class="detail-value">Immediate</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Variables:</span>
                                <span class="detail-value" id="variableCount">1 personalization variable</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact List Preview -->
                <div class="contact-list-section">
                    <h2 class="section-title">Selected Contacts</h2>
                    <div class="contact-list-preview">
                        <div class="contact-list-header">
                            <div class="contact-list-stats">
                                <span class="stat-item">
                                    <span class="stat-value" id="totalContacts">4</span>
                                    <span class="stat-label">Total</span>
                                </span>
                                <span class="stat-item">
                                    <span class="stat-value" id="validContacts">4</span>
                                    <span class="stat-label">Valid</span>
                                </span>
                                <span class="stat-item">
                                    <span class="stat-value" id="invalidContacts">0</span>
                                    <span class="stat-label">Invalid</span>
                                </span>
                            </div>
                            <button class="btn-website-secondary btn-sm" onclick="viewAllContacts()">View All</button>
                        </div>
                        <div class="contact-list-items" id="contactPreviewList">
                            <div class="contact-preview-item">
                                <div class="contact-avatar-small contact-avatar-primary">S</div>
                                <div class="contact-info">
                                    <div class="contact-name">Sarah Johnson</div>
                                    <div class="contact-details">TechCorp • +1 (555) 123-4567</div>
                                </div>
                                <div class="contact-status valid">✓</div>
                            </div>
                            <div class="contact-preview-item">
                                <div class="contact-avatar-small contact-avatar-info">M</div>
                                <div class="contact-info">
                                    <div class="contact-name">Mike Chen</div>
                                    <div class="contact-details">StartupXYZ • +1 (555) 234-5678</div>
                                </div>
                                <div class="contact-status valid">✓</div>
                            </div>
                            <div class="contact-preview-item">
                                <div class="contact-avatar-small contact-avatar-success">B</div>
                                <div class="contact-info">
                                    <div class="contact-name">Brandon Keao</div>
                                    <div class="contact-details">Tech Solutions • +1 (555) 345-6789</div>
                                </div>
                                <div class="contact-status valid">✓</div>
                            </div>
                            <div class="contact-preview-item">
                                <div class="contact-avatar-small contact-avatar-warning">A</div>
                                <div class="contact-info">
                                    <div class="contact-name">Alison Charles</div>
                                    <div class="contact-details">Marketing Inc • +1 (555) 456-7890</div>
                                </div>
                                <div class="contact-status valid">✓</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Send Options -->
                <div class="send-options-section">
                    <h2 class="section-title">Send Options</h2>
                    <div class="send-options-grid">
                        <div class="send-option-card">
                            <div class="option-header">
                                <input type="radio" name="sendOption" value="immediate" id="sendImmediate" checked>
                                <label for="sendImmediate" class="option-title">Send Immediately</label>
                            </div>
                            <p class="option-description">Send the campaign to all contacts right now</p>
                        </div>

                        <div class="send-option-card">
                            <div class="option-header">
                                <input type="radio" name="sendOption" value="scheduled" id="sendScheduled">
                                <label for="sendScheduled" class="option-title">Schedule for Later</label>
                            </div>
                            <p class="option-description">Choose a specific date and time to send</p>
                            <div class="schedule-inputs" id="scheduleInputs" style="display: none;">
                                <div class="input-group">
                                    <label for="scheduleDate">Date:</label>
                                    <input type="date" id="scheduleDate" class="form-input">
                                </div>
                                <div class="input-group">
                                    <label for="scheduleTime">Time:</label>
                                    <input type="time" id="scheduleTime" class="form-input">
                                </div>
                            </div>
                        </div>

                        <div class="send-option-card">
                            <div class="option-header">
                                <input type="radio" name="sendOption" value="test" id="sendTest">
                                <label for="sendTest" class="option-title">Send Test Message</label>
                            </div>
                            <p class="option-description">Send a test message to yourself first</p>
                            <div class="test-inputs" id="testInputs" style="display: none;">
                                <div class="input-group">
                                    <label for="testPhone">Your Phone Number:</label>
                                    <input type="tel" id="testPhone" class="form-input" placeholder="+1 (555) 123-4567">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pre-send Checklist -->
                <div class="checklist-section">
                    <h2 class="section-title">Pre-send Checklist</h2>
                    <div class="checklist-container">
                        <div class="checklist-item">
                            <input type="checkbox" id="check1" class="checklist-checkbox">
                            <label for="check1" class="checklist-label">
                                <span class="checklist-title">Message content reviewed</span>
                                <span class="checklist-description">Spelling, grammar, and links verified</span>
                            </label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check2" class="checklist-checkbox">
                            <label for="check2" class="checklist-label">
                                <span class="checklist-title">Contact list verified</span>
                                <span class="checklist-description">All phone numbers are valid and opted-in</span>
                            </label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check3" class="checklist-checkbox">
                            <label for="check3" class="checklist-label">
                                <span class="checklist-title">Compliance confirmed</span>
                                <span class="checklist-description">Message follows SMS marketing regulations</span>
                            </label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check4" class="checklist-checkbox">
                            <label for="check4" class="checklist-label">
                                <span class="checklist-title">Budget approved</span>
                                <span class="checklist-description">Campaign cost fits within budget</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Campaign Actions -->
                <div class="campaign-actions">
                    <div class="actions-left">
                        <button class="btn-website-secondary" onclick="goBack()">
                            Back to Compose
                        </button>
                        <button class="btn-website-secondary" onclick="saveDraft()">Save as Draft</button>
                    </div>
                    <div class="actions-right">
                        <button class="btn-website-blue" onclick="sendTestMessage()" id="testBtn">Send Test</button>
                        <button class="btn-website-primary" onclick="confirmSend()" id="finalSendBtn">
                            Send Campaign
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static getLinkManagementView() {
        return `
            <div class="settings-container">
                <!-- Connection Status -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Rebrandly Connection</h2>
                        <div class="connection-status disconnected">
                            <span class="status-indicator"></span>
                            <span class="status-text">Not Connected</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-description">Connect your Rebrandly account to automatically sync your branded short links and enable advanced link management features.</p>
                        
                        <div class="form-group">
                            <label for="apiKey" class="form-label">Rebrandly API Key</label>
                            <div class="input-group">
                                <input type="password" id="apiKey" class="form-input" placeholder="Enter your Rebrandly API key">
                                <button class="btn-secondary" onclick="toggleApiKeyVisibility()">Show</button>
                            </div>
                            <div class="form-help">
                                <a href="https://developers.rebrandly.com/docs/api-key-authentication" target="_blank" class="help-link">
                                    How to get your API key →
                                </a>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="workspace" class="form-label">Workspace (Optional)</label>
                            <select id="workspace" class="form-select">
                                <option value="">Select workspace...</option>
                                <option value="default">Default Workspace</option>
                            </select>
                        </div>

                        <div class="form-actions">
                            <button class="btn-primary" onclick="connectRebrandly()">Connect Account</button>
                            <button class="btn-secondary" onclick="testConnection()">Test Connection</button>
                        </div>
                    </div>
                </div>

                <!-- Link Sync Settings -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Link Synchronization</h2>
                    </div>
                    <div class="card-content">
                        <div class="settings-grid">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Auto-sync Links</h3>
                                    <p class="setting-description">Automatically import new links from your Rebrandly account</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="autoSync">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Sync Frequency</h3>
                                    <p class="setting-description">How often to check for new links</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select" id="syncFrequency">
                                        <option value="realtime">Real-time</option>
                                        <option value="hourly">Every hour</option>
                                        <option value="daily" selected>Daily</option>
                                        <option value="weekly">Weekly</option>
                                    </select>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Link Categories</h3>
                                    <p class="setting-description">Import links from specific categories only</p>
                                </div>
                                <div class="setting-control">
                                    <button class="btn-secondary" onclick="manageLinkCategories()">Manage Categories</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Usage Analytics -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Link Usage Analytics</h2>
                    </div>
                    <div class="card-content">
                        <div class="analytics-summary">
                            <div class="metric-card">
                                <div class="metric-value">0</div>
                                <div class="metric-label">Links Synced</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">0</div>
                                <div class="metric-label">Used in Campaigns</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">0</div>
                                <div class="metric-label">Total Clicks</div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button class="btn-secondary" onclick="syncNow()">Sync Now</button>
                            <button class="btn-secondary" onclick="viewLinkAnalytics()">View Detailed Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getSmsMessagingView() {
        return `
            <div class="settings-container">
                <!-- Provider Selection -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">SMS Provider</h2>
                        <div class="connection-status disconnected">
                            <span class="status-indicator"></span>
                            <span class="status-text">No Provider Connected</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-description">Choose and configure your SMS messaging provider to enable campaign sending.</p>
                        
                        <div class="provider-grid">
                            <div class="provider-card" data-provider="twilio">
                                <div class="provider-logo">
                                    <div class="provider-icon">📱</div>
                                </div>
                                <h3 class="provider-name">Twilio</h3>
                                <p class="provider-description">Industry-leading SMS platform with global reach</p>
                                <div class="provider-features">
                                    <span class="feature-tag">Global Coverage</span>
                                    <span class="feature-tag">High Deliverability</span>
                                    <span class="feature-tag">Analytics</span>
                                </div>
                                <button class="btn-primary provider-connect" onclick="connectProvider('twilio')">Connect</button>
                            </div>

                            <div class="provider-card" data-provider="messagebird">
                                <div class="provider-logo">
                                    <div class="provider-icon">🐦</div>
                                </div>
                                <h3 class="provider-name">MessageBird</h3>
                                <p class="provider-description">European-focused SMS platform with competitive pricing</p>
                                <div class="provider-features">
                                    <span class="feature-tag">EU Compliant</span>
                                    <span class="feature-tag">Cost Effective</span>
                                    <span class="feature-tag">Multi-channel</span>
                                </div>
                                <button class="btn-secondary provider-connect" onclick="connectProvider('messagebird')">Connect</button>
                            </div>

                            <div class="provider-card" data-provider="sendgrid">
                                <div class="provider-logo">
                                    <div class="provider-icon">📧</div>
                                </div>
                                <h3 class="provider-name">SendGrid</h3>
                                <p class="provider-description">Email and SMS platform with unified dashboard</p>
                                <div class="provider-features">
                                    <span class="feature-tag">Unified Platform</span>
                                    <span class="feature-tag">Email + SMS</span>
                                    <span class="feature-tag">Templates</span>
                                </div>
                                <button class="btn-secondary provider-connect" onclick="connectProvider('sendgrid')">Connect</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Messaging Configuration -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Messaging Configuration</h2>
                    </div>
                    <div class="card-content">
                        <div class="settings-grid">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Default Sender ID</h3>
                                    <p class="setting-description">The name or number that appears as the sender</p>
                                </div>
                                <div class="setting-control">
                                    <input type="text" class="form-input" placeholder="e.g., YourBrand or +1234567890" id="senderId">
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Message Encoding</h3>
                                    <p class="setting-description">Character encoding for international messages</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select" id="encoding">
                                        <option value="gsm7">GSM 7-bit (160 chars)</option>
                                        <option value="unicode">Unicode (70 chars)</option>
                                        <option value="auto" selected>Auto-detect</option>
                                    </select>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Delivery Reports</h3>
                                    <p class="setting-description">Track message delivery status</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="deliveryReports" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Opt-out Handling</h3>
                                    <p class="setting-description">Automatically handle STOP/UNSUBSCRIBE replies</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="optOutHandling" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compliance & Limits -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Compliance & Rate Limits</h2>
                    </div>
                    <div class="card-content">
                        <div class="compliance-info">
                            <div class="info-item">
                                <h3 class="info-title">📋 Compliance Requirements</h3>
                                <ul class="compliance-list">
                                    <li>All contacts must have opted-in to receive messages</li>
                                    <li>Include clear opt-out instructions in campaigns</li>
                                    <li>Respect local regulations (GDPR, TCPA, etc.)</li>
                                    <li>Maintain consent records for audit purposes</li>
                                </ul>
                            </div>
                            
                            <div class="info-item">
                                <h3 class="info-title">⚡ Rate Limits</h3>
                                <div class="limit-settings">
                                    <div class="form-group">
                                        <label class="form-label">Messages per minute</label>
                                        <input type="number" class="form-input" value="10" min="1" max="100" id="rateLimit">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Daily message limit</label>
                                        <input type="number" class="form-input" value="1000" min="1" id="dailyLimit">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getContactListView() {
        return `
            <div class="settings-container">
                <!-- Connected Platforms -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Connected Platforms</h2>
                        <button class="btn-primary" onclick="addNewIntegration()">Add Integration</button>
                    </div>
                    <div class="card-content">
                        <div class="integration-list">
                            <!-- HubSpot Integration -->
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-logo">
                                        <div class="platform-icon hubspot">🔶</div>
                                    </div>
                                    <div class="integration-details">
                                        <h3 class="integration-name">HubSpot CRM</h3>
                                        <p class="integration-description">Sync contacts and track engagement in your CRM</p>
                                        <div class="integration-status disconnected">
                                            <span class="status-indicator"></span>
                                            <span class="status-text">Not Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="integration-actions">
                                    <button class="btn-primary" onclick="connectPlatform('hubspot')">Connect</button>
                                    <button class="btn-secondary" onclick="configurePlatform('hubspot')">Configure</button>
                                </div>
                            </div>

                            <!-- Salesforce Integration -->
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-logo">
                                        <div class="platform-icon salesforce">☁️</div>
                                    </div>
                                    <div class="integration-details">
                                        <h3 class="integration-name">Salesforce</h3>
                                        <p class="integration-description">Enterprise CRM integration with advanced segmentation</p>
                                        <div class="integration-status disconnected">
                                            <span class="status-indicator"></span>
                                            <span class="status-text">Not Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="integration-actions">
                                    <button class="btn-primary" onclick="connectPlatform('salesforce')">Connect</button>
                                    <button class="btn-secondary" onclick="configurePlatform('salesforce')">Configure</button>
                                </div>
                            </div>

                            <!-- Mailchimp Integration -->
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-logo">
                                        <div class="platform-icon mailchimp">🐵</div>
                                    </div>
                                    <div class="integration-details">
                                        <h3 class="integration-name">Mailchimp</h3>
                                        <p class="integration-description">Email marketing platform with audience management</p>
                                        <div class="integration-status disconnected">
                                            <span class="status-indicator"></span>
                                            <span class="status-text">Not Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="integration-actions">
                                    <button class="btn-primary" onclick="connectPlatform('mailchimp')">Connect</button>
                                    <button class="btn-secondary" onclick="configurePlatform('mailchimp')">Configure</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sync Configuration -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Synchronization Settings</h2>
                    </div>
                    <div class="card-content">
                        <div class="settings-grid">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Auto-sync Contacts</h3>
                                    <p class="setting-description">Automatically import new contacts from connected platforms</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="autoSyncContacts" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Sync Direction</h3>
                                    <p class="setting-description">How contact data flows between platforms</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select" id="syncDirection">
                                        <option value="import">Import Only (Platform → Rebrandly)</option>
                                        <option value="export">Export Only (Rebrandly → Platform)</option>
                                        <option value="bidirectional" selected>Bidirectional Sync</option>
                                    </select>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Sync Frequency</h3>
                                    <p class="setting-description">How often to check for contact updates</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select" id="contactSyncFrequency">
                                        <option value="realtime">Real-time</option>
                                        <option value="hourly" selected>Every hour</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                    </select>
                                </div>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3 class="setting-title">Duplicate Handling</h3>
                                    <p class="setting-description">How to handle duplicate contacts across platforms</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select" id="duplicateHandling">
                                        <option value="merge" selected>Merge duplicates</option>
                                        <option value="skip">Skip duplicates</option>
                                        <option value="create">Create separate entries</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Field Mapping -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Field Mapping</h2>
                        <p class="card-subtitle">Map contact fields between Rebrandly and external platforms</p>
                    </div>
                    <div class="card-content">
                        <div class="field-mapping-table">
                            <div class="mapping-header">
                                <div class="mapping-col">Rebrandly Field</div>
                                <div class="mapping-col">External Platform Field</div>
                                <div class="mapping-col">Sync Status</div>
                            </div>
                            
                            <div class="mapping-row">
                                <div class="mapping-col">
                                    <strong>Name</strong>
                                </div>
                                <div class="mapping-col">
                                    <select class="form-select">
                                        <option value="">Select field...</option>
                                        <option value="firstname" selected>First Name</option>
                                        <option value="fullname">Full Name</option>
                                        <option value="displayname">Display Name</option>
                                    </select>
                                </div>
                                <div class="mapping-col">
                                    <span class="sync-status active">Active</span>
                                </div>
                            </div>

                            <div class="mapping-row">
                                <div class="mapping-col">
                                    <strong>Company</strong>
                                </div>
                                <div class="mapping-col">
                                    <select class="form-select">
                                        <option value="">Select field...</option>
                                        <option value="company" selected>Company</option>
                                        <option value="organization">Organization</option>
                                        <option value="employer">Employer</option>
                                    </select>
                                </div>
                                <div class="mapping-col">
                                    <span class="sync-status active">Active</span>
                                </div>
                            </div>

                            <div class="mapping-row">
                                <div class="mapping-col">
                                    <strong>Email</strong>
                                </div>
                                <div class="mapping-col">
                                    <select class="form-select">
                                        <option value="">Select field...</option>
                                        <option value="email" selected>Email</option>
                                        <option value="primary_email">Primary Email</option>
                                        <option value="work_email">Work Email</option>
                                    </select>
                                </div>
                                <div class="mapping-col">
                                    <span class="sync-status active">Active</span>
                                </div>
                            </div>

                            <div class="mapping-row">
                                <div class="mapping-col">
                                    <strong>Phone</strong>
                                </div>
                                <div class="mapping-col">
                                    <select class="form-select">
                                        <option value="">Select field...</option>
                                        <option value="phone" selected>Phone</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="work_phone">Work Phone</option>
                                    </select>
                                </div>
                                <div class="mapping-col">
                                    <span class="sync-status active">Active</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="btn-primary" onclick="saveFieldMapping()">Save Mapping</button>
                            <button class="btn-secondary" onclick="testSync()">Test Sync</button>
                        </div>
                    </div>
                </div>

                <!-- Sync History -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Recent Sync Activity</h2>
                    </div>
                    <div class="card-content">
                        <div class="sync-history">
                            <div class="sync-item">
                                <div class="sync-info">
                                    <div class="sync-platform">HubSpot</div>
                                    <div class="sync-details">Last sync: Never</div>
                                </div>
                                <div class="sync-status">
                                    <span class="status-badge pending">Pending Setup</span>
                                </div>
                            </div>
                            
                            <div class="sync-item">
                                <div class="sync-info">
                                    <div class="sync-platform">Salesforce</div>
                                    <div class="sync-details">Last sync: Never</div>
                                </div>
                                <div class="sync-status">
                                    <span class="status-badge pending">Pending Setup</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="empty-state">
                            <p>No sync activity yet. Connect a platform to get started.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
