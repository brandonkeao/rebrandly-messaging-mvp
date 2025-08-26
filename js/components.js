/**
 * Components Manager
 * Handles reusable UI components and their interactions
 */

class Components {
    static showUploadedData(contacts) {
        const uploadArea = document.getElementById('uploadArea');
        const uploadedContent = document.getElementById('uploadedContent');
        const uploadStats = document.getElementById('uploadStats');
        const continueBtn = document.getElementById('continueToCompose');
        
        if (uploadArea) {
            uploadArea.style.display = 'none';
        }
        
        if (uploadedContent) {
            uploadedContent.style.display = 'block';
            this.populateContactsTable(contacts);
        }
        
        if (uploadStats) {
            uploadStats.style.display = 'block';
            this.updateUploadStats(contacts);
        }
        
        if (continueBtn) {
            continueBtn.disabled = false;
        }
    }

    static populateContactsTable(contacts) {
        const tbody = document.getElementById('contactsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        // Show first 5 contacts as preview
        const previewContacts = contacts.slice(0, 5);
        
        previewContacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name || 'N/A'}</td>
                <td>${contact.company || 'N/A'}</td>
                <td>${contact.email || 'N/A'}</td>
                <td style="color: var(--success-color);">${contact.phone || 'N/A'}</td>
            `;
            tbody.appendChild(row);
        });
        
        // Add "and X more" row if there are more contacts
        if (contacts.length > 5) {
            const moreRow = document.createElement('tr');
            moreRow.innerHTML = `
                <td colspan="4" style="text-align: center; color: var(--text-secondary); font-style: italic;">
                    ... and ${contacts.length - 5} more contacts
                </td>
            `;
            tbody.appendChild(moreRow);
        }
    }

    static updateUploadStats(contacts) {
        const totalElement = document.getElementById('totalContacts');
        const validElement = document.getElementById('validContacts');
        
        if (totalElement) {
            totalElement.textContent = contacts.length;
        }
        
        if (validElement) {
            // Count contacts with valid phone numbers (basic validation)
            const validContacts = contacts.filter(contact => 
                contact.phone && contact.phone.match(/^\+?[\d\s\-\(\)]+$/)
            );
            validElement.textContent = validContacts.length;
        }
    }

    static showAddLinkModal() {
        const modal = this.createModal('Add New Link', `
            <form id="addLinkForm">
                <div class="form-group">
                    <label class="form-label">Original URL</label>
                    <input type="url" class="form-input" name="originalUrl" placeholder="https://example.com" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Custom Short Link (optional)</label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: var(--text-secondary);">rbly.co/</span>
                        <input type="text" class="form-input" name="customSlug" placeholder="my-link" style="flex: 1;">
                    </div>
                </div>
                
                <div class="button-group right">
                    <button type="button" class="btn btn-secondary" onclick="Components.closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Link</button>
                </div>
            </form>
        `);

        // Handle form submission
        const form = modal.querySelector('#addLinkForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Creating link:', data);
            window.RebrandlyApp.showNotification('Link created successfully', 'success');
            this.closeModal();
        });
    }

    static createModal(title, content) {
        // Remove existing modal if any
        this.closeModal();

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="Components.closeModal()">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', this.handleModalKeydown);

        return modalOverlay.querySelector('.modal');
    }

    static closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', this.handleModalKeydown);
        }
    }

    static handleModalKeydown(e) {
        if (e.key === 'Escape') {
            Components.closeModal();
        }
    }

    static showConfirmDialog(message, onConfirm, onCancel) {
        const modal = this.createModal('Confirm Action', `
            <p style="margin-bottom: 24px; color: var(--text-primary);">${message}</p>
            <div class="button-group right">
                <button type="button" class="btn btn-secondary" onclick="Components.closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmBtn">Confirm</button>
            </div>
        `);

        const confirmBtn = modal.querySelector('#confirmBtn');
        confirmBtn.addEventListener('click', () => {
            if (onConfirm) onConfirm();
            this.closeModal();
        });

        return modal;
    }

    static showLoadingSpinner(container, message = 'Loading...') {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (container) {
            container.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <span>${message}</span>
                </div>
            `;
        }
    }

    static hideLoadingSpinner(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (container) {
            const loading = container.querySelector('.loading');
            if (loading) {
                container.removeChild(loading);
            }
        }
    }

    static showEmptyState(container, icon, title, description, actionText, actionCallback) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (container) {
            const actionButton = actionText && actionCallback ? 
                `<button class="btn btn-primary" onclick="(${actionCallback})()">${actionText}</button>` : '';
            
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${icon}</div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    ${actionButton}
                </div>
            `;
        }
    }

    static createTooltip(element, text, position = 'top') {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        
        if (!element) return;

        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip-${position}`;
        tooltip.textContent = text;
        
        element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top - tooltipRect.height - 8;
            
            if (position === 'bottom') {
                top = rect.bottom + 8;
            } else if (position === 'left') {
                left = rect.left - tooltipRect.width - 8;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            } else if (position === 'right') {
                left = rect.right + 8;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            }
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip.parentNode) {
                document.body.removeChild(tooltip);
            }
        });
    }

    static formatPhoneNumber(phone) {
        // Basic phone number formatting for US numbers
        const cleaned = phone.replace(/\D/g, '');
        
        if (cleaned.length === 10) {
            return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }
        
        return phone; // Return original if can't format
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhoneNumber(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    static truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                window.RebrandlyApp.showNotification('Copied to clipboard', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    static fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            window.RebrandlyApp.showNotification('Copied to clipboard', 'success');
        } catch (err) {
            window.RebrandlyApp.showNotification('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Add modal styles to the page
document.addEventListener('DOMContentLoaded', () => {
    const modalStyles = `
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal {
                background: var(--card-background);
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .modal-header {
                padding: 20px 24px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .modal-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: var(--text-primary);
            }
            
            .modal-content {
                padding: 24px;
            }
            
            .tooltip {
                position: absolute;
                background: #1a1a1a;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1001;
                pointer-events: none;
            }
            
            .tooltip::after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border: 4px solid transparent;
            }
            
            .tooltip-top::after {
                top: 100%;
                left: 50%;
                margin-left: -4px;
                border-top-color: #1a1a1a;
            }
            
            .tooltip-bottom::after {
                bottom: 100%;
                left: 50%;
                margin-left: -4px;
                border-bottom-color: #1a1a1a;
            }
            
            .tooltip-left::after {
                top: 50%;
                left: 100%;
                margin-top: -4px;
                border-left-color: #1a1a1a;
            }
            
            .tooltip-right::after {
                top: 50%;
                right: 100%;
                margin-top: -4px;
                border-right-color: #1a1a1a;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-background);
                border-radius: 8px;
                padding: 16px 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 1002;
                min-width: 300px;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-success {
                border-left-color: var(--success-color);
            }
            
            .notification-warning {
                border-left-color: var(--warning-color);
            }
            
            .notification-error {
                border-left-color: var(--error-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                color: var(--text-secondary);
                cursor: pointer;
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
});
