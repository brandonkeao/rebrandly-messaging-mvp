/**
 * Review & Send View JavaScript
 * Handles campaign review, send options, and campaign sending functionality
 */

class ReviewSendView {
    constructor() {
        this.campaignData = {
            contacts: [
                { id: 1, name: 'Sarah Johnson', company: 'TechCorp', phone: '+1 (555) 123-4567', valid: true },
                { id: 2, name: 'Mike Chen', company: 'StartupXYZ', phone: '+1 (555) 234-5678', valid: true },
                { id: 3, name: 'Brandon Keao', company: 'Tech Solutions', phone: '+1 (555) 345-6789', valid: true },
                { id: 4, name: 'Alison Charles', company: 'Marketing Inc', phone: '+1 (555) 456-7890', valid: true }
            ],
            links: [
                { id: 1, shortUrl: 'rbly.co/demo-2024', originalUrl: 'https://rebrandly.com/products/demo-2024' },
                { id: 2, shortUrl: 'rbly.co/pricing', originalUrl: 'https://rebrandly.com/pricing' }
            ],
            message: 'Hi {{name}}! 👋 Check out our new product demo at rbly.co/demo-2024 and see our pricing at rbly.co/pricing. Let me know what you think!',
            costPerMessage: 0.03
        };
        
        this.sendOptions = {
            type: 'immediate',
            scheduleDate: null,
            scheduleTime: null,
            testPhone: null
        };
        
        this.checklist = {
            messageReviewed: false,
            contactsVerified: false,
            complianceConfirmed: false,
            budgetApproved: false
        };
        
        this.init();
    }

    init() {
        this.updateSummaryCards();
        this.updateMessagePreview();
        this.updateContactList();
        this.bindEvents();
    }

    updateSummaryCards() {
        const contactCount = this.campaignData.contacts.length;
        const linkCount = this.campaignData.links.length;
        const messageLength = this.campaignData.message.length;
        const estimatedCost = (contactCount * this.campaignData.costPerMessage).toFixed(2);

        document.getElementById('contactCount').textContent = contactCount;
        document.getElementById('linkCount').textContent = linkCount;
        document.getElementById('messageLength').textContent = messageLength;
        document.getElementById('estimatedCost').textContent = `$${estimatedCost}`;

        // Update contact list stats
        const validContacts = this.campaignData.contacts.filter(c => c.valid).length;
        const invalidContacts = contactCount - validContacts;
        
        document.getElementById('totalContacts').textContent = contactCount;
        document.getElementById('validContacts').textContent = validContacts;
        document.getElementById('invalidContacts').textContent = invalidContacts;

        // Update variable count
        const variableCount = (this.campaignData.message.match(/\{\{.*?\}\}/g) || []).length;
        document.getElementById('variableCount').textContent = `${variableCount} personalization variable${variableCount !== 1 ? 's' : ''}`;
    }

    updateMessagePreview() {
        const previewMessage = this.campaignData.message.replace(/\{\{name\}\}/g, 'Sarah');
        document.getElementById('previewMessage').textContent = previewMessage;
    }

    updateContactList() {
        const container = document.getElementById('contactPreviewList');
        if (!container) return;

        // Container already has the contacts in the HTML template
        // In a real app, this would be dynamically populated
    }

    bindEvents() {
        // Send option radio buttons
        document.querySelectorAll('input[name="sendOption"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handleSendOptionChange(e.target.value);
            });
        });

        // Checklist items
        document.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateChecklist(e.target.id, e.target.checked);
            });
        });

        // Form inputs
        const scheduleDate = document.getElementById('scheduleDate');
        const scheduleTime = document.getElementById('scheduleTime');
        const testPhone = document.getElementById('testPhone');

        if (scheduleDate) {
            scheduleDate.addEventListener('change', (e) => {
                this.sendOptions.scheduleDate = e.target.value;
            });
        }

        if (scheduleTime) {
            scheduleTime.addEventListener('change', (e) => {
                this.sendOptions.scheduleTime = e.target.value;
            });
        }

        if (testPhone) {
            testPhone.addEventListener('input', (e) => {
                this.sendOptions.testPhone = e.target.value;
            });
        }
    }

    handleSendOptionChange(option) {
        this.sendOptions.type = option;
        
        // Show/hide relevant input sections
        const scheduleInputs = document.getElementById('scheduleInputs');
        const testInputs = document.getElementById('testInputs');
        
        if (scheduleInputs) {
            scheduleInputs.style.display = option === 'scheduled' ? 'block' : 'none';
        }
        
        if (testInputs) {
            testInputs.style.display = option === 'test' ? 'block' : 'none';
        }

        // Update button text and functionality
        this.updateSendButton();
    }

    updateSendButton() {
        const sendBtn = document.getElementById('finalSendBtn');
        const testBtn = document.getElementById('testBtn');
        
        if (!sendBtn || !testBtn) return;

        switch (this.sendOptions.type) {
            case 'immediate':
                sendBtn.innerHTML = '<span class="btn-icon-left">🚀</span>Send Campaign';
                testBtn.style.display = 'none';
                break;
            case 'scheduled':
                sendBtn.innerHTML = '<span class="btn-icon-left">⏰</span>Schedule Campaign';
                testBtn.style.display = 'none';
                break;
            case 'test':
                sendBtn.innerHTML = '<span class="btn-icon-left">🧪</span>Send Test';
                testBtn.style.display = 'inline-flex';
                break;
        }
    }

    updateChecklist(checkId, checked) {
        const checkMap = {
            'check1': 'messageReviewed',
            'check2': 'contactsVerified',
            'check3': 'complianceConfirmed',
            'check4': 'budgetApproved'
        };
        
        if (checkMap[checkId]) {
            this.checklist[checkMap[checkId]] = checked;
        }
        
        this.validateReadyToSend();
    }

    validateReadyToSend() {
        const allChecked = Object.values(this.checklist).every(checked => checked);
        const sendBtn = document.getElementById('finalSendBtn');
        
        if (sendBtn) {
            sendBtn.disabled = !allChecked;
            if (allChecked) {
                sendBtn.classList.remove('btn-disabled');
            } else {
                sendBtn.classList.add('btn-disabled');
            }
        }
    }

    async sendCampaign() {
        if (!this.validateSendOptions()) {
            return;
        }

        const sendBtn = document.getElementById('finalSendBtn');
        
        try {
            setButtonLoading(sendBtn, true);
            
            // Show sending progress
            await this.showSendingProgress();
            
            // Simulate API call
            await this.simulateSendOperation();
            
            // Show success
            this.showSendSuccess();
            
        } catch (error) {
            this.showSendError(error.message);
        } finally {
            setButtonLoading(sendBtn, false);
        }
    }

    validateSendOptions() {
        switch (this.sendOptions.type) {
            case 'scheduled':
                if (!this.sendOptions.scheduleDate || !this.sendOptions.scheduleTime) {
                    showToast({
                        title: 'Missing Schedule',
                        message: 'Please select a date and time for scheduling.',
                        type: 'warning'
                    });
                    return false;
                }
                break;
            case 'test':
                if (!this.sendOptions.testPhone) {
                    showToast({
                        title: 'Missing Phone Number',
                        message: 'Please enter your phone number for the test message.',
                        type: 'warning'
                    });
                    return false;
                }
                break;
        }
        
        const allChecked = Object.values(this.checklist).every(checked => checked);
        if (!allChecked) {
            showToast({
                title: 'Checklist Incomplete',
                message: 'Please complete all checklist items before sending.',
                type: 'warning'
            });
            return false;
        }
        
        return true;
    }

    async showSendingProgress() {
        return new Promise((resolve) => {
            showModal({
                title: 'Sending Campaign',
                content: `
                    <div style="text-align: center; padding: var(--space-lg);">
                        <div class="loading-spinner loading-spinner-lg" style="margin-bottom: var(--space-md);"></div>
                        <h3 style="margin-bottom: var(--space-sm);">Sending messages...</h3>
                        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                            Please wait while we send your campaign to ${this.campaignData.contacts.length} contacts.
                        </p>
                        <div id="sendProgress"></div>
                    </div>
                `,
                size: 'md',
                closable: false
            });

            // Simulate progress
            const progressContainer = document.getElementById('sendProgress');
            if (progressContainer) {
                const progress = createProgressBar(progressContainer, {
                    value: 0,
                    max: 100,
                    label: 'Sending Progress',
                    color: 'primary',
                    showPercentage: true
                });

                let value = 0;
                const interval = setInterval(() => {
                    value += Math.random() * 20;
                    if (value >= 100) {
                        value = 100;
                        clearInterval(interval);
                        setTimeout(resolve, 500);
                    }
                    progress.update(value);
                }, 300);
            } else {
                setTimeout(resolve, 2000);
            }
        });
    }

    async simulateSendOperation() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Randomly simulate success/failure for demo
        if (Math.random() < 0.1) { // 10% chance of failure
            throw new Error('Network error occurred while sending messages');
        }
    }

    showSendSuccess() {
        const successContent = `
            <div style="text-align: center; padding: var(--space-lg);">
                <div style="width: 80px; height: 80px; background: var(--color-success-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); font-size: 40px;">
                    ✅
                </div>
                <h2 style="color: var(--color-success-600); margin-bottom: var(--space-sm);">Campaign Sent Successfully!</h2>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                    Your message has been sent to ${this.campaignData.contacts.length} contacts.
                </p>
                <div style="background: var(--color-success-50); padding: var(--space-md); border-radius: var(--radius-base); margin-bottom: var(--space-lg);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                        <span>Messages Sent:</span>
                        <strong>${this.campaignData.contacts.length}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                        <span>Total Cost:</span>
                        <strong>$${(this.campaignData.contacts.length * this.campaignData.costPerMessage).toFixed(2)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Delivery Time:</span>
                        <strong>~2-5 minutes</strong>
                    </div>
                </div>
            </div>
        `;

        showModal({
            title: 'Campaign Sent',
            content: successContent,
            size: 'md',
            footer: `
                <button class="btn-website-secondary" onclick="viewCampaignAnalytics()">View Analytics</button>
                <button class="btn-website-primary" onclick="window.ModalSystem.closeModal(this.closest('.modal-overlay')); goToCampaigns();">View Campaigns</button>
            `
        });
    }

    showSendError(errorMessage) {
        showError('#reviewSendContainer', {
            type: 'general',
            title: 'Send Failed',
            message: errorMessage,
            actions: [
                { label: 'Try Again', type: 'primary', onClick: () => this.sendCampaign() },
                { label: 'Cancel', type: 'secondary', onClick: () => location.reload() }
            ]
        });
    }

    async sendTestMessage() {
        if (!this.sendOptions.testPhone) {
            showToast({
                title: 'Missing Phone Number',
                message: 'Please enter your phone number for the test message.',
                type: 'warning'
            });
            return;
        }

        const testBtn = document.getElementById('testBtn');
        
        try {
            setButtonLoading(testBtn, true);
            
            // Simulate test send
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showToast({
                title: 'Test Message Sent',
                message: `Test message sent to ${this.sendOptions.testPhone}`,
                type: 'success'
            });
            
        } catch (error) {
            showToast({
                title: 'Test Failed',
                message: 'Could not send test message. Please try again.',
                type: 'error'
            });
        } finally {
            setButtonLoading(testBtn, false);
        }
    }
}

// Global instance
let reviewSendView;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.review-send-container')) {
        reviewSendView = new ReviewSendView();
    }
});

// Global functions for UI interactions
function saveDraft() {
    showToast({
        title: 'Draft Saved',
        message: 'Your campaign has been saved as a draft.',
        type: 'success'
    });
}

function sendCampaign() {
    if (reviewSendView) {
        reviewSendView.sendCampaign();
    }
}

function confirmSend() {
    if (reviewSendView) {
        reviewSendView.sendCampaign();
    }
}

function sendTestMessage() {
    if (reviewSendView) {
        reviewSendView.sendTestMessage();
    }
}

function editContacts() {
    if (window.RebrandlyApp) {
        window.RebrandlyApp.navigateToView('select-contacts');
    }
}

function editLinks() {
    if (window.RebrandlyApp) {
        window.RebrandlyApp.navigateToView('select-links');
    }
}

function editMessage() {
    if (window.RebrandlyApp) {
        window.RebrandlyApp.navigateToView('compose');
    }
}

function viewPricing() {
    showModal({
        title: 'Pricing Details',
        content: `
            <div style="padding: var(--space-md);">
                <h3 style="margin-bottom: var(--space-md);">SMS Pricing Breakdown</h3>
                <div style="background: var(--color-neutral-50); padding: var(--space-md); border-radius: var(--radius-base); margin-bottom: var(--space-md);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                        <span>Cost per SMS:</span>
                        <strong>$0.03</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                        <span>Number of contacts:</span>
                        <strong>${reviewSendView ? reviewSendView.campaignData.contacts.length : 4}</strong>
                    </div>
                    <hr style="margin: var(--space-sm) 0;">
                    <div style="display: flex; justify-content: space-between;">
                        <span><strong>Total Cost:</strong></span>
                        <strong style="color: var(--color-primary-500);">$${reviewSendView ? (reviewSendView.campaignData.contacts.length * 0.03).toFixed(2) : '0.12'}</strong>
                    </div>
                </div>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    Pricing includes message delivery, link tracking, and analytics reporting.
                </p>
            </div>
        `,
        size: 'sm'
    });
}

function viewAllContacts() {
    showModal({
        title: 'All Selected Contacts',
        content: `
            <div style="padding: var(--space-md);">
                <p style="margin-bottom: var(--space-md); color: var(--color-text-secondary);">
                    ${reviewSendView ? reviewSendView.campaignData.contacts.length : 4} contacts selected for this campaign:
                </p>
                <div style="max-height: 300px; overflow-y: auto;">
                    ${reviewSendView ? reviewSendView.campaignData.contacts.map(contact => `
                        <div style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm); border-bottom: 1px solid var(--color-border-light);">
                            <div class="contact-avatar-small contact-avatar-primary">${contact.name.charAt(0)}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: 500;">${contact.name}</div>
                                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${contact.company} • ${contact.phone}</div>
                            </div>
                            <div class="contact-status valid">✓</div>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `,
        size: 'md'
    });
}

function goBack() {
    if (window.RebrandlyApp) {
        window.RebrandlyApp.navigateToView('compose');
    }
}

function viewCampaignAnalytics() {
    showToast({
        title: 'Analytics',
        message: 'Opening campaign analytics...',
        type: 'info'
    });
}

function goToCampaigns() {
    if (window.RebrandlyApp) {
        window.RebrandlyApp.navigateToView('campaigns');
    }
}
