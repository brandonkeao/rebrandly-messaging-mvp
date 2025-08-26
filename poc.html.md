<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rebrandly Messaging MVP - Interactive Prototype</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f5f7fa;
            color: #2c3e50;
            line-height: 1.6;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }
        
        /* Left Sidebar Navigation */
        .sidebar {
            width: 240px;
            background: white;
            border-right: 1px solid #e1e8ed;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        
        .sidebar-header {
            padding: 24px 20px;
            border-bottom: 1px solid #e1e8ed;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .logo-text {
            font-weight: 600;
            font-size: 18px;
        }
        
        .logo-subtitle {
            font-size: 11px;
            color: #64748b;
            margin-top: 2px;
        }
        
        /* Navigation Menu */
        .nav-menu {
            padding: 16px 12px;
            flex: 1;
            overflow-y: auto;
        }
        
        .nav-section {
            margin-bottom: 24px;
        }
        
        .nav-section-title {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            color: #94a3b8;
            letter-spacing: 0.5px;
            padding: 0 8px;
            margin-bottom: 8px;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 8px;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 4px;
            text-decoration: none;
            font-size: 14px;
        }
        
        .nav-item:hover:not([style*="cursor: default"]) {
            background: #f8fafc;
            color: #2c3e50;
        }
        
        .nav-item.active {
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
            color: #667eea;
            font-weight: 500;
        }
        
        .nav-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav-badge {
            margin-left: auto;
            padding: 2px 8px;
            background: #667eea;
            color: white;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        
        /* Main Content Area */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        /* Top Header */
        .top-header {
            background: white;
            border-bottom: 1px solid #e1e8ed;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .header-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .header-actions {
            display: flex;
            gap: 12px;
        }
        
        /* Content Container */
        .content-container {
            flex: 1;
            overflow-y: auto;
            padding: 32px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        /* Progress Steps */
        .progress-container {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        
        .progress-steps {
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        
        .progress-line {
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: #e1e8ed;
            z-index: 0;
        }
        
        .progress-line-active {
            position: absolute;
            top: 20px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #667eea;
            z-index: 1;
            transition: width 0.3s ease;
        }
        
        .progress-line-active.step-2 {
            width: 33%;
        }
        
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 2;
            background: white;
            padding: 0 8px;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e1e8ed;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .step.active .step-number {
            background: #667eea;
            color: white;
        }
        
        .step.completed .step-number {
            background: #10b981;
            color: white;
        }
        
        .step-label {
            font-size: 14px;
            color: #64748b;
            text-align: center;
        }
        
        .step.active .step-label {
            color: #2c3e50;
            font-weight: 500;
        }
        
        /* View Container */
        .view {
            display: none;
        }
        
        .view.active {
            display: block;
        }
        
        /* Two Column Layout */
        .two-column {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
            margin-bottom: 24px;
        }
        
        .two-column.compose {
            grid-template-columns: 1fr 1fr;
        }
        
        /* Card */
        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .badge-info {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-warning {
            background: #fed7aa;
            color: #92400e;
        }
        
        /* Upload Area */
        .upload-area {
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 48px 32px;
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
            background: #fafbfc;
        }
        
        .upload-area:hover {
            border-color: #667eea;
            background: #f8faff;
        }
        
        .upload-area.has-file {
            border-color: #10b981;
            background: #f0fdf4;
            cursor: default;
        }
        
        .upload-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 16px;
            background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }
        
        .upload-area.has-file .upload-icon {
            background: linear-gradient(135deg, #10b98120 0%, #34d39920 100%);
        }
        
        /* Data Preview Table */
        .table-container {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 16px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background: #f8fafc;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #64748b;
            border-bottom: 1px solid #e2e8f0;
        }
        
        td {
            padding: 12px;
            font-size: 14px;
            border-bottom: 1px solid #f1f5f9;
        }
        
        /* Message Composer */
        .message-composer {
            margin-bottom: 20px;
        }
        
        .composer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .char-counter {
            font-size: 14px;
            color: #64748b;
        }
        
        .message-textarea {
            width: 100%;
            min-height: 120px;
            padding: 12px;
            border: 1px solid #e1e8ed;
            border-radius: 8px;
            font-size: 14px;
            resize: vertical;
            font-family: inherit;
        }
        
        .message-textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        /* Variable Pills */
        .variable-pills {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            flex-wrap: wrap;
        }
        
        .variable-pill {
            padding: 6px 12px;
            background: #f1f5f9;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        
        .variable-pill:hover {
            background: #e2e8f0;
            border-color: #667eea;
        }
        
        /* Link Manager */
        .link-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            margin-bottom: 8px;
        }
        
        .link-icon {
            width: 32px;
            height: 32px;
            background: #667eea;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .link-details {
            flex: 1;
        }
        
        .link-original {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 2px;
        }
        
        .link-short {
            font-weight: 500;
            color: #2c3e50;
        }
        
        /* Phone Preview */
        .phone-preview {
            background: #1a1a1a;
            border-radius: 24px;
            padding: 8px;
            max-width: 320px;
            margin: 0 auto;
        }
        
        .phone-screen {
            background: white;
            border-radius: 16px;
            padding: 16px;
            min-height: 500px;
        }
        
        .phone-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .contact-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
        }
        
        .message-bubble {
            background: #f1f5f9;
            padding: 12px 16px;
            border-radius: 16px;
            border-bottom-left-radius: 4px;
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .message-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        /* Test Mode Banner */
        .test-banner {
            background: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .test-icon {
            width: 20px;
            height: 20px;
            background: #f59e0b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }
        
        /* Buttons */
        .button-group {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }
        
        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            font-size: 14px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .btn-secondary {
            background: white;
            color: #64748b;
            border: 1px solid #e1e8ed;
        }
        
        .btn-secondary:hover {
            background: #f8fafc;
        }
        
        /* Sample Data */
        .sample-data {
            background: #f8fafc;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
        }
        
        .sample-format {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #64748b;
            line-height: 1.8;
        }
        
        /* Validation Summary */
        .stat-card {
            background: white;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin-bottom: 12px;
        }
        
        .stat-value {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        
        .stat-value.success {
            color: #10b981;
        }
        
        .stat-value.info {
            color: #667eea;
        }
        
        .stat-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <!-- Left Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <div class="logo-icon">R</div>
                <div>
                    <div class="logo-text">Rebrandly</div>
                    <div class="logo-subtitle">Messaging MVP</div>
                </div>
            </div>
        </div>
        
        <nav class="nav-menu">
            <div class="nav-section">
                <div class="nav-section-title">Main</div>
                <a class="nav-item active" onclick="showView('campaigns')">
                    <span class="nav-icon">📨</span>
                    <span>Campaigns</span>
                    <span class="nav-badge">3</span>
                </a>
                <a class="nav-item" onclick="showView('contacts'); return false;">
                    <span class="nav-icon">👥</span>
                    <span>Contacts</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Campaign Builder</div>
                <a class="nav-item" onclick="showView('import'); return false;">
                    <span class="nav-icon">📤</span>
                    <span>1. Import Contacts</span>
                </a>
                <a class="nav-item" onclick="showView('compose'); return false;">
                    <span class="nav-icon">✍️</span>
                    <span>2. Compose Message</span>
                </a>
                <a class="nav-item" style="cursor: default; opacity: 0.6;">
                    <span class="nav-icon">🔗</span>
                    <span>3. Add Links</span>
                </a>
                <a class="nav-item" style="cursor: default; opacity: 0.6;">
                    <span class="nav-icon">🚀</span>
                    <span>4. Review & Send</span>
                </a>
            </div>
        </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <!-- Top Header -->
        <header class="top-header">
            <h1 class="header-title" id="pageTitle">Import Contacts</h1>
            <div class="header-actions">
                <button class="btn btn-secondary">Save Draft</button>
                <button class="btn btn-primary">Continue →</button>
            </div>
        </header>
        
        <!-- Content Container -->
        <div class="content-container">
            <div class="container">
                <!-- Campaigns View -->
                <div class="view" id="campaignsView">
                    <div class="card">
                        <h2 class="card-title">Recent Campaigns</h2>
                        <p>Campaign list would appear here</p>
                    </div>
                </div>
                
                <!-- Contacts View -->
                <div class="view" id="contactsView">
                    <div class="card">
                        <h2 class="card-title">All Contacts</h2>
                        <p>Contact list would appear here</p>
                    </div>
                </div>
                
                <!-- Import Contacts View -->
                <div class="view active" id="importView">
                    <!-- Progress Steps for Campaign Builder -->
                    <div class="progress-container">
                        <div class="progress-steps">
                            <div class="progress-line"></div>
                            <div class="progress-line-active" id="progressLine"></div>
                            
                            <div class="step active" id="step1">
                                <div class="step-number">1</div>
                                <div class="step-label">Import Contacts</div>
                            </div>
                            
                            <div class="step" id="step2">
                                <div class="step-number">2</div>
                                <div class="step-label">Compose Message</div>
                            </div>
                            
                            <div class="step" id="step3">
                                <div class="step-number">3</div>
                                <div class="step-label">Add Links</div>
                            </div>
                            
                            <div class="step" id="step4">
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
                                
                                <div class="upload-area" onclick="simulateUpload()">
                                    <div class="upload-icon">📤</div>
                                    <h3 style="font-weight: 600; margin-bottom: 8px; color: #2c3e50;">Upload your contact list</h3>
                                    <p style="font-size: 14px; color: #64748b; margin-bottom: 16px;">Drag and drop your CSV file here, or click to browse</p>
                                    <button class="btn btn-primary">Choose File</button>
                                    <p style="font-size: 12px; color: #94a3b8; margin-top: 16px;">Maximum file size: 10MB • Supported format: CSV</p>
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
                                            <tbody>
                                                <tr>
                                                    <td>Maria Thomas</td>
                                                    <td>Acme Corp</td>
                                                    <td>maria@acme.com</td>
                                                    <td style="color: #10b981;">+1 (555) 123-4567</td>
                                                </tr>
                                                <tr>
                                                    <td>Brandon Keao</td>
                                                    <td>Tech Solutions</td>
                                                    <td>brandon@techsol.com</td>
                                                    <td style="color: #10b981;">+1 (555) 234-5678</td>
                                                </tr>
                                                <tr>
                                                    <td>Alison Charles</td>
                                                    <td>Marketing Inc</td>
                                                    <td>alison@marketing.com</td>
                                                    <td style="color: #10b981;">+1 (555) 345-6789</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
                                        <div class="stat-value info">156</div>
                                        <div class="stat-label">Total Contacts</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value success">148</div>
                                        <div class="stat-label">Valid Numbers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Compose Message View -->
                <div class="view" id="composeView">
                    <!-- Progress Steps for Campaign Builder -->
                    <div class="progress-container">
                        <div class="progress-steps">
                            <div class="progress-line"></div>
                            <div class="progress-line-active step-2" id="progressLine2"></div>
                            
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
                            
                            <div class="message-composer">
                                <div class="composer-header">
                                    <label style="font-weight: 500; font-size: 14px;">Message Content</label>
                                    <span class="char-counter">85/160 characters</span>
                                </div>
                                <textarea class="message-textarea" placeholder="Type your message here...">Hi {{name}}! Check out our latest updates for {{company}} at rbly.co/demo-2024</textarea>
                                
                                <div class="variable-pills">
                                    <div class="variable-pill">+ {{name}}</div>
                                    <div class="variable-pill">+ {{company}}</div>
                                    <div class="variable-pill">+ {{email}}</div>
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
                                
                                <button class="btn btn-secondary" style="width: 100%; margin-top: 12px;">+ Add Another Link</button>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h2 class="card-title" style="margin-bottom: 20px;">Preview</h2>
                            
                            <div class="phone-preview">
                                <div class="phone-screen">
                                    <div class="phone-header">
                                        <div class="contact-avatar">R</div>
                                        <div>
                                            <div style="font-weight: 500;">Rebrandly</div>
                                            <div style="font-size: 12px; color: #94a3b8;">SMS</div>
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
                </div>
            </div>
        </div>
    </main>
    
    <script>
        function showView(view) {
            // Hide all views
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            
            // Reset all nav items
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            
            // Reset all steps
            document.querySelectorAll('.step').forEach(step => step.classList.remove('active', 'completed'));
            
            if (view === 'campaigns') {
                document.getElementById('campaignsView').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Campaigns';
                document.getElementById('step1').classList.remove('active');
                document.querySelectorAll('.nav-item')[0].classList.add('active');
            } else if (view === 'contacts') {
                document.getElementById('contactsView').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Contacts';
                document.getElementById('step1').classList.remove('active');
                document.querySelectorAll('.nav-item')[1].classList.add('active');
            } else if (view === 'import') {
                document.getElementById('importView').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Import Contacts';
                document.getElementById('step1').classList.add('active');
                document.getElementById('progressLine').className = 'progress-line-active';
                document.querySelectorAll('.nav-item')[2].classList.add('active');
            } else if (view === 'compose') {
                document.getElementById('composeView').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Compose Message';
                document.getElementById('step1').classList.add('completed');
                document.getElementById('step2').classList.add('active');
                document.getElementById('progressLine').className = 'progress-line-active step-2';
                document.querySelectorAll('.nav-item')[3].classList.add('active');
            }
        }
        
        function simulateUpload() {
            const uploadArea = event.currentTarget;
            uploadArea.style.display = 'none';
            document.getElementById('uploadedContent').style.display = 'block';
            document.getElementById('uploadStats').style.display = 'block';
        }
    </script>
</body>
</html>