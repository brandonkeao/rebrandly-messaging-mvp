/**
 * Views Manager
 * Contains HTML templates for all application views
 */

class Views {
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
                    <input type="text" class="form-input contact-search" id="contactSearch" placeholder="Search contacts...">
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
                            <div class="contact-avatar-small">M</div>
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
                            <div class="contact-avatar-small">B</div>
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
                            <div class="contact-avatar-small">A</div>
                            <span>Alison Charles</span>
                        </div>
                        <div>Marketing Inc</div>
                        <div>alison@marketing.com</div>
                        <div style="color: var(--success-color);">+1 (555) 345-6789</div>
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
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Link Management</h2>
                    <button class="btn btn-primary" id="createLinkBtn">
                        + Create New Link
                    </button>
                </div>
                
                <div class="two-column">
                    <!-- Left Column - Link List -->
                    <div>
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
                    
                    <!-- Right Column - Analytics & Info -->
                    <div>
                        <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd; margin-bottom: 16px;">
                            <h4 style="color: #0369a1; font-size: 14px; font-weight: 600; margin-bottom: 8px;">💡 Pro Tip</h4>
                            <p style="font-size: 13px; color: #0c4a6e; margin: 0;">
                                Create branded short links here, then use them in your SMS campaigns. 
                                All clicks are automatically tracked with detailed analytics.
                            </p>
                        </div>
                        
                        <div class="card" style="background: #f8fafc;">
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Quick Actions</h4>
                            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 8px;">
                                📊 View Analytics Dashboard
                            </button>
                            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 8px;">
                                📤 Export Link Data
                            </button>
                            <button class="btn btn-secondary" style="width: 100%;">
                                ⚙️ Link Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getImportView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active"></div>
                    
                    <div class="step active">
                        <div class="step-number">1</div>
                        <div class="step-label">Import Contacts</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-label">Add Links</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>
            
            <div class="two-column">
                <!-- Left Column - Main Content -->
                <div>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Import Contact List</h2>
                            <span class="badge badge-info">Step 1 of 4</span>
                        </div>
                        
                        <div class="import-guide">
                            <h4>Before you start:</h4>
                            <ul class="import-requirements">
                                <li>Ensure your CSV has the required columns: Name, Company, Email, Phone</li>
                                <li>Phone numbers should include country code (e.g., +1 for US)</li>
                                <li>Maximum file size is 10MB</li>
                                <li>Remove any duplicate entries</li>
                            </ul>
                        </div>
                        
                        <div class="upload-area" id="uploadArea">
                            <div class="upload-icon">📤</div>
                            <h3 style="font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Upload your contact list</h3>
                            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">Drag and drop your CSV file here, or click to browse</p>
                            <button type="button" class="btn btn-primary">Choose File</button>
                            <p style="font-size: 12px; color: var(--text-muted); margin-top: 16px;">Maximum file size: 10MB • Supported format: CSV</p>
                            <input type="file" id="csvFileInput" accept=".csv" style="display: none;">
                        </div>
                        
                        <div id="uploadedContent" style="display: none;">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Company</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody id="contactsTableBody">
                                        <!-- Contacts will be populated here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="button-group right">
                            <button class="btn btn-secondary">Save Draft</button>
                            <button class="btn btn-primary" id="continueToCompose" disabled>Continue →</button>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column - Help & Summary -->
                <div>
                    <div class="card">
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">CSV Format Guide</h3>
                        
                        <div class="sample-data">
                            <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #475569;">Required columns:</div>
                            <div class="sample-format">
                                Name, Company, Email, Phone<br>
                                John Doe, Acme Inc, john@acme.com, +15551234567
                            </div>
                        </div>
                        
                        <div id="uploadStats" style="display: none;">
                            <div class="stat-card">
                                <div class="stat-value info" id="totalContacts">0</div>
                                <div class="stat-label">Total Contacts</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value success" id="validContacts">0</div>
                                <div class="stat-label">Valid Numbers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getComposeView() {
        return `
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active step-2"></div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Import Contacts</div>
                    </div>
                    
                    <div class="step active">
                        <div class="step-number">2</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-label">Add Links</div>
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
                            <button type="button" class="btn btn-primary" id="continueToLinks">Continue →</button>
                        </div>
                    </form>
                </div>
                
                <div class="card message-preview-container">
                    <h2 class="card-title" style="margin-bottom: 20px;">Preview</h2>
                    
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
            <!-- Progress Steps -->
            <div class="progress-container">
                <div class="progress-steps">
                    <div class="progress-line"></div>
                    <div class="progress-line-active step-4"></div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Import Contacts</div>
                    </div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Compose Message</div>
                    </div>
                    
                    <div class="step completed">
                        <div class="step-number">✓</div>
                        <div class="step-label">Add Links</div>
                    </div>
                    
                    <div class="step active">
                        <div class="step-number">4</div>
                        <div class="step-label">Review & Send</div>
                    </div>
                </div>
            </div>
            
            <div class="two-column">
                <div>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Campaign Summary</h2>
                            <span class="badge badge-success">Ready to Send</span>
                        </div>
                        
                        <div style="margin-bottom: 24px;">
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Recipients</h4>
                            <p style="font-size: 14px; color: var(--text-secondary);">156 contacts will receive this message</p>
                        </div>
                        
                        <div style="margin-bottom: 24px;">
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Message</h4>
                            <div class="message-bubble" style="background: #f8fafc; border: 1px solid var(--border-color);">
                                Hi {{name}}! Check out our latest updates for {{company}} at <a href="#" class="message-link">rbly.co/demo-2024</a>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 24px;">
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Tracked Links</h4>
                            <div class="link-item">
                                <div class="link-icon">🔗</div>
                                <div class="link-details">
                                    <div class="link-original">https://rebrandly.com/products/demo-2024</div>
                                    <div class="link-short">rbly.co/demo-2024</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="test-banner">
                            <div class="test-icon">!</div>
                            <div style="flex: 1;">
                                <strong>Test Mode Active</strong>
                                <p style="font-size: 12px; margin-top: 2px;">Send a test message to yourself before launching the full campaign</p>
                            </div>
                        </div>
                        
                        <div class="button-group">
                            <button class="btn btn-secondary" id="testSendBtn">Send Test</button>
                            <button class="btn btn-primary" id="sendCampaignBtn">Send Campaign</button>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="card">
                        <h2 class="card-title">Delivery Estimate</h2>
                        
                        <div class="stat-card">
                            <div class="stat-value info">~5 min</div>
                            <div class="stat-label">Estimated Delivery Time</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-value success">$23.40</div>
                            <div class="stat-label">Estimated Cost</div>
                        </div>
                        
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 16px;">
                            * Based on 156 recipients at $0.15 per message
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Campaign Settings</h3>
                        
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 14px; font-weight: 500; color: var(--text-primary);">
                                <input type="checkbox" checked style="margin-right: 8px;">
                                Track link clicks
                            </label>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 14px; font-weight: 500; color: var(--text-primary);">
                                <input type="checkbox" checked style="margin-right: 8px;">
                                Collect analytics
                            </label>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 14px; font-weight: 500; color: var(--text-primary);">
                                <input type="checkbox" style="margin-right: 8px;">
                                Schedule for later
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
