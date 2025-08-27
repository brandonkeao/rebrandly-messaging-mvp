/**
 * Modal System JavaScript
 * Handles modal creation, management, and interactions
 */

class ModalSystem {
    constructor() {
        this.activeModals = new Set();
        this.toastContainer = null;
        this.init();
    }

    init() {
        this.createToastContainer();
        this.bindEvents();
    }

    createToastContainer() {
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        }
    }

    bindEvents() {
        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target);
            }
        });

        // Close modal on close button click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                const modal = e.target.closest('.modal-overlay');
                if (modal) {
                    this.closeModal(modal);
                }
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModals.size > 0) {
                const lastModal = Array.from(this.activeModals).pop();
                this.closeModal(lastModal);
            }
        });
    }

    // Create and show a basic modal
    showModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            size = 'md',
            showClose = true,
            footer = null,
            onClose = null
        } = options;

        const modalId = `modal-${Date.now()}`;
        const modalHTML = `
            <div class="modal-overlay" id="${modalId}" role="dialog" aria-modal="true" aria-labelledby="${modalId}-title">
                <div class="modal modal-${size}">
                    <div class="modal-header">
                        <h2 class="modal-title" id="${modalId}-title">${title}</h2>
                        ${showClose ? '<button class="modal-close" aria-label="Close modal">&times;</button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalElement = document.getElementById(modalId);
        
        // Store close callback
        if (onClose) {
            modalElement._onClose = onClose;
        }

        this.openModal(modalElement);
        return modalElement;
    }

    // Show confirmation dialog
    showConfirmDialog(options = {}) {
        const {
            title = 'Confirm Action',
            message = 'Are you sure you want to proceed?',
            type = 'warning', // warning, danger, success, info
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            onConfirm = null,
            onCancel = null
        } = options;

        const iconMap = {
            warning: '⚠️',
            danger: '🗑️',
            success: '✅',
            info: 'ℹ️'
        };

        const confirmButtonClass = type === 'danger' ? 'btn-website-secondary' : 'btn-website-primary';

        const content = `
            <div class="dialog-confirm">
                <div class="dialog-icon ${type}">
                    ${iconMap[type]}
                </div>
                <h3 class="dialog-title">${title}</h3>
                <p class="dialog-message">${message}</p>
                <div class="dialog-actions">
                    <button class="btn-website-secondary dialog-cancel">${cancelText}</button>
                    <button class="${confirmButtonClass} dialog-confirm-btn">${confirmText}</button>
                </div>
            </div>
        `;

        const modal = this.showModal({
            title: '',
            content,
            size: 'sm',
            showClose: false
        });

        // Bind action buttons
        const confirmBtn = modal.querySelector('.dialog-confirm-btn');
        const cancelBtn = modal.querySelector('.dialog-cancel');

        confirmBtn.addEventListener('click', () => {
            if (onConfirm) onConfirm();
            this.closeModal(modal);
        });

        cancelBtn.addEventListener('click', () => {
            if (onCancel) onCancel();
            this.closeModal(modal);
        });

        return modal;
    }

    // Show form modal
    showFormModal(options = {}) {
        const {
            title = 'Form',
            fields = [],
            submitText = 'Submit',
            cancelText = 'Cancel',
            onSubmit = null,
            onCancel = null
        } = options;

        let formHTML = '<form class="modal-form">';
        
        fields.forEach(field => {
            const {
                type = 'text',
                name,
                label,
                placeholder = '',
                required = false,
                value = ''
            } = field;

            formHTML += `
                <div class="form-group">
                    <label class="form-label" for="${name}">${label}${required ? ' *' : ''}</label>
                    ${type === 'textarea' 
                        ? `<textarea class="form-textarea" id="${name}" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>`
                        : `<input type="${type}" class="form-input" id="${name}" name="${name}" placeholder="${placeholder}" value="${value}" ${required ? 'required' : ''}>`
                    }
                </div>
            `;
        });

        formHTML += '</form>';

        const footer = `
            <button type="button" class="btn-website-secondary form-cancel">${cancelText}</button>
            <button type="button" class="btn-website-primary form-submit">${submitText}</button>
        `;

        const modal = this.showModal({
            title,
            content: formHTML,
            footer,
            size: 'md'
        });

        const form = modal.querySelector('.modal-form');
        const submitBtn = modal.querySelector('.form-submit');
        const cancelBtn = modal.querySelector('.form-cancel');

        submitBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (form.checkValidity()) {
                if (onSubmit) onSubmit(data);
                this.closeModal(modal);
            } else {
                form.reportValidity();
            }
        });

        cancelBtn.addEventListener('click', () => {
            if (onCancel) onCancel();
            this.closeModal(modal);
        });

        return modal;
    }

    // Open modal with animations and focus management
    openModal(modalElement) {
        this.activeModals.add(modalElement);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Show modal
        modalElement.classList.add('active');
        
        // Focus management
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        // Trap focus within modal
        this.trapFocus(modalElement, focusableElements);
    }

    // Close modal with cleanup
    closeModal(modalElement) {
        if (!modalElement) return;

        modalElement.classList.remove('active');
        this.activeModals.delete(modalElement);

        // Call close callback if exists
        if (modalElement._onClose) {
            modalElement._onClose();
        }

        // Remove modal after animation
        setTimeout(() => {
            if (modalElement.parentNode) {
                modalElement.parentNode.removeChild(modalElement);
            }
        }, 300);

        // Restore body scroll if no more modals
        if (this.activeModals.size === 0) {
            document.body.style.overflow = '';
        }
    }

    // Focus trap implementation
    trapFocus(modal, focusableElements) {
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleTabKey);
        
        // Store reference to remove listener later
        modal._focusTrap = handleTabKey;
    }

    // Toast notification system
    showToast(options = {}) {
        const {
            title = '',
            message = '',
            type = 'info', // success, warning, error, info
            duration = 5000,
            closable = true
        } = options;

        const iconMap = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };

        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div class="toast ${type}" id="${toastId}">
                <div class="toast-icon">${iconMap[type]}</div>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
                ${closable ? '<button class="toast-close" aria-label="Close notification">&times;</button>' : ''}
            </div>
        `;

        this.toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);

        // Show toast with animation
        setTimeout(() => {
            toastElement.classList.add('show');
        }, 100);

        // Auto-remove toast
        if (duration > 0) {
            setTimeout(() => {
                this.removeToast(toastElement);
            }, duration);
        }

        // Close button handler
        if (closable) {
            const closeBtn = toastElement.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => {
                this.removeToast(toastElement);
            });
        }

        return toastElement;
    }

    // Remove toast with animation
    removeToast(toastElement) {
        if (!toastElement) return;

        toastElement.classList.remove('show');
        
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, 300);
    }

    // Utility methods for common dialogs
    confirm(message, title = 'Confirm') {
        return new Promise((resolve) => {
            this.showConfirmDialog({
                title,
                message,
                type: 'warning',
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
            });
        });
    }

    alert(message, title = 'Alert', type = 'info') {
        return new Promise((resolve) => {
            this.showConfirmDialog({
                title,
                message,
                type,
                confirmText: 'OK',
                cancelText: '',
                onConfirm: () => resolve(true)
            });
        });
    }

    // Close all modals
    closeAllModals() {
        this.activeModals.forEach(modal => {
            this.closeModal(modal);
        });
    }
}

// Initialize global modal system
window.ModalSystem = new ModalSystem();

// Convenience methods
window.showModal = (options) => window.ModalSystem.showModal(options);
window.showConfirmDialog = (options) => window.ModalSystem.showConfirmDialog(options);
window.showFormModal = (options) => window.ModalSystem.showFormModal(options);
window.showToast = (options) => window.ModalSystem.showToast(options);
window.confirm = (message, title) => window.ModalSystem.confirm(message, title);
window.alert = (message, title, type) => window.ModalSystem.alert(message, title, type);
