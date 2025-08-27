/**
 * Navigation Manager
 * Handles view switching, progress steps, and navigation state
 */

class Navigation {
    static currentView = 'campaigns';
    static currentStep = 1;

    static showView(viewName) {
        console.log('Navigation.showView called with:', viewName);
        
        // Hide all views first
        const viewContainer = document.getElementById('viewContainer');
        if (!viewContainer) {
            console.error('View container not found');
            return;
        }

        // Load the appropriate view
        switch (viewName) {
            case 'getting-started':
                console.log('Loading getting started view');
                this.loadGettingStartedView();
                break;
            case 'links':
                console.log('Loading links view');
                this.loadLinksView();
                break;
            case 'campaigns':
                console.log('Loading campaigns view');
                this.loadCampaignsView();
                break;
            case 'contacts':
                console.log('Loading contacts view');
                this.loadContactsView();
                break;
            case 'select-contacts':
                this.loadSelectContactsView();
                this.currentStep = 1;
                break;
            case 'select-links':
                this.loadSelectLinksView();
                this.currentStep = 2;
                break;
            case 'compose':
                this.loadComposeView();
                this.currentStep = 3;
                break;
            case 'review':
                this.loadReviewView();
                this.currentStep = 4;
                break;
            // Settings views
            case 'link-management':
                this.loadLinkManagementView();
                this.currentStep = 0; // Settings don't have steps
                break;
            case 'sms-messaging':
                this.loadSmsMessagingView();
                this.currentStep = 0;
                break;
            case 'contact-list':
                this.loadContactListView();
                this.currentStep = 0;
                break;
            // Legacy support for old URLs
            case 'import':
                this.loadSelectContactsView();
                this.currentStep = 1;
                break;
            case 'campaign-links':
                this.loadSelectLinksView();
                this.currentStep = 2;
                break;
            case 'review':
                this.loadReviewView();
                this.currentStep = 4;
                break;
            default:
                this.loadGettingStartedView();
        }

        this.currentView = viewName;
    }

    static loadGettingStartedView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getGettingStartedView();
        this.bindGettingStartedEvents();
    }

    static loadLinksView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getLinksView();
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = 'Manage Links';
        }
        
        // Initialize links view after content is loaded
        setTimeout(() => {
            if (typeof LinksView !== 'undefined') {
                window.linksView = new LinksView();
            }
        }, 100);
    }

    static loadCampaignsView() {
        console.log('loadCampaignsView called');
        const viewContainer = document.getElementById('viewContainer');
        if (!viewContainer) {
            console.error('View container not found in loadCampaignsView');
            return;
        }
        
        try {
            const campaignsHTML = Views.getCampaignsView();
            console.log('Got campaigns HTML, length:', campaignsHTML.length);
            viewContainer.innerHTML = campaignsHTML;
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = 'Campaigns';
            }
            
            this.bindCampaignEvents();
            console.log('Campaigns view loaded successfully');
        } catch (error) {
            console.error('Error loading campaigns view:', error);
        }
    }

    static loadContactsView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getContactsView();
        this.bindContactEvents();
    }

    static loadMainLinksView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getMainLinksView();
        this.bindMainLinksEvents();
    }

    static loadSelectContactsView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getSelectContactsView();
        this.updateProgressSteps(1);
        this.bindSelectContactsEvents();
    }

    static loadSelectLinksView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getSelectLinksView();
        this.updateProgressSteps(2);
        this.bindSelectLinksEvents();
    }

    // Legacy method for backward compatibility
    static loadImportView() {
        this.loadSelectContactsView();
    }

    static loadComposeView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getComposeView();
        this.updateProgressSteps(3);
        this.bindComposeEvents();
    }

    static loadReviewView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getReviewView();
        this.updateProgressSteps(4);
        this.bindReviewEvents();
    }

    // Legacy method for backward compatibility
    static loadCampaignLinksView() {
        this.loadSelectLinksView();
    }

    static loadReviewView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getReviewView();
        this.updateProgressSteps(4);
        this.bindReviewEvents();
    }

    static updateProgressSteps(currentStep) {
        const progressContainer = document.querySelector('.progress-container');
        if (!progressContainer) return;

        const steps = progressContainer.querySelectorAll('.step');
        const progressLine = progressContainer.querySelector('.progress-line-active');

        // Reset all steps
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            const stepNumber = step.querySelector('.step-number');
            
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                stepNumber.textContent = '✓';
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                stepNumber.textContent = index + 1;
            } else {
                stepNumber.textContent = index + 1;
            }
        });

        // Update progress line
        if (progressLine) {
            progressLine.className = 'progress-line-active';
            if (currentStep > 1) {
                progressLine.classList.add(`step-${currentStep}`);
            }
        }
    }

    static bindCampaignEvents() {
        // Bind campaign-specific events
        const createCampaignBtn = document.getElementById('createCampaignBtn');
        if (createCampaignBtn) {
            createCampaignBtn.addEventListener('click', () => {
                window.RebrandlyApp.navigateToView('import');
            });
        }

        // Bind campaign item clicks
        document.querySelectorAll('.campaign-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const campaignId = item.getAttribute('data-campaign-id');
                this.openCampaign(campaignId);
            });
        });
    }

    static bindContactEvents() {
        // Bind contact-specific events
        const importContactsBtn = document.getElementById('importContactsBtn');
        if (importContactsBtn) {
            importContactsBtn.addEventListener('click', () => {
                window.RebrandlyApp.navigateToView('import');
            });
        }

        // Bind search functionality
        const searchInput = document.getElementById('contactSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterContacts(e.target.value);
            });
        }
    }

    static bindImportEvents() {
        // Bind file upload events
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = document.getElementById('csvFileInput');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            });
        }

        // Bind continue button
        const continueBtn = document.getElementById('continueToCompose');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (this.validateImportStep()) {
                    window.RebrandlyApp.navigateToView('compose');
                }
            });
        }
    }

    static bindSelectContactsEvents() {
        // Bind file upload events for new contact import
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = document.getElementById('csvFileInput');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            });
        }

        // Bind existing contacts selection
        document.querySelectorAll('.contact-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', this.updateSelectedContactsCount);
        });

        // Bind continue button
        const continueBtn = document.getElementById('continueToSelectLinks');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (this.validateContactSelection()) {
                    window.RebrandlyApp.navigateToView('select-links');
                }
            });
        }
    }

    static bindSelectLinksEvents() {
        // Bind existing links selection
        document.querySelectorAll('.link-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', this.updateSelectedLinksCount);
        });

        // Bind create new link button
        const createNewLinkBtn = document.getElementById('createNewLinkBtn');
        if (createNewLinkBtn) {
            createNewLinkBtn.addEventListener('click', () => {
                Components.showCreateLinkModal();
            });
        }

        // Bind continue button
        const continueBtn = document.getElementById('continueToCompose');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.RebrandlyApp.navigateToView('compose');
            });
        }
    }

    static bindComposeEvents() {
        // Bind message composition events
        const messageTextarea = document.getElementById('messageContent');
        const charCounter = document.getElementById('charCounter');

        if (messageTextarea && charCounter) {
            messageTextarea.addEventListener('input', () => {
                const length = messageTextarea.value.length;
                const maxLength = 160;
                charCounter.textContent = `${length}/${maxLength} characters`;
                
                // Update counter color based on length
                charCounter.className = 'char-counter';
                if (length > maxLength * 0.9) {
                    charCounter.classList.add('warning');
                }
                if (length > maxLength) {
                    charCounter.classList.add('error');
                }
            });
        }

        // Bind variable pill clicks
        document.querySelectorAll('.variable-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const variable = pill.textContent.trim();
                if (messageTextarea && variable.startsWith('{{')) {
                    const cursorPos = messageTextarea.selectionStart;
                    const textBefore = messageTextarea.value.substring(0, cursorPos);
                    const textAfter = messageTextarea.value.substring(cursorPos);
                    messageTextarea.value = textBefore + variable + textAfter;
                    messageTextarea.focus();
                    messageTextarea.setSelectionRange(cursorPos + variable.length, cursorPos + variable.length);
                    
                    // Trigger input event to update character counter
                    messageTextarea.dispatchEvent(new Event('input'));
                }
            });
        });

        // Bind preview updates
        if (messageTextarea) {
            messageTextarea.addEventListener('input', () => {
                this.updateMessagePreview();
            });
        }

        // Bind continue button
        const continueBtn = document.getElementById('continueToReview');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (this.validateComposeStep()) {
                    window.RebrandlyApp.navigateToView('review');
                }
            });
        }
    }

    static bindGettingStartedEvents() {
        // Getting Started events are handled by inline onclick handlers
        // No additional binding needed as buttons use window.RebrandlyApp.navigateToView()
        console.log('Getting Started view loaded');
    }

    static bindMainLinksEvents() {
        // Bind main links management events
        const createLinkBtn = document.getElementById('createLinkBtn');
        if (createLinkBtn) {
            createLinkBtn.addEventListener('click', () => {
                Components.showCreateLinkModal();
            });
        }

        // Bind link action buttons
        document.querySelectorAll('.link-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const linkId = e.target.closest('.link-item').getAttribute('data-link-id');
                Components.showEditLinkModal(linkId);
            });
        });

        document.querySelectorAll('.link-copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const shortUrl = e.target.closest('.link-item').querySelector('.link-short').textContent;
                Components.copyToClipboard(shortUrl);
            });
        });

        document.querySelectorAll('.link-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const linkId = e.target.closest('.link-item').getAttribute('data-link-id');
                this.deleteLink(linkId);
            });
        });

        // Bind search functionality
        const searchInput = document.getElementById('linkSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterLinks(e.target.value);
            });
        }
    }

    static bindCampaignLinksEvents() {
        // Bind campaign link management events
        const addLinkBtn = document.getElementById('addLinkBtn');
        if (addLinkBtn) {
            addLinkBtn.addEventListener('click', () => {
                Components.showAddLinkModal();
            });
        }

        // Bind continue button
        const continueBtn = document.getElementById('continueToReview');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.RebrandlyApp.navigateToView('review');
            });
        }
    }

    static bindReviewEvents() {
        // Bind review and send events
        const sendBtn = document.getElementById('sendCampaignBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendCampaign();
            });
        }

        const testSendBtn = document.getElementById('testSendBtn');
        if (testSendBtn) {
            testSendBtn.addEventListener('click', () => {
                this.sendTestMessage();
            });
        }
    }

    static validateImportStep() {
        const campaignData = window.RebrandlyApp.getCampaignData();
        if (!campaignData.contacts || campaignData.contacts.length === 0) {
            window.RebrandlyApp.showNotification('Please import contacts before continuing', 'error');
            return false;
        }
        return true;
    }

    static validateComposeStep() {
        const messageContent = document.getElementById('messageContent');
        if (!messageContent || !messageContent.value.trim()) {
            window.RebrandlyApp.showNotification('Please enter a message before continuing', 'error');
            return false;
        }
        
        if (messageContent.value.length > 160) {
            window.RebrandlyApp.showNotification('Message must be 160 characters or less', 'error');
            return false;
        }
        
        return true;
    }

    static updateMessagePreview() {
        const messageContent = document.getElementById('messageContent');
        const previewBubble = document.querySelector('.message-bubble');
        
        if (messageContent && previewBubble) {
            let message = messageContent.value;
            
            // Replace variables with sample data
            message = message.replace(/\{\{name\}\}/g, 'Maria');
            message = message.replace(/\{\{company\}\}/g, 'Acme Corp');
            message = message.replace(/\{\{email\}\}/g, 'maria@acme.com');
            
            // Convert URLs to links
            message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="#" class="message-link">$1</a>');
            message = message.replace(/(rbly\.co\/[^\s]+)/g, '<a href="#" class="message-link">$1</a>');
            
            previewBubble.innerHTML = message || 'Your message will appear here...';
        }
    }

    static filterContacts(searchTerm) {
        const contactRows = document.querySelectorAll('.contact-row');
        const term = searchTerm.toLowerCase();
        
        contactRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    static openCampaign(campaignId) {
        console.log('Opening campaign:', campaignId);
        // This would load campaign data and navigate to appropriate step
        window.RebrandlyApp.showNotification('Campaign opened', 'info');
    }

    static sendCampaign() {
        // Validate all steps before sending
        const campaignData = window.RebrandlyApp.getCampaignData();
        
        if (!campaignData.contacts || campaignData.contacts.length === 0) {
            window.RebrandlyApp.showNotification('No contacts to send to', 'error');
            return;
        }
        
        if (!campaignData.message) {
            window.RebrandlyApp.showNotification('No message content', 'error');
            return;
        }
        
        // Show confirmation dialog
        if (confirm(`Send campaign to ${campaignData.contacts.length} contacts?`)) {
            // This would send to backend
            console.log('Sending campaign:', campaignData);
            window.RebrandlyApp.showNotification('Campaign sent successfully!', 'success');
            
            // Navigate back to campaigns
            setTimeout(() => {
                window.RebrandlyApp.navigateToView('campaigns');
            }, 2000);
        }
    }

    static sendTestMessage() {
        const campaignData = window.RebrandlyApp.getCampaignData();
        
        if (!campaignData.message) {
            window.RebrandlyApp.showNotification('No message content', 'error');
            return;
        }
        
        // This would send test message to current user
        console.log('Sending test message:', campaignData.message);
        window.RebrandlyApp.showNotification('Test message sent to your phone', 'success');
    }

    static getCurrentView() {
        return this.currentView;
    }

    static updateSelectedContactsCount() {
        const selectedContacts = document.querySelectorAll('.contact-checkbox:checked');
        const countElement = document.getElementById('selectedContactsCount');
        if (countElement) {
            countElement.textContent = selectedContacts.length;
        }
        
        // Enable/disable continue button based on selection
        const continueBtn = document.getElementById('continueToSelectLinks');
        if (continueBtn) {
            continueBtn.disabled = selectedContacts.length === 0;
        }
    }

    static updateSelectedLinksCount() {
        const selectedLinks = document.querySelectorAll('.link-checkbox:checked');
        const countElement = document.getElementById('selectedLinksCount');
        if (countElement) {
            countElement.textContent = selectedLinks.length;
        }
    }

    static validateContactSelection() {
        const selectedContacts = document.querySelectorAll('.contact-checkbox:checked');
        if (selectedContacts.length === 0) {
            window.RebrandlyApp.showNotification('Please select at least one contact to continue', 'error');
            return false;
        }
        return true;
    }

    static getCurrentStep() {
        return this.currentStep;
    }

    static filterLinks(searchTerm) {
        const linkItems = document.querySelectorAll('.link-item');
        const term = searchTerm.toLowerCase();
        
        linkItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(term)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    static deleteLink(linkId) {
        Components.showConfirmDialog(
            'Are you sure you want to delete this link? This action cannot be undone.',
            () => {
                // Remove from UI
                const linkItem = document.querySelector(`[data-link-id="${linkId}"]`);
                if (linkItem) {
                    linkItem.remove();
                }
                
                // Remove from app data
                const appData = window.RebrandlyApp.getCampaignData();
                if (appData.links) {
                    appData.links = appData.links.filter(link => link.id !== linkId);
                    window.RebrandlyApp.updateCampaignData({ links: appData.links });
                }
                
                window.RebrandlyApp.showNotification('Link deleted successfully', 'success');
            }
        );
    }

    // Settings View Loaders
    static loadLinkManagementView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getLinkManagementView();
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = 'Link Management Settings';
        }
        
        this.updateProgressSteps(0); // No progress steps for settings
        this.bindLinkManagementEvents();
    }

    static loadSmsMessagingView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getSmsMessagingView();
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = 'SMS Messaging Settings';
        }
        
        this.updateProgressSteps(0);
        this.bindSmsMessagingEvents();
    }

    static loadContactListView() {
        const viewContainer = document.getElementById('viewContainer');
        viewContainer.innerHTML = Views.getContactListView();
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = 'Contact List Settings';
        }
        
        this.updateProgressSteps(0);
        this.bindContactListEvents();
    }

    // Settings Event Binding Methods
    static bindLinkManagementEvents() {
        // API Key visibility toggle
        window.toggleApiKeyVisibility = () => {
            const apiKeyInput = document.getElementById('apiKey');
            const toggleBtn = apiKeyInput.nextElementSibling;
            
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                toggleBtn.textContent = 'Hide';
            } else {
                apiKeyInput.type = 'password';
                toggleBtn.textContent = 'Show';
            }
        };

        // Connect Rebrandly account
        window.connectRebrandly = () => {
            const apiKey = document.getElementById('apiKey').value;
            if (!apiKey) {
                window.RebrandlyApp.showNotification('Please enter your API key', 'error');
                return;
            }
            
            // Simulate connection process
            window.RebrandlyApp.showNotification('Connecting to Rebrandly...', 'info');
            setTimeout(() => {
                const statusElement = document.querySelector('.connection-status');
                statusElement.className = 'connection-status connected';
                statusElement.innerHTML = '<span class="status-indicator"></span><span class="status-text">Connected</span>';
                window.RebrandlyApp.showNotification('Successfully connected to Rebrandly!', 'success');
            }, 2000);
        };

        // Test connection
        window.testConnection = () => {
            window.RebrandlyApp.showNotification('Testing connection...', 'info');
            setTimeout(() => {
                window.RebrandlyApp.showNotification('Connection test successful!', 'success');
            }, 1500);
        };

        // Sync now
        window.syncNow = () => {
            window.RebrandlyApp.showNotification('Syncing links...', 'info');
            setTimeout(() => {
                // Update metrics
                document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = '24';
                document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = '8';
                document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = '156';
                window.RebrandlyApp.showNotification('Links synced successfully!', 'success');
            }, 2000);
        };

        // Manage link categories
        window.manageLinkCategories = () => {
            window.RebrandlyApp.showNotification('Link categories management coming soon!', 'info');
        };

        // View link analytics
        window.viewLinkAnalytics = () => {
            window.RebrandlyApp.navigateToView('analytics-components-demo');
        };
    }

    static bindSmsMessagingEvents() {
        // Connect SMS provider
        window.connectProvider = (provider) => {
            window.RebrandlyApp.showNotification(`Connecting to ${provider}...`, 'info');
            
            // Simulate connection process
            setTimeout(() => {
                const statusElement = document.querySelector('.connection-status');
                statusElement.className = 'connection-status connected';
                statusElement.innerHTML = `<span class="status-indicator"></span><span class="status-text">Connected to ${provider}</span>`;
                
                // Update provider card
                const providerCard = document.querySelector(`[data-provider="${provider}"]`);
                providerCard.classList.add('connected');
                
                window.RebrandlyApp.showNotification(`Successfully connected to ${provider}!`, 'success');
            }, 2000);
        };
    }

    static bindContactListEvents() {
        // Add new integration
        window.addNewIntegration = () => {
            window.RebrandlyApp.showNotification('Integration marketplace coming soon!', 'info');
        };

        // Connect platform
        window.connectPlatform = (platform) => {
            window.RebrandlyApp.showNotification(`Connecting to ${platform}...`, 'info');
            
            setTimeout(() => {
                // Find the integration item and update its status
                const integrationItems = document.querySelectorAll('.integration-item');
                integrationItems.forEach(item => {
                    const name = item.querySelector('.integration-name').textContent.toLowerCase();
                    if (name.includes(platform.toLowerCase())) {
                        const statusElement = item.querySelector('.integration-status');
                        statusElement.className = 'integration-status connected';
                        statusElement.innerHTML = '<span class="status-indicator"></span><span class="status-text">Connected</span>';
                    }
                });
                
                window.RebrandlyApp.showNotification(`Successfully connected to ${platform}!`, 'success');
            }, 2000);
        };

        // Configure platform
        window.configurePlatform = (platform) => {
            window.RebrandlyApp.showNotification(`${platform} configuration panel coming soon!`, 'info');
        };

        // Save field mapping
        window.saveFieldMapping = () => {
            window.RebrandlyApp.showNotification('Field mapping saved successfully!', 'success');
        };

        // Test sync
        window.testSync = () => {
            window.RebrandlyApp.showNotification('Testing sync configuration...', 'info');
            setTimeout(() => {
                window.RebrandlyApp.showNotification('Sync test completed successfully!', 'success');
            }, 2000);
        };
    }
}
