// Review & Send View v2 - Enhanced Components

class ReviewSendManager {
    constructor() {
        this.campaign = this.loadCampaignData();
        this.sendOption = 'now';
        this.scheduledDate = null;
        this.scheduledTime = null;
        this.init();
    }

    init() {
        this.renderCampaignPreview();
        this.renderContactsList();
        this.updateCostEstimate();
        this.attachEventListeners();
    }

    loadCampaignData() {
        // Load from localStorage or return sample data
        const saved = localStorage.getItem('rebrandly_campaign_draft');
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            message: "🎉 Exciting news! Our new product is launching soon. Get 20% off with code LAUNCH20. Check it out: https://rebrand.ly/launch2025",
            contacts: [
                { id: '1', name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
                { id: '2', name: 'Jane Smith', phone: '+1234567891', email: 'jane@example.com' },
                { id: '3', name: 'Bob Johnson', phone: '+1234567892', email: 'bob@example.com' },
                { id: '4', name: 'Alice Brown', phone: '+1234567893', email: 'alice@example.com' },
                { id: '5', name: 'Charlie Wilson', phone: '+1234567894', email: 'charlie@example.com' }
            ],
            links: [
                { title: 'Product Launch', url: 'https://rebrand.ly/launch2025' }
            ],
            created: new Date().toISOString()
        };
    }

    renderCampaignPreview() {
        const messageContainer = document.getElementById('messagePreview');
        const message = this.campaign.message;
        const charCount = message.length;
        const maxChars = 160;
        
        // Update character count
        const charCountEl = document.getElementById('characterCount');
        charCountEl.textContent = `${charCount}/${maxChars} characters`;
        charCountEl.className = 'character-count';
        
        if (charCount > maxChars * 0.9) {
            charCountEl.classList.add('warning');
        }
        if (charCount > maxChars) {
            charCountEl.classList.add('error');
        }

        // Render phone mockup
        messageContainer.innerHTML = `
            <div class="phone-mockup">
                <div class="phone-screen">
                    <div class="message-bubble">
                        ${this.formatMessageWithLinks(message)}
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
            </div>
        `;

        // Update campaign summary
        this.updateCampaignSummary();
    }

    formatMessageWithLinks(message) {
        // Replace URLs with clickable links in preview
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return message.replace(urlRegex, '<span style="color: #60a5fa; text-decoration: underline;">$1</span>');
    }

    updateCampaignSummary() {
        const summaryContainer = document.getElementById('campaignSummary');
        const message = this.campaign.message;
        const segments = Math.ceil(message.length / 160);
        
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Recipients</span>
                <span class="summary-value highlight">${this.campaign.contacts.length}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Message Length</span>
                <span class="summary-value">${message.length} characters</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">SMS Segments</span>
                <span class="summary-value">${segments}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Links Included</span>
                <span class="summary-value">${this.campaign.links.length}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Estimated Delivery</span>
                <span class="summary-value">~2 minutes</span>
            </div>
        `;
    }

    renderContactsList() {
        const contactsContainer = document.getElementById('contactsList');
        const contacts = this.campaign.contacts;
        
        document.getElementById('contactsCount').textContent = `${contacts.length} recipients`;
        
        contactsContainer.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-avatar">
                    ${contact.name.charAt(0).toUpperCase()}
                </div>
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-phone">${contact.phone}</div>
                </div>
            </div>
        `).join('');
    }

    attachEventListeners() {
        // Send option selection
        document.addEventListener('change', (e) => {
            if (e.target.name === 'sendOption') {
                this.sendOption = e.target.value;
                this.toggleScheduleOptions();
                this.updateCostEstimate();
            }
        });

        // Schedule date/time changes
        document.addEventListener('change', (e) => {
            if (e.target.id === 'scheduleDate') {
                this.scheduledDate = e.target.value;
            }
            if (e.target.id === 'scheduleTime') {
                this.scheduledTime = e.target.value;
            }
            this.validateSchedule();
        });

        // Send button
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendCampaign());
        }
    }

    toggleScheduleOptions() {
        const scheduleOptions = document.getElementById('scheduleOptions');
        if (this.sendOption === 'schedule') {
            scheduleOptions.style.display = 'block';
            this.setMinDateTime();
        } else {
            scheduleOptions.style.display = 'none';
        }
    }

    setMinDateTime() {
        const now = new Date();
        const dateInput = document.getElementById('scheduleDate');
        const timeInput = document.getElementById('scheduleTime');
        
        // Set minimum date to today
        dateInput.min = now.toISOString().split('T')[0];
        
        // If today is selected, set minimum time to current time + 1 hour
        if (dateInput.value === now.toISOString().split('T')[0]) {
            const minTime = new Date(now.getTime() + 60 * 60 * 1000);
            timeInput.min = minTime.toTimeString().slice(0, 5);
        } else {
            timeInput.min = '';
        }
    }

    validateSchedule() {
        const sendButton = document.getElementById('sendButton');
        
        if (this.sendOption === 'schedule') {
            const isValid = this.scheduledDate && this.scheduledTime;
            sendButton.disabled = !isValid;
            
            if (isValid) {
                const scheduledDateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);
                const now = new Date();
                
                if (scheduledDateTime <= now) {
                    sendButton.disabled = true;
                    showToast('Scheduled time must be in the future', 'warning');
                }
            }
        } else {
            sendButton.disabled = false;
        }
    }

    updateCostEstimate() {
        const contacts = this.campaign.contacts.length;
        const segments = Math.ceil(this.campaign.message.length / 160);
        const costPerSMS = 0.05; // $0.05 per SMS
        const totalSMS = contacts * segments;
        const totalCost = totalSMS * costPerSMS;
        
        const costContainer = document.getElementById('costEstimate');
        costContainer.innerHTML = `
            <div class="cost-breakdown">
                <span class="cost-label">${contacts} recipients × ${segments} segment${segments > 1 ? 's' : ''}</span>
                <span class="cost-value">${totalSMS} SMS</span>
            </div>
            <div class="cost-breakdown">
                <span class="cost-label">Rate per SMS</span>
                <span class="cost-value">$${costPerSMS.toFixed(3)}</span>
            </div>
            <div class="cost-breakdown total-cost">
                <span class="cost-label">Total Cost</span>
                <span class="cost-value">$${totalCost.toFixed(2)}</span>
            </div>
        `;
    }

    async sendCampaign() {
        const sendButton = document.getElementById('sendButton');
        const progressContainer = document.getElementById('sendProgress');
        
        // Confirm send
        const confirmMessage = this.sendOption === 'schedule' 
            ? `Schedule campaign for ${this.scheduledDate} at ${this.scheduledTime}?`
            : `Send campaign to ${this.campaign.contacts.length} recipients now?`;
            
        confirmAction({
            title: 'Confirm Send',
            message: confirmMessage,
            type: 'success',
            confirmText: this.sendOption === 'schedule' ? 'Schedule' : 'Send Now',
            onConfirm: () => this.executeSend()
        });
    }

    async executeSend() {
        const sendButton = document.getElementById('sendButton');
        const progressContainer = document.getElementById('sendProgress');
        
        try {
            // Show progress
            sendButton.style.display = 'none';
            progressContainer.classList.add('show');
            
            // Simulate sending process
            await this.simulateSending();
            
            // Show success
            this.showSendSuccess();
            
        } catch (error) {
            showToast('Failed to send campaign. Please try again.', 'error');
            sendButton.style.display = 'block';
            progressContainer.classList.remove('show');
        }
    }

    async simulateSending() {
        const progressBar = document.getElementById('sendProgressBar');
        const sentCount = document.getElementById('sentCount');
        const deliveredCount = document.getElementById('deliveredCount');
        const failedCount = document.getElementById('failedCount');
        
        const totalContacts = this.campaign.contacts.length;
        let sent = 0;
        let delivered = 0;
        let failed = 0;
        
        for (let i = 0; i < totalContacts; i++) {
            // Simulate sending delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            sent++;
            sentCount.textContent = sent;
            
            // Update progress bar
            const progress = (sent / totalContacts) * 100;
            loadingManager.updateProgress(progressBar, progress);
            
            // Simulate delivery (90% success rate)
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    delivered++;
                    deliveredCount.textContent = delivered;
                } else {
                    failed++;
                    failedCount.textContent = failed;
                }
            }, Math.random() * 1000 + 500);
        }
        
        // Wait for all deliveries to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        loadingManager.updateProgress(progressBar, 100, 'success');
    }

    showSendSuccess() {
        const container = document.querySelector('.review-container');
        const delivered = document.getElementById('deliveredCount').textContent;
        const failed = document.getElementById('failedCount').textContent;
        
        container.innerHTML = `
            <div class="send-success">
                <div class="success-icon">✅</div>
                <h3 class="success-title">Campaign Sent Successfully!</h3>
                <p class="success-message">
                    Your message has been sent to ${this.campaign.contacts.length} recipients.
                    <br>
                    ${delivered} delivered, ${failed} failed
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button class="btn btn-primary" onclick="window.location.reload()">Send Another</button>
                    <button class="btn btn-secondary" onclick="this.viewAnalytics()">View Analytics</button>
                </div>
            </div>
        `;
        
        // Clear draft from storage
        localStorage.removeItem('rebrandly_campaign_draft');
        
        showToast('Campaign sent successfully!', 'success');
    }

    viewAnalytics() {
        showToast('Analytics feature coming soon!', 'info');
    }

    editMessage() {
        confirmAction({
            title: 'Edit Message',
            message: 'This will take you back to the message editor. Continue?',
            onConfirm: () => {
                showToast('Returning to message editor...', 'info');
                // In real app, navigate back to message editor
            }
        });
    }

    editContacts() {
        confirmAction({
            title: 'Edit Recipients',
            message: 'This will take you back to contact selection. Continue?',
            onConfirm: () => {
                showToast('Returning to contact selection...', 'info');
                // In real app, navigate back to contact selector
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reviewSendManager = new ReviewSendManager();
});
