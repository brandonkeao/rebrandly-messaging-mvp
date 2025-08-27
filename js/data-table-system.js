/**
 * Data Table System JavaScript
 * Handles sorting, filtering, pagination, and bulk actions
 */

class DataTable {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            data: [],
            columns: [],
            pageSize: 10,
            pageSizeOptions: [5, 10, 25, 50, 100],
            sortable: true,
            filterable: true,
            searchable: true,
            selectable: false,
            bulkActions: [],
            rowActions: [],
            emptyMessage: 'No data available',
            loadingMessage: 'Loading...',
            ...options
        };
        
        this.state = {
            data: [...this.options.data],
            filteredData: [...this.options.data],
            currentPage: 1,
            pageSize: this.options.pageSize,
            sortColumn: null,
            sortDirection: 'asc',
            searchQuery: '',
            selectedRows: new Set(),
            filters: {}
        };
        
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = this.getTableHTML();
        this.updatePagination();
        this.updateBulkActions();
    }

    getTableHTML() {
        const { columns, searchable, filterable, bulkActions } = this.options;
        const { filteredData, currentPage, pageSize } = this.state;
        
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        return `
            <div class="data-table-container">
                ${this.getTableHeaderHTML()}
                ${bulkActions.length > 0 ? this.getBulkActionsHTML() : ''}
                <div class="table-wrapper">
                    <table class="data-table" role="table">
                        <thead>
                            <tr role="row">
                                ${this.options.selectable ? '<th><input type="checkbox" class="bulk-checkbox select-all" aria-label="Select all rows"></th>' : ''}
                                ${columns.map(col => this.getColumnHeaderHTML(col)).join('')}
                                ${this.options.rowActions.length > 0 ? '<th>Actions</th>' : ''}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.length > 0 ? pageData.map(row => this.getRowHTML(row)).join('') : this.getEmptyStateHTML()}
                        </tbody>
                    </table>
                </div>
                ${this.getTableFooterHTML()}
            </div>
        `;
    }

    getTableHeaderHTML() {
        const { searchable, filterable } = this.options;
        
        return `
            <div class="table-header">
                <h3 class="table-title">${this.options.title || 'Data Table'}</h3>
                <div class="table-actions">
                    ${searchable ? this.getSearchHTML() : ''}
                    ${filterable ? this.getFiltersHTML() : ''}
                    ${this.options.headerActions ? this.options.headerActions.map(action => 
                        `<button class="btn-website-primary" onclick="${action.onClick}">${action.label}</button>`
                    ).join('') : ''}
                </div>
            </div>
        `;
    }

    getSearchHTML() {
        return `
            <div class="table-search">
                <span class="table-search-icon">🔍</span>
                <input type="text" class="table-search-input" placeholder="Search..." value="${this.state.searchQuery}">
            </div>
        `;
    }

    getFiltersHTML() {
        // Generate filter dropdowns based on column types
        const filterableColumns = this.options.columns.filter(col => col.filterable);
        
        return `
            <div class="table-filters">
                ${filterableColumns.map(col => `
                    <select class="table-filter-select" data-column="${col.key}">
                        <option value="">All ${col.label}</option>
                        ${this.getFilterOptions(col).map(option => 
                            `<option value="${option.value}" ${this.state.filters[col.key] === option.value ? 'selected' : ''}>${option.label}</option>`
                        ).join('')}
                    </select>
                `).join('')}
            </div>
        `;
    }

    getFilterOptions(column) {
        const uniqueValues = [...new Set(this.options.data.map(row => row[column.key]))];
        return uniqueValues.filter(val => val != null).map(val => ({
            value: val,
            label: column.formatFilter ? column.formatFilter(val) : val
        }));
    }

    getColumnHeaderHTML(column) {
        const { sortable } = this.options;
        const { sortColumn, sortDirection } = this.state;
        const isSorted = sortColumn === column.key;
        const sortClass = isSorted ? `sort-${sortDirection}` : '';
        
        return `
            <th class="${sortable && column.sortable !== false ? 'sortable-header' : ''} ${sortClass}" 
                ${sortable && column.sortable !== false ? `data-column="${column.key}" tabindex="0" role="columnheader" aria-sort="${isSorted ? sortDirection + 'ending' : 'none'}"` : ''}>
                ${column.label}
                ${sortable && column.sortable !== false ? '<span class="sort-indicator">▲</span>' : ''}
            </th>
        `;
    }

    getRowHTML(row, index) {
        const { columns, selectable, rowActions } = this.options;
        const rowId = row.id || index;
        const isSelected = this.state.selectedRows.has(rowId);
        
        return `
            <tr role="row" data-row-id="${rowId}" class="${isSelected ? 'selected' : ''}">
                ${selectable ? `<td><input type="checkbox" class="bulk-checkbox row-select" data-row-id="${rowId}" ${isSelected ? 'checked' : ''}></td>` : ''}
                ${columns.map(col => `<td>${this.formatCellValue(row[col.key], col, row)}</td>`).join('')}
                ${rowActions.length > 0 ? `<td>${this.getRowActionsHTML(row)}</td>` : ''}
            </tr>
        `;
    }

    formatCellValue(value, column, row) {
        if (column.render) {
            return column.render(value, row);
        }
        
        if (column.type === 'date' && value) {
            return new Date(value).toLocaleDateString();
        }
        
        if (column.type === 'currency' && value != null) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        }
        
        if (column.type === 'number' && value != null) {
            return new Intl.NumberFormat().format(value);
        }
        
        return value || '';
    }

    getRowActionsHTML(row) {
        return `
            <div class="row-actions">
                ${this.options.rowActions.map(action => `
                    <button class="row-action-btn ${action.type || ''}" 
                            onclick="${action.onClick}('${row.id || row.key}')" 
                            title="${action.label}"
                            aria-label="${action.label}">
                        ${action.icon}
                    </button>
                `).join('')}
            </div>
        `;
    }

    getBulkActionsHTML() {
        const selectedCount = this.state.selectedRows.size;
        
        return `
            <div class="bulk-actions ${selectedCount > 0 ? 'active' : ''}">
                <span class="bulk-actions-text">${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected</span>
                <div class="bulk-actions-buttons">
                    ${this.options.bulkActions.map(action => `
                        <button class="btn-website-secondary btn-sm" onclick="${action.onClick}(Array.from(this.state.selectedRows))">
                            ${action.label}
                        </button>
                    `).join('')}
                    <button class="btn-website-secondary btn-sm" onclick="this.clearSelection()">Clear</button>
                </div>
            </div>
        `;
    }

    getEmptyStateHTML() {
        return `
            <tr>
                <td colspan="${this.getColumnCount()}" class="table-empty">
                    <div class="table-empty-icon">📋</div>
                    <div class="table-empty-title">No Data Found</div>
                    <div class="table-empty-message">${this.options.emptyMessage}</div>
                    ${this.options.emptyAction ? `<button class="btn-website-primary" onclick="${this.options.emptyAction.onClick}">${this.options.emptyAction.label}</button>` : ''}
                </td>
            </tr>
        `;
    }

    getTableFooterHTML() {
        const { filteredData, currentPage, pageSize } = this.state;
        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
        const endItem = Math.min(currentPage * pageSize, totalItems);
        
        return `
            <div class="table-footer">
                <div class="pagination-info">
                    Showing ${startItem} to ${endItem} of ${totalItems} entries
                </div>
                <div class="pagination-controls">
                    ${this.getPaginationHTML()}
                </div>
                <div class="page-size-selector">
                    Show 
                    <select class="page-size-select">
                        ${this.options.pageSizeOptions.map(size => 
                            `<option value="${size}" ${size === pageSize ? 'selected' : ''}>${size}</option>`
                        ).join('')}
                    </select>
                    entries
                </div>
            </div>
        `;
    }

    getPaginationHTML() {
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.filteredData.length / this.state.pageSize);
        
        let html = `
            <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">‹</button>
        `;
        
        // Show page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            html += `<button class="pagination-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
            html += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        html += `
            <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">›</button>
        `;
        
        return html;
    }

    bindEvents() {
        // Search functionality
        this.container.addEventListener('input', (e) => {
            if (e.target.classList.contains('table-search-input')) {
                this.handleSearch(e.target.value);
            }
        });

        // Sorting functionality
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('sortable-header') || e.target.closest('.sortable-header')) {
                const header = e.target.classList.contains('sortable-header') ? e.target : e.target.closest('.sortable-header');
                this.handleSort(header.dataset.column);
            }
        });

        // Keyboard sorting
        this.container.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && (e.target.classList.contains('sortable-header') || e.target.closest('.sortable-header'))) {
                e.preventDefault();
                const header = e.target.classList.contains('sortable-header') ? e.target : e.target.closest('.sortable-header');
                this.handleSort(header.dataset.column);
            }
        });

        // Pagination
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-btn') && e.target.dataset.page) {
                this.goToPage(parseInt(e.target.dataset.page));
            }
        });

        // Page size change
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('page-size-select')) {
                this.changePageSize(parseInt(e.target.value));
            }
        });

        // Filtering
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('table-filter-select')) {
                this.handleFilter(e.target.dataset.column, e.target.value);
            }
        });

        // Row selection
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('select-all')) {
                this.toggleSelectAll(e.target.checked);
            } else if (e.target.classList.contains('row-select')) {
                this.toggleRowSelection(e.target.dataset.rowId, e.target.checked);
            }
        });
    }

    handleSearch(query) {
        this.state.searchQuery = query.toLowerCase();
        this.applyFilters();
        this.state.currentPage = 1;
        this.render();
    }

    handleSort(column) {
        if (this.state.sortColumn === column) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortColumn = column;
            this.state.sortDirection = 'asc';
        }
        
        this.applySorting();
        this.render();
    }

    handleFilter(column, value) {
        if (value === '') {
            delete this.state.filters[column];
        } else {
            this.state.filters[column] = value;
        }
        
        this.applyFilters();
        this.state.currentPage = 1;
        this.render();
    }

    applyFilters() {
        let filtered = [...this.state.data];
        
        // Apply search filter
        if (this.state.searchQuery) {
            filtered = filtered.filter(row => {
                return this.options.columns.some(col => {
                    const value = row[col.key];
                    return value && value.toString().toLowerCase().includes(this.state.searchQuery);
                });
            });
        }
        
        // Apply column filters
        Object.entries(this.state.filters).forEach(([column, value]) => {
            filtered = filtered.filter(row => row[column] === value);
        });
        
        this.state.filteredData = filtered;
        this.applySorting();
    }

    applySorting() {
        if (!this.state.sortColumn) return;
        
        const column = this.options.columns.find(col => col.key === this.state.sortColumn);
        const direction = this.state.sortDirection === 'asc' ? 1 : -1;
        
        this.state.filteredData.sort((a, b) => {
            let aVal = a[this.state.sortColumn];
            let bVal = b[this.state.sortColumn];
            
            // Handle different data types
            if (column && column.type === 'number') {
                aVal = parseFloat(aVal) || 0;
                bVal = parseFloat(bVal) || 0;
            } else if (column && column.type === 'date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else {
                aVal = (aVal || '').toString().toLowerCase();
                bVal = (bVal || '').toString().toLowerCase();
            }
            
            if (aVal < bVal) return -1 * direction;
            if (aVal > bVal) return 1 * direction;
            return 0;
        });
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.state.filteredData.length / this.state.pageSize);
        if (page >= 1 && page <= totalPages) {
            this.state.currentPage = page;
            this.render();
        }
    }

    changePageSize(size) {
        this.state.pageSize = size;
        this.state.currentPage = 1;
        this.render();
    }

    toggleSelectAll(checked) {
        const { filteredData, currentPage, pageSize } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        if (checked) {
            pageData.forEach(row => {
                this.state.selectedRows.add(row.id || row.key);
            });
        } else {
            pageData.forEach(row => {
                this.state.selectedRows.delete(row.id || row.key);
            });
        }
        
        this.updateBulkActions();
    }

    toggleRowSelection(rowId, checked) {
        if (checked) {
            this.state.selectedRows.add(rowId);
        } else {
            this.state.selectedRows.delete(rowId);
        }
        
        this.updateBulkActions();
        this.updateSelectAllCheckbox();
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = this.container.querySelector('.select-all');
        if (selectAllCheckbox) {
            const { filteredData, currentPage, pageSize } = this.state;
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pageData = filteredData.slice(startIndex, endIndex);
            
            const selectedOnPage = pageData.filter(row => this.state.selectedRows.has(row.id || row.key)).length;
            
            selectAllCheckbox.checked = selectedOnPage === pageData.length && pageData.length > 0;
            selectAllCheckbox.indeterminate = selectedOnPage > 0 && selectedOnPage < pageData.length;
        }
    }

    updateBulkActions() {
        const bulkActions = this.container.querySelector('.bulk-actions');
        if (bulkActions) {
            const selectedCount = this.state.selectedRows.size;
            bulkActions.classList.toggle('active', selectedCount > 0);
            
            const text = bulkActions.querySelector('.bulk-actions-text');
            if (text) {
                text.textContent = `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`;
            }
        }
    }

    clearSelection() {
        this.state.selectedRows.clear();
        this.render();
    }

    getColumnCount() {
        let count = this.options.columns.length;
        if (this.options.selectable) count++;
        if (this.options.rowActions.length > 0) count++;
        return count;
    }

    // Public API methods
    updateData(newData) {
        this.state.data = [...newData];
        this.state.selectedRows.clear();
        this.applyFilters();
        this.state.currentPage = 1;
        this.render();
    }

    getSelectedRows() {
        return Array.from(this.state.selectedRows);
    }

    refresh() {
        this.applyFilters();
        this.render();
    }

    showLoading() {
        this.container.classList.add('table-loading');
    }

    hideLoading() {
        this.container.classList.remove('table-loading');
    }
}

// Export for use in other modules
window.DataTable = DataTable;
