// Data Table System v2 - Enhanced Components

class DataTable {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.data = options.data || [];
        this.columns = options.columns || [];
        this.pageSize = options.pageSize || 10;
        this.currentPage = 1;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.searchTerm = '';
        this.selectedRows = new Set();
        this.filteredData = [...this.data];
        
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        this.container.innerHTML = `
            <div class="data-table-container">
                <div class="table-header">
                    <h3 class="table-title">${this.options.title || 'Data Table'}</h3>
                    <div class="table-actions">
                        <div class="table-search">
                            <input type="text" placeholder="Search..." value="${this.searchTerm}">
                        </div>
                        ${this.options.showAddButton ? '<button class="btn btn-primary btn-sm">Add New</button>' : ''}
                    </div>
                </div>
                
                ${this.selectedRows.size > 0 ? `
                    <div class="bulk-actions show">
                        <span class="bulk-actions-text">${this.selectedRows.size} items selected</span>
                        <button class="btn btn-sm btn-danger" onclick="this.deleteBulk()">Delete Selected</button>
                        <button class="btn btn-sm btn-secondary" onclick="this.clearSelection()">Clear Selection</button>
                    </div>
                ` : ''}

                <div class="table-wrapper">
                    ${pageData.length > 0 ? this.renderTable(pageData) : this.renderEmptyState()}
                </div>

                ${this.filteredData.length > this.pageSize ? this.renderPagination(totalPages) : ''}
            </div>
        `;
    }

    renderTable(data) {
        return `
            <table class="data-table">
                <thead>
                    <tr>
                        ${this.options.selectable ? '<th class="checkbox-cell"><input type="checkbox" id="selectAll"></th>' : ''}
                        ${this.columns.map(col => `
                            <th class="${col.sortable ? 'sortable' : ''} ${this.sortColumn === col.key ? 'sorted-' + this.sortDirection : ''}" 
                                data-column="${col.key}">
                                ${col.label}
                            </th>
                        `).join('')}
                        ${this.options.actions ? '<th>Actions</th>' : ''}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => this.renderRow(row)).join('')}
                </tbody>
            </table>
        `;
    }

    renderRow(row) {
        const isSelected = this.selectedRows.has(row.id);
        return `
            <tr data-id="${row.id}" class="${isSelected ? 'selected' : ''}">
                ${this.options.selectable ? `<td class="checkbox-cell"><input type="checkbox" ${isSelected ? 'checked' : ''}></td>` : ''}
                ${this.columns.map(col => `
                    <td>${this.formatCellValue(row[col.key], col)}</td>
                `).join('')}
                ${this.options.actions ? `
                    <td>
                        <div class="table-row-actions">
                            <button class="action-btn view" onclick="dataTable.viewRow('${row.id}')">View</button>
                            <button class="action-btn edit" onclick="dataTable.editRow('${row.id}')">Edit</button>
                            <button class="action-btn delete" onclick="dataTable.deleteRow('${row.id}')">Delete</button>
                        </div>
                    </td>
                ` : ''}
            </tr>
        `;
    }

    formatCellValue(value, column) {
        if (column.type === 'status') {
            return `<span class="status-badge ${value.toLowerCase()}">${value}</span>`;
        }
        if (column.type === 'date') {
            return new Date(value).toLocaleDateString();
        }
        if (column.type === 'currency') {
            return `$${parseFloat(value).toFixed(2)}`;
        }
        return value || '-';
    }

    renderEmptyState() {
        return `
            <div class="table-empty">
                <div class="table-empty-icon">📋</div>
                <h4>No data found</h4>
                <p>No items match your current search criteria.</p>
            </div>
        `;
    }

    renderPagination(totalPages) {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return `
            <div class="table-pagination">
                <div class="pagination-info">
                    Showing ${(this.currentPage - 1) * this.pageSize + 1} to ${Math.min(this.currentPage * this.pageSize, this.filteredData.length)} of ${this.filteredData.length} entries
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} onclick="dataTable.goToPage(${this.currentPage - 1})">Previous</button>
                    ${pages.map(page => `
                        <button class="pagination-btn ${page === this.currentPage ? 'active' : ''}" onclick="dataTable.goToPage(${page})">${page}</button>
                    `).join('')}
                    <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="dataTable.goToPage(${this.currentPage + 1})">Next</button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Search
        this.container.addEventListener('input', (e) => {
            if (e.target.matches('.table-search input')) {
                this.searchTerm = e.target.value;
                this.search();
            }
        });

        // Sort
        this.container.addEventListener('click', (e) => {
            if (e.target.matches('th.sortable')) {
                const column = e.target.dataset.column;
                this.sort(column);
            }
        });

        // Row selection
        this.container.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]')) {
                if (e.target.id === 'selectAll') {
                    this.toggleSelectAll(e.target.checked);
                } else {
                    const row = e.target.closest('tr');
                    this.toggleRowSelection(row.dataset.id, e.target.checked);
                }
            }
        });
    }

    search() {
        this.filteredData = this.data.filter(row => {
            return this.columns.some(col => {
                const value = row[col.key];
                return value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        });
        this.currentPage = 1;
        this.render();
    }

    sort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.filteredData.sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            
            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.render();
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
    }

    toggleRowSelection(id, selected) {
        if (selected) {
            this.selectedRows.add(id);
        } else {
            this.selectedRows.delete(id);
        }
        this.render();
    }

    toggleSelectAll(selected) {
        if (selected) {
            this.filteredData.forEach(row => this.selectedRows.add(row.id));
        } else {
            this.selectedRows.clear();
        }
        this.render();
    }

    clearSelection() {
        this.selectedRows.clear();
        this.render();
    }

    // Action methods
    viewRow(id) {
        const row = this.data.find(r => r.id === id);
        showToast(`Viewing: ${row.name || row.id}`, 'info');
    }

    editRow(id) {
        const row = this.data.find(r => r.id === id);
        showToast(`Editing: ${row.name || row.id}`, 'info');
    }

    deleteRow(id) {
        const row = this.data.find(r => r.id === id);
        confirmAction({
            title: 'Delete Item',
            message: `Are you sure you want to delete "${row.name || row.id}"?`,
            type: 'danger',
            onConfirm: () => {
                this.data = this.data.filter(r => r.id !== id);
                this.filteredData = this.filteredData.filter(r => r.id !== id);
                this.selectedRows.delete(id);
                this.render();
                showToast('Item deleted successfully', 'success');
            }
        });
    }

    deleteBulk() {
        confirmAction({
            title: 'Delete Selected Items',
            message: `Are you sure you want to delete ${this.selectedRows.size} items?`,
            type: 'danger',
            onConfirm: () => {
                this.data = this.data.filter(r => !this.selectedRows.has(r.id));
                this.filteredData = this.filteredData.filter(r => !this.selectedRows.has(r.id));
                const count = this.selectedRows.size;
                this.selectedRows.clear();
                this.render();
                showToast(`${count} items deleted successfully`, 'success');
            }
        });
    }
}
