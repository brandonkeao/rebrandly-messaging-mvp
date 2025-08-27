/**
 * Loading & Error States JavaScript
 * Handles loading indicators, error messages, and empty states
 */

class LoadingErrorStates {
    constructor() {
        this.activeLoaders = new Set();
        this.networkStatus = 'online';
        this.init();
    }

    init() {
        this.createNetworkStatusIndicator();
        this.bindNetworkEvents();
    }

    // ==========================================================================
    // LOADING STATES
    // ==========================================================================

    showLoading(container, options = {}) {
        const {
            type = 'spinner', // 'spinner', 'overlay', 'skeleton'
            size = 'md', // 'sm', 'md', 'lg', 'xl'
            text = 'Loading...',
            overlay = false,
            dark = false
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const loaderId = this.generateLoaderId();
        this.activeLoaders.add(loaderId);

        let loadingElement;

        switch (type) {
            case 'overlay':
                loadingElement = this.createLoadingOverlay(text, dark);
                break;
            case 'skeleton':
                loadingElement = this.createSkeletonLoader(options);
                break;
            case 'spinner':
            default:
                loadingElement = this.createSpinner(size, text);
                break;
        }

        loadingElement.setAttribute('data-loader-id', loaderId);
        
        if (overlay || type === 'overlay') {
            element.style.position = 'relative';
            element.appendChild(loadingElement);
        } else {
            element.innerHTML = '';
            element.appendChild(loadingElement);
        }

        return loaderId;
    }

    hideLoading(container, loaderId = null) {
        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        if (loaderId) {
            const loader = element.querySelector(`[data-loader-id="${loaderId}"]`);
            if (loader) {
                loader.remove();
                this.activeLoaders.delete(loaderId);
            }
        } else {
            // Remove all loading elements
            const loaders = element.querySelectorAll('[data-loader-id]');
            loaders.forEach(loader => {
                const id = loader.getAttribute('data-loader-id');
                this.activeLoaders.delete(id);
                loader.remove();
            });
        }
    }

    createSpinner(size = 'md', text = '') {
        const container = document.createElement('div');
        container.className = 'loading-container';
        container.style.textAlign = 'center';
        container.style.padding = 'var(--space-lg)';

        const spinner = document.createElement('div');
        spinner.className = `loading-spinner loading-spinner-${size}`;
        spinner.setAttribute('role', 'status');
        spinner.setAttribute('aria-label', text || 'Loading');

        container.appendChild(spinner);

        if (text) {
            const textElement = document.createElement('div');
            textElement.className = 'loading-text';
            textElement.textContent = text;
            container.appendChild(textElement);
        }

        return container;
    }

    createLoadingOverlay(text = 'Loading...', dark = false) {
        const overlay = document.createElement('div');
        overlay.className = `loading-overlay ${dark ? 'loading-overlay-dark' : ''}`;
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-label', text);

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        overlay.appendChild(spinner);

        if (text) {
            const textElement = document.createElement('div');
            textElement.className = 'loading-text';
            textElement.textContent = text;
            overlay.appendChild(textElement);
        }

        return overlay;
    }

    createSkeletonLoader(options = {}) {
        const { rows = 3, avatar = false, title = false } = options;
        const container = document.createElement('div');
        container.className = 'skeleton-container';
        container.style.padding = 'var(--space-lg)';

        if (title) {
            const titleSkeleton = document.createElement('div');
            titleSkeleton.className = 'skeleton skeleton-title';
            container.appendChild(titleSkeleton);
        }

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = 'var(--space-sm)';
            row.style.marginBottom = 'var(--space-md)';

            if (avatar) {
                const avatarSkeleton = document.createElement('div');
                avatarSkeleton.className = 'skeleton skeleton-avatar';
                row.appendChild(avatarSkeleton);
            }

            const textContainer = document.createElement('div');
            textContainer.style.flex = '1';

            const textSkeleton = document.createElement('div');
            textSkeleton.className = 'skeleton skeleton-text';
            textContainer.appendChild(textSkeleton);

            const subTextSkeleton = document.createElement('div');
            subTextSkeleton.className = 'skeleton skeleton-text-sm';
            subTextSkeleton.style.width = '70%';
            textContainer.appendChild(subTextSkeleton);

            row.appendChild(textContainer);
            container.appendChild(row);
        }

        return container;
    }

    // ==========================================================================
    // PROGRESS BARS
    // ==========================================================================

    createProgressBar(container, options = {}) {
        const {
            value = 0,
            max = 100,
            size = 'md',
            color = 'primary',
            label = '',
            showPercentage = true,
            indeterminate = false
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        if (label || showPercentage) {
            const labelContainer = document.createElement('div');
            labelContainer.className = 'progress-label';

            if (label) {
                const labelElement = document.createElement('span');
                labelElement.textContent = label;
                labelContainer.appendChild(labelElement);
            }

            if (showPercentage && !indeterminate) {
                const percentageElement = document.createElement('span');
                percentageElement.className = 'progress-percentage';
                percentageElement.textContent = `${Math.round((value / max) * 100)}%`;
                labelContainer.appendChild(percentageElement);
            }

            progressContainer.appendChild(labelContainer);
        }

        const progressBar = document.createElement('div');
        progressBar.className = `progress-bar progress-bar-${size}`;
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuenow', value);
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', max);

        const progressFill = document.createElement('div');
        progressFill.className = `progress-fill progress-fill-${color} ${indeterminate ? 'progress-indeterminate' : ''}`;
        
        if (!indeterminate) {
            progressFill.style.width = `${(value / max) * 100}%`;
        }

        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);
        element.appendChild(progressContainer);

        return {
            update: (newValue) => {
                if (!indeterminate) {
                    progressFill.style.width = `${(newValue / max) * 100}%`;
                    progressBar.setAttribute('aria-valuenow', newValue);
                    
                    if (showPercentage) {
                        const percentageElement = progressContainer.querySelector('.progress-percentage');
                        if (percentageElement) {
                            percentageElement.textContent = `${Math.round((newValue / max) * 100)}%`;
                        }
                    }
                }
            },
            remove: () => {
                progressContainer.remove();
            }
        };
    }

    // ==========================================================================
    // ERROR STATES
    // ==========================================================================

    showError(container, options = {}) {
        const {
            type = 'general', // 'general', 'network', '404', 'permission'
            title = 'Something went wrong',
            message = 'Please try again later.',
            actions = [],
            icon = '⚠️'
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        const errorContainer = document.createElement('div');
        errorContainer.className = `error-container error-${type}`;

        const errorIcon = document.createElement('div');
        errorIcon.className = 'error-icon';
        errorIcon.textContent = icon;
        errorContainer.appendChild(errorIcon);

        const errorTitle = document.createElement('h3');
        errorTitle.className = 'error-title';
        errorTitle.textContent = title;
        errorContainer.appendChild(errorTitle);

        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorContainer.appendChild(errorMessage);

        if (actions.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'error-actions';

            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `btn-website-${action.type || 'primary'}`;
                button.textContent = action.label;
                button.onclick = action.onClick;
                actionsContainer.appendChild(button);
            });

            errorContainer.appendChild(actionsContainer);
        }

        element.innerHTML = '';
        element.appendChild(errorContainer);
    }

    // ==========================================================================
    // EMPTY STATES
    // ==========================================================================

    showEmptyState(container, options = {}) {
        const {
            icon = '📋',
            title = 'No data available',
            message = 'There are no items to display.',
            actions = []
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        const emptyContainer = document.createElement('div');
        emptyContainer.className = 'empty-state';

        const emptyIcon = document.createElement('div');
        emptyIcon.className = 'empty-state-icon';
        emptyIcon.textContent = icon;
        emptyContainer.appendChild(emptyIcon);

        const emptyTitle = document.createElement('h3');
        emptyTitle.className = 'empty-state-title';
        emptyTitle.textContent = title;
        emptyContainer.appendChild(emptyTitle);

        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-state-message';
        emptyMessage.textContent = message;
        emptyContainer.appendChild(emptyMessage);

        if (actions.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'empty-state-actions';

            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `btn-website-${action.type || 'primary'}`;
                button.textContent = action.label;
                button.onclick = action.onClick;
                actionsContainer.appendChild(button);
            });

            emptyContainer.appendChild(actionsContainer);
        }

        element.innerHTML = '';
        element.appendChild(emptyContainer);
    }

    // ==========================================================================
    // BUTTON LOADING STATES
    // ==========================================================================

    setButtonLoading(button, loading = true) {
        const element = typeof button === 'string' ? document.querySelector(button) : button;
        if (!element) return;

        if (loading) {
            element.classList.add('btn-loading');
            element.disabled = true;
            element.setAttribute('aria-busy', 'true');
        } else {
            element.classList.remove('btn-loading');
            element.disabled = false;
            element.setAttribute('aria-busy', 'false');
        }
    }

    // ==========================================================================
    // NETWORK STATUS
    // ==========================================================================

    createNetworkStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'network-status';
        indicator.id = 'networkStatus';
        document.body.appendChild(indicator);
    }

    bindNetworkEvents() {
        window.addEventListener('online', () => {
            this.updateNetworkStatus('online', 'Back online');
        });

        window.addEventListener('offline', () => {
            this.updateNetworkStatus('offline', 'No internet connection');
        });
    }

    updateNetworkStatus(status, message) {
        const indicator = document.getElementById('networkStatus');
        if (!indicator) return;

        this.networkStatus = status;
        indicator.className = `network-status ${status}`;
        indicator.textContent = message;
        indicator.classList.add('show');

        setTimeout(() => {
            indicator.classList.remove('show');
        }, 3000);
    }

    // ==========================================================================
    // UTILITY METHODS
    // ==========================================================================

    generateLoaderId() {
        return 'loader_' + Math.random().toString(36).substr(2, 9);
    }

    clearAllLoaders() {
        this.activeLoaders.forEach(loaderId => {
            const loader = document.querySelector(`[data-loader-id="${loaderId}"]`);
            if (loader) {
                loader.remove();
            }
        });
        this.activeLoaders.clear();
    }

    // ==========================================================================
    // ASYNC OPERATION HELPERS
    // ==========================================================================

    async withLoading(container, asyncOperation, options = {}) {
        const loaderId = this.showLoading(container, options);
        
        try {
            const result = await asyncOperation();
            return result;
        } catch (error) {
            this.showError(container, {
                title: 'Operation Failed',
                message: error.message || 'An unexpected error occurred.',
                actions: [
                    {
                        label: 'Try Again',
                        type: 'primary',
                        onClick: () => this.withLoading(container, asyncOperation, options)
                    }
                ]
            });
            throw error;
        } finally {
            this.hideLoading(container, loaderId);
        }
    }

    simulateAsyncOperation(duration = 2000, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error('Simulated operation failed'));
                } else {
                    resolve('Operation completed successfully');
                }
            }, duration);
        });
    }
}

// Global instance
window.LoadingErrorStates = new LoadingErrorStates();

// Convenience functions
window.showLoading = (container, options) => window.LoadingErrorStates.showLoading(container, options);
window.hideLoading = (container, loaderId) => window.LoadingErrorStates.hideLoading(container, loaderId);
window.showError = (container, options) => window.LoadingErrorStates.showError(container, options);
window.showEmptyState = (container, options) => window.LoadingErrorStates.showEmptyState(container, options);
window.setButtonLoading = (button, loading) => window.LoadingErrorStates.setButtonLoading(button, loading);
window.createProgressBar = (container, options) => window.LoadingErrorStates.createProgressBar(container, options);
