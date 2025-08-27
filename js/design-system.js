/**
 * Design System JavaScript - Enhanced Interactions
 * Handles design system specific interactions and behaviors
 */

class DesignSystem {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileNavigation();
        this.initAccessibility();
        this.initProgressSteps();
        this.initFormEnhancements();
        this.initButtonStates();
        console.log('Design System initialized');
    }

    /**
     * Initialize mobile navigation functionality
     */
    initMobileNavigation() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        const navItems = document.querySelectorAll('.nav-item');

        if (!hamburgerMenu || !sidebar || !sidebarOverlay) return;

        // Toggle mobile menu
        hamburgerMenu.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('open');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });

        // Close menu when clicking overlay
        sidebarOverlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close menu when clicking nav item on mobile
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    this.closeMobileMenu();
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767 && sidebar.classList.contains('open')) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');

        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first nav item
        const firstNavItem = sidebar.querySelector('.nav-item');
        if (firstNavItem) {
            firstNavItem.focus();
        }
    }

    closeMobileMenu() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');

        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to hamburger menu
        hamburgerMenu.focus();
    }

    /**
     * Initialize accessibility enhancements
     */
    initAccessibility() {
        // Add keyboard navigation for nav items
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            // Handle Enter and Space key presses
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Add focus-visible polyfill behavior
        this.initFocusVisible();

        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    /**
     * Initialize focus-visible behavior
     */
    initFocusVisible() {
        let hadKeyboardEvent = true;
        const keyboardThrottleTimeout = 100;

        const pointerEvents = ['mousedown', 'pointerdown', 'touchstart'];
        const keyboardEvents = ['keydown'];

        function onPointerDown() {
            hadKeyboardEvent = false;
        }

        function onKeyDown(e) {
            if (e.metaKey || e.altKey || e.ctrlKey) {
                return;
            }
            hadKeyboardEvent = true;
        }

        function onFocus(e) {
            if (hadKeyboardEvent || e.target.matches(':focus-visible')) {
                e.target.classList.add('focus-visible');
            }
        }

        function onBlur(e) {
            e.target.classList.remove('focus-visible');
        }

        pointerEvents.forEach(event => {
            document.addEventListener(event, onPointerDown, true);
        });

        keyboardEvents.forEach(event => {
            document.addEventListener(event, onKeyDown, true);
        });

        document.addEventListener('focus', onFocus, true);
        document.addEventListener('blur', onBlur, true);
    }

    /**
     * Initialize progress steps functionality
     */
    initProgressSteps() {
        this.updateProgressSteps();
    }

    updateProgressSteps(currentStep = 1, totalSteps = 4) {
        const progressNav = document.getElementById('progressNav');
        const progressLineActive = document.querySelector('.progress-line-active');
        const steps = document.querySelectorAll('.progress-step');

        if (!progressNav || !progressLineActive || !steps.length) return;

        // Calculate progress percentage
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLineActive.style.width = `${progressPercentage}%`;

        // Update step states
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            const indicator = step.querySelector('.step-indicator');
            
            step.classList.remove('active', 'completed');
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
                indicator.classList.add('completed');
                indicator.textContent = '';
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
                indicator.classList.add('active');
                indicator.textContent = stepNumber;
            } else {
                indicator.textContent = stepNumber;
            }
        });
    }

    /**
     * Initialize form enhancements
     */
    initFormEnhancements() {
        // Auto-resize textareas
        const textareas = document.querySelectorAll('.form-textarea-auto');
        textareas.forEach(textarea => {
            this.autoResizeTextarea(textarea);
            textarea.addEventListener('input', () => this.autoResizeTextarea(textarea));
        });

        // File upload enhancements
        const fileInputs = document.querySelectorAll('.form-file-input');
        fileInputs.forEach(input => {
            this.initFileUpload(input);
        });

        // Form validation enhancements
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.initFormValidation(form);
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    initFileUpload(input) {
        const label = input.nextElementSibling;
        if (!label || !label.classList.contains('form-file-label')) return;

        // Handle drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            label.addEventListener(eventName, () => label.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, () => label.classList.remove('dragover'), false);
        });

        label.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            input.files = files;
            this.handleFileSelect(input, files);
        });

        // Handle file selection
        input.addEventListener('change', (e) => {
            this.handleFileSelect(input, e.target.files);
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(input, files) {
        const label = input.nextElementSibling;
        if (files.length > 0) {
            const fileName = files.length === 1 ? files[0].name : `${files.length} files selected`;
            label.textContent = fileName;
        }
    }

    initFormValidation(form) {
        const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        form.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return true;

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Update form group state
        formGroup.classList.remove('success', 'error');
        const existingFeedback = formGroup.querySelector('.form-feedback');
        
        if (existingFeedback) {
            existingFeedback.remove();
        }

        if (!isValid) {
            formGroup.classList.add('error');
            const feedback = document.createElement('div');
            feedback.className = 'form-feedback error';
            feedback.textContent = errorMessage;
            field.parentNode.appendChild(feedback);
        } else if (field.value.trim()) {
            formGroup.classList.add('success');
        }

        return isValid;
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.remove('error');
        const errorFeedback = formGroup.querySelector('.form-feedback.error');
        if (errorFeedback) {
            errorFeedback.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Initialize button state management
     */
    initButtonStates() {
        // Handle loading states
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (button && button.dataset.loading === 'true') {
                this.setButtonLoading(button, true);
                
                // Simulate async operation
                setTimeout(() => {
                    this.setButtonLoading(button, false);
                }, 2000);
            }
        });
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
            button.setAttribute('aria-busy', 'true');
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
            button.removeAttribute('aria-busy');
        }
    }

    /**
     * Public API methods
     */
    showProgressSteps() {
        const progressNav = document.getElementById('progressNav');
        if (progressNav) {
            progressNav.style.display = 'block';
        }
    }

    hideProgressSteps() {
        const progressNav = document.getElementById('progressNav');
        if (progressNav) {
            progressNav.style.display = 'none';
        }
    }

    setActiveStep(stepNumber) {
        this.updateProgressSteps(stepNumber);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
}

// Initialize design system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.DesignSystem = new DesignSystem();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesignSystem;
}
