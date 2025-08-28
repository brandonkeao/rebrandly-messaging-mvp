// Loading & Error States v2 - Enhanced Components

class LoadingManager {
    constructor() {
        this.activeLoaders = new Set();
    }

    // Show loading overlay
    showOverlay(message = 'Loading...') {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner large"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    // Hide loading overlay
    hideOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Show progress bar
    showProgress(container, initialValue = 0) {
        const progressHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${initialValue}%"></div>
            </div>
        `;
        
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        container.innerHTML = progressHTML;
        return container.querySelector('.progress-fill');
    }

    // Update progress
    updateProgress(progressElement, value, status = 'default') {
        if (progressElement) {
            progressElement.style.width = `${Math.min(100, Math.max(0, value))}%`;
            const progressBar = progressElement.parentElement;
            progressBar.className = `progress-bar ${status}`;
        }
    }

    // Show skeleton loading
    showSkeleton(container, type = 'default') {
        const skeletons = {
            default: `
                <div class="skeleton skeleton-text large"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
            `,
            card: `
                <div class="loading-card">
                    <div class="loading-card-header">
                        <div class="skeleton skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="skeleton skeleton-text large" style="width: 40%;"></div>
                            <div class="skeleton skeleton-text small" style="width: 60%;"></div>
                        </div>
                    </div>
                    <div class="loading-card-content">
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text" style="width: 80%;"></div>
                    </div>
                </div>
            `,
            table: `
                <div class="skeleton skeleton-text large" style="margin-bottom: 20px;"></div>
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
            `,
            list: `
                <div class="skeleton skeleton-text large" style="margin-bottom: 16px;"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 70%;"></div>
            `
        };

        if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        container.innerHTML = skeletons[type] || skeletons.default;
    }

    // Show error state
    showError(container, options = {}) {
        const {
            icon = '⚠️',
            title = 'Something went wrong',
            message = 'An error occurred while loading this content.',
            showRetry = true,
            onRetry = null
        } = options;

        const errorHTML = `
            <div class="error-state">
                <div class="error-icon">${icon}</div>
                <h3 class="error-title">${title}</h3>
                <p class="error-message">${message}</p>
                ${showRetry ? `
                    <div class="error-actions">
                        <button class="retry-btn" onclick="loadingManager.handleRetry('${container.id}')">
                            🔄 Try Again
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        container.innerHTML = errorHTML;
        
        if (onRetry) {
            this.retryCallbacks = this.retryCallbacks || {};
            this.retryCallbacks[container.id] = onRetry;
        }
    }

    // Show network error
    showNetworkError(container, onRetry = null) {
        this.showError(container, {
            icon: '🌐',
            title: 'Network Error',
            message: 'Unable to connect to the server. Please check your internet connection and try again.',
            onRetry
        });
    }

    // Show empty state
    showEmpty(container, options = {}) {
        const {
            icon = '📋',
            title = 'No data found',
            message = 'There are no items to display.',
            actionText = null,
            onAction = null
        } = options;

        const emptyHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-message">${message}</p>
                ${actionText && onAction ? `
                    <button class="btn btn-primary" onclick="loadingManager.handleEmptyAction('${container.id}')">${actionText}</button>
                ` : ''}
            </div>
        `;

        if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        container.innerHTML = emptyHTML;
        
        if (onAction) {
            this.emptyActionCallbacks = this.emptyActionCallbacks || {};
            this.emptyActionCallbacks[container.id] = onAction;
        }
    }

    // Button loading state
    setButtonLoading(button, loading = true) {
        if (typeof button === 'string') {
            button = document.getElementById(button);
        }

        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
            }
        }
    }

    // Input loading state
    setInputLoading(input, loading = true) {
        if (typeof input === 'string') {
            input = document.getElementById(input);
        }

        if (loading) {
            input.classList.add('loading');
            input.disabled = true;
        } else {
            input.classList.remove('loading');
            input.disabled = false;
        }
    }

    // Handle retry callback
    handleRetry(containerId) {
        if (this.retryCallbacks && this.retryCallbacks[containerId]) {
            this.retryCallbacks[containerId]();
        }
    }

    // Handle empty action callback
    handleEmptyAction(containerId) {
        if (this.emptyActionCallbacks && this.emptyActionCallbacks[containerId]) {
            this.emptyActionCallbacks[containerId]();
        }
    }

    // Simulate async operation with loading states
    async simulateAsync(operation, options = {}) {
        const {
            showOverlay = false,
            overlayMessage = 'Loading...',
            button = null,
            onProgress = null
        } = options;

        let overlay = null;
        
        try {
            // Show loading states
            if (showOverlay) {
                overlay = this.showOverlay(overlayMessage);
            }
            
            if (button) {
                this.setButtonLoading(button, true);
            }

            // Execute operation with progress tracking
            const result = await operation(onProgress);
            
            return result;
        } catch (error) {
            throw error;
        } finally {
            // Hide loading states
            if (overlay) {
                this.hideOverlay();
            }
            
            if (button) {
                this.setButtonLoading(button, false);
            }
        }
    }
}

// Initialize loading manager
const loadingManager = new LoadingManager();

// Utility functions
window.showLoading = (container, type) => loadingManager.showSkeleton(container, type);
window.showError = (container, options) => loadingManager.showError(container, options);
window.showEmpty = (container, options) => loadingManager.showEmpty(container, options);
window.setButtonLoading = (button, loading) => loadingManager.setButtonLoading(button, loading);
