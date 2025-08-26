/**
 * Rebrandly Messaging MVP - Main Application
 * Handles application initialization, state management, and core functionality
 */

class RebrandlyApp {
    constructor() {
        this.currentView = 'campaigns';
        this.currentStep = 1;
        this.campaignData = {
            contacts: [],
            message: '',
            links: [],
            settings: {}
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialView();
        console.log('Rebrandly Messaging MVP initialized');
    }

    bindEvents() {
        // Navigation events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item:not(.disabled)')) {
                e.preventDefault();
                const navItem = e.target.closest('.nav-item');
                const view = navItem.getAttribute('data-view');
                if (view) {
                    this.navigateToView(view);
                }
            }
        });

        // Form events
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });

        // File upload events
        document.addEventListener('change', (e) => {
            if (e.target.type === 'file') {
                this.handleFileUpload(e);
            }
        });

        // Auto-save functionality
        document.addEventListener('input', (e) => {
            if (e.target.matches('textarea, input[type="text"], input[type="email"]')) {
                this.debounce(() => this.autoSave(), 1000)();
            }
        });
    }

    navigateToView(viewName) {
        this.currentView = viewName;
        Navigation.showView(viewName);
        this.updateHeaderTitle(viewName);
        this.updateActiveNavigation(viewName);
        
        // Update URL without page reload (for future routing)
        if (history.pushState) {
            history.pushState({ view: viewName }, '', `#${viewName}`);
        }
    }

    updateHeaderTitle(viewName) {
        const titles = {
            campaigns: 'Campaigns',
            contacts: 'Contacts',
            links: 'Links',
            'select-contacts': 'Select Contacts',
            'select-links': 'Select Links',
            compose: 'Compose Message',
            review: 'Review & Send',
            // Legacy support
            import: 'Select Contacts',
            'campaign-links': 'Select Links'
        };
        
        const titleElement = document.getElementById('pageTitle');
        if (titleElement) {
            titleElement.textContent = titles[viewName] || 'Rebrandly Messaging';
        }
    }

    updateActiveNavigation(viewName) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current nav item
        const activeNavItem = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    loadInitialView() {
        // Check URL hash for initial view
        const hash = window.location.hash.substring(1);
        const initialView = hash || 'getting-started';
        this.navigateToView(initialView);
    }

    handleFormSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        
        // Handle different form types
        if (form.classList.contains('import-form')) {
            this.handleContactImport(data);
        } else if (form.classList.contains('compose-form')) {
            this.handleMessageCompose(data);
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        console.log('File selected:', file.name);
        
        // Validate file type
        if (!file.name.toLowerCase().endsWith('.csv')) {
            this.showNotification('Please select a CSV file', 'error');
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            this.showNotification('File size must be less than 10MB', 'error');
            return;
        }

        this.processCSVFile(file);
    }

    processCSVFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const contacts = this.parseCSV(csv);
                this.campaignData.contacts = contacts;
                
                // Update UI to show uploaded data
                Components.showUploadedData(contacts);
                this.showNotification(`Successfully imported ${contacts.length} contacts`, 'success');
                
            } catch (error) {
                console.error('Error processing CSV:', error);
                this.showNotification('Error processing CSV file', 'error');
            }
        };
        reader.readAsText(file);
    }

    parseCSV(csv) {
        const lines = csv.split('\n').filter(line => line.trim());
        if (lines.length < 2) {
            throw new Error('CSV must have at least a header and one data row');
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const contacts = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length >= headers.length) {
                const contact = {};
                headers.forEach((header, index) => {
                    contact[header] = values[index] || '';
                });
                
                // Validate required fields
                if (contact.name && contact.phone) {
                    contacts.push(contact);
                }
            }
        }

        return contacts;
    }

    handleContactImport(data) {
        console.log('Processing contact import:', data);
        // This would typically send data to backend
        this.showNotification('Contacts imported successfully', 'success');
    }

    handleMessageCompose(data) {
        console.log('Processing message composition:', data);
        this.campaignData.message = data.message;
        // This would typically save to backend
        this.showNotification('Message saved as draft', 'success');
    }

    autoSave() {
        // Auto-save current form data
        const activeForm = document.querySelector('.view.active form');
        if (activeForm) {
            const formData = new FormData(activeForm);
            const data = Object.fromEntries(formData.entries());
            
            // Save to localStorage as backup
            localStorage.setItem('rebrandly_draft', JSON.stringify({
                view: this.currentView,
                data: data,
                timestamp: Date.now()
            }));
            
            console.log('Auto-saved draft');
        }
    }

    loadDraft() {
        try {
            const draft = localStorage.getItem('rebrandly_draft');
            if (draft) {
                const parsed = JSON.parse(draft);
                // Check if draft is less than 24 hours old
                if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error('Error loading draft:', error);
        }
        return null;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);

        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    getCampaignData() {
        return this.campaignData;
    }

    updateCampaignData(data) {
        this.campaignData = { ...this.campaignData, ...data };
    }

    getCurrentView() {
        return this.currentView;
    }

    getCurrentStep() {
        return this.currentStep;
    }

    setCurrentStep(step) {
        this.currentStep = step;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.RebrandlyApp = new RebrandlyApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view) {
        window.RebrandlyApp.navigateToView(e.state.view);
    }
});
