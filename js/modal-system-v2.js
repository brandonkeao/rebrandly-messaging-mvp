// Modal System v2 - Enhanced Components

class ModalSystem {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });
    }

    // Create and show modal
    showModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            size = 'medium',
            showClose = true,
            buttons = [],
            onClose = null
        } = options;

        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay active">
                <div class="modal ${size}">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        ${showClose ? '<button class="modal-close" onclick="modalSystem.closeModal()">&times;</button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${buttons.length > 0 ? `
                        <div class="modal-footer">
                            ${buttons.map(btn => `
                                <button class="btn ${btn.class || 'btn-secondary'}" 
                                        onclick="${btn.onclick || 'modalSystem.closeModal()'}">
                                    ${btn.text}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Add to DOM
        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHTML;
        document.body.appendChild(modalElement.firstElementChild);

        this.activeModal = document.querySelector('.modal-overlay.active');
        this.onClose = onClose;

        // Focus management
        this.activeModal.querySelector('.modal-close')?.focus();
    }

    // Close active modal
    closeModal() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            setTimeout(() => {
                this.activeModal.remove();
                this.activeModal = null;
                if (this.onClose) this.onClose();
            }, 300);
        }
    }

    // Confirmation dialog
    confirm(options = {}) {
        const {
            title = 'Confirm Action',
            message = 'Are you sure?',
            type = 'warning',
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            onConfirm = () => {},
            onCancel = () => {}
        } = options;

        const iconMap = {
            warning: '⚠️',
            danger: '🗑️',
            success: '✅'
        };

        this.showModal({
            title,
            size: 'small',
            content: `
                <div class="confirmation-dialog">
                    <div class="confirmation-icon ${type}">
                        ${iconMap[type] || '❓'}
                    </div>
                    <p style="margin: 0; color: #374151; font-size: 1rem;">${message}</p>
                </div>
            `,
            buttons: [
                {
                    text: cancelText,
                    class: 'btn-secondary',
                    onclick: 'modalSystem.closeModal(); modalSystem.onCancel && modalSystem.onCancel();'
                },
                {
                    text: confirmText,
                    class: type === 'danger' ? 'btn-danger' : 'btn-primary',
                    onclick: 'modalSystem.closeModal(); modalSystem.onConfirm && modalSystem.onConfirm();'
                }
            ],
            onClose: onCancel
        });

        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
    }

    // Toast notifications
    showToast(message, type = 'info', duration = 4000) {
        // Create toast container if it doesn't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer; margin-left: auto;">&times;</button>
        `;

        container.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Initialize modal system
const modalSystem = new ModalSystem();

// Utility functions for easy access
window.showModal = (options) => modalSystem.showModal(options);
window.closeModal = () => modalSystem.closeModal();
window.confirmAction = (options) => modalSystem.confirm(options);
window.showToast = (message, type, duration) => modalSystem.showToast(message, type, duration);
