/**
 * Advanced Analytics Components JavaScript
 * Handles charts, metrics, and reporting functionality
 */

class AnalyticsComponents {
    constructor() {
        this.charts = new Map();
        this.metrics = new Map();
        this.dateRange = {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            end: new Date()
        };
        this.filters = {
            campaign: 'all',
            status: 'all',
            channel: 'all'
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleData();
    }

    // ==========================================================================
    // METRIC CARDS
    // ==========================================================================

    createMetricCard(container, options = {}) {
        const {
            title = 'Metric',
            value = '0',
            subtitle = '',
            trend = null,
            type = 'primary'
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const metricCard = document.createElement('div');
        metricCard.className = `metric-card ${type}`;

        const trendHtml = trend ? `
            <div class="metric-trend ${trend.direction}">
                ${trend.direction === 'positive' ? '↗' : trend.direction === 'negative' ? '↘' : '→'} ${trend.value}
            </div>
        ` : '';

        metricCard.innerHTML = `
            <div class="metric-header">
                <div class="metric-title">${title}</div>
                ${trendHtml}
            </div>
            <div class="metric-value">${value}</div>
            <div class="metric-subtitle">${subtitle}</div>
        `;

        element.appendChild(metricCard);

        // Store metric for updates
        const metricId = this.generateId();
        this.metrics.set(metricId, {
            element: metricCard,
            options: options
        });

        return {
            id: metricId,
            update: (newOptions) => this.updateMetric(metricId, newOptions),
            remove: () => this.removeMetric(metricId)
        };
    }

    updateMetric(metricId, newOptions) {
        const metric = this.metrics.get(metricId);
        if (!metric) return;

        const options = { ...metric.options, ...newOptions };
        metric.options = options;

        const valueElement = metric.element.querySelector('.metric-value');
        const subtitleElement = metric.element.querySelector('.metric-subtitle');
        const trendElement = metric.element.querySelector('.metric-trend');

        if (valueElement) valueElement.textContent = options.value;
        if (subtitleElement) subtitleElement.textContent = options.subtitle;
        
        if (options.trend && trendElement) {
            trendElement.className = `metric-trend ${options.trend.direction}`;
            trendElement.innerHTML = `
                ${options.trend.direction === 'positive' ? '↗' : options.trend.direction === 'negative' ? '↘' : '→'} ${options.trend.value}
            `;
        }
    }

    // ==========================================================================
    // BAR CHARTS
    // ==========================================================================

    createBarChart(container, options = {}) {
        const {
            data = [],
            title = 'Bar Chart',
            subtitle = '',
            colors = ['primary']
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const chartCard = document.createElement('div');
        chartCard.className = 'chart-card';

        const maxValue = Math.max(...data.map(item => item.value));

        const barsHtml = data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            const colorClass = colors[index % colors.length] || 'primary';
            
            return `
                <div class="bar-chart-item">
                    <div class="bar ${colorClass}" style="height: ${height}%" tabindex="0" role="img" aria-label="${item.label}: ${item.value}">
                        <div class="bar-value">${item.value}</div>
                    </div>
                    <div class="bar-label">${item.label}</div>
                </div>
            `;
        }).join('');

        chartCard.innerHTML = `
            <div class="chart-header">
                <div>
                    <div class="chart-title">${title}</div>
                    ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
                </div>
                <div class="chart-controls">
                    <div class="export-controls">
                        <button class="export-btn" onclick="exportChart('${this.generateId()}', 'png')">
                            📊 Export
                        </button>
                    </div>
                </div>
            </div>
            <div class="chart-container">
                <div class="bar-chart">
                    ${barsHtml}
                </div>
            </div>
        `;

        element.appendChild(chartCard);

        const chartId = this.generateId();
        this.charts.set(chartId, {
            element: chartCard,
            type: 'bar',
            data: data,
            options: options
        });

        return {
            id: chartId,
            update: (newData) => this.updateBarChart(chartId, newData),
            remove: () => this.removeChart(chartId)
        };
    }

    updateBarChart(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        chart.data = newData;
        const maxValue = Math.max(...newData.map(item => item.value));
        const barChart = chart.element.querySelector('.bar-chart');

        const barsHtml = newData.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            const colorClass = chart.options.colors[index % chart.options.colors.length] || 'primary';
            
            return `
                <div class="bar-chart-item">
                    <div class="bar ${colorClass}" style="height: ${height}%" tabindex="0" role="img" aria-label="${item.label}: ${item.value}">
                        <div class="bar-value">${item.value}</div>
                    </div>
                    <div class="bar-label">${item.label}</div>
                </div>
            `;
        }).join('');

        barChart.innerHTML = barsHtml;
    }

    // ==========================================================================
    // LINE CHARTS
    // ==========================================================================

    createLineChart(container, options = {}) {
        const {
            data = [],
            title = 'Line Chart',
            subtitle = '',
            color = 'primary'
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const chartCard = document.createElement('div');
        chartCard.className = 'chart-card';

        chartCard.innerHTML = `
            <div class="chart-header">
                <div>
                    <div class="chart-title">${title}</div>
                    ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
                </div>
                <div class="chart-controls">
                    <div class="export-controls">
                        <button class="export-btn" onclick="exportChart('${this.generateId()}', 'png')">
                            📈 Export
                        </button>
                    </div>
                </div>
            </div>
            <div class="chart-container">
                <div class="line-chart">
                    <div class="line-chart-grid"></div>
                    <div class="line-chart-line"></div>
                </div>
            </div>
        `;

        element.appendChild(chartCard);

        const chartId = this.generateId();
        this.charts.set(chartId, {
            element: chartCard,
            type: 'line',
            data: data,
            options: options
        });

        return {
            id: chartId,
            update: (newData) => this.updateLineChart(chartId, newData),
            remove: () => this.removeChart(chartId)
        };
    }

    // ==========================================================================
    // DONUT CHARTS
    // ==========================================================================

    createDonutChart(container, options = {}) {
        const {
            value = 0,
            max = 100,
            title = 'Progress',
            subtitle = '',
            color = 'primary'
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const percentage = Math.min((value / max) * 100, 100);
        const circumference = 2 * Math.PI * 90; // radius = 90
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

        const chartCard = document.createElement('div');
        chartCard.className = 'chart-card';

        chartCard.innerHTML = `
            <div class="chart-header">
                <div>
                    <div class="chart-title">${title}</div>
                    ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
                </div>
            </div>
            <div class="chart-container">
                <div class="donut-chart">
                    <svg class="donut-chart-svg" viewBox="0 0 200 200">
                        <circle class="donut-chart-circle donut-chart-background" cx="100" cy="100" r="90"></circle>
                        <circle class="donut-chart-circle donut-chart-progress" cx="100" cy="100" r="90" 
                                style="stroke-dasharray: ${strokeDasharray}"></circle>
                    </svg>
                    <div class="donut-chart-center">
                        <div class="donut-chart-value">${Math.round(percentage)}%</div>
                        <div class="donut-chart-label">${value}/${max}</div>
                    </div>
                </div>
            </div>
        `;

        element.appendChild(chartCard);

        const chartId = this.generateId();
        this.charts.set(chartId, {
            element: chartCard,
            type: 'donut',
            data: { value, max },
            options: options
        });

        return {
            id: chartId,
            update: (newValue, newMax) => this.updateDonutChart(chartId, newValue, newMax),
            remove: () => this.removeChart(chartId)
        };
    }

    updateDonutChart(chartId, newValue, newMax) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        const max = newMax || chart.data.max;
        const percentage = Math.min((newValue / max) * 100, 100);
        const circumference = 2 * Math.PI * 90;
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

        const progressCircle = chart.element.querySelector('.donut-chart-progress');
        const valueElement = chart.element.querySelector('.donut-chart-value');
        const labelElement = chart.element.querySelector('.donut-chart-label');

        if (progressCircle) {
            progressCircle.style.strokeDasharray = strokeDasharray;
        }
        if (valueElement) {
            valueElement.textContent = `${Math.round(percentage)}%`;
        }
        if (labelElement) {
            labelElement.textContent = `${newValue}/${max}`;
        }

        chart.data = { value: newValue, max };
    }

    // ==========================================================================
    // DATA TABLES
    // ==========================================================================

    createAnalyticsTable(container, options = {}) {
        const {
            title = 'Data Table',
            columns = [],
            data = []
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const tableCard = document.createElement('div');
        tableCard.className = 'analytics-table';

        const headersHtml = columns.map(col => `<th>${col.label}</th>`).join('');
        const rowsHtml = data.map(row => {
            const cellsHtml = columns.map(col => `<td>${row[col.key] || ''}</td>`).join('');
            return `<tr>${cellsHtml}</tr>`;
        }).join('');

        tableCard.innerHTML = `
            <div class="analytics-table-header">
                <div class="analytics-table-title">${title}</div>
            </div>
            <div class="analytics-table-content">
                <table>
                    <thead>
                        <tr>${headersHtml}</tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;

        element.appendChild(tableCard);

        return {
            update: (newData) => {
                const tbody = tableCard.querySelector('tbody');
                const newRowsHtml = newData.map(row => {
                    const cellsHtml = columns.map(col => `<td>${row[col.key] || ''}</td>`).join('');
                    return `<tr>${cellsHtml}</tr>`;
                }).join('');
                tbody.innerHTML = newRowsHtml;
            },
            remove: () => tableCard.remove()
        };
    }

    // ==========================================================================
    // DATE RANGE PICKER
    // ==========================================================================

    createDateRangePicker(container, options = {}) {
        const {
            startDate = this.dateRange.start,
            endDate = this.dateRange.end,
            onChange = null
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const picker = document.createElement('div');
        picker.className = 'date-range-picker';

        const formatDate = (date) => date.toISOString().split('T')[0];

        picker.innerHTML = `
            <input type="date" value="${formatDate(startDate)}" class="date-start">
            <span class="date-range-separator">to</span>
            <input type="date" value="${formatDate(endDate)}" class="date-end">
        `;

        const startInput = picker.querySelector('.date-start');
        const endInput = picker.querySelector('.date-end');

        const handleChange = () => {
            const start = new Date(startInput.value);
            const end = new Date(endInput.value);
            this.dateRange = { start, end };
            if (onChange) onChange(start, end);
        };

        startInput.addEventListener('change', handleChange);
        endInput.addEventListener('change', handleChange);

        element.appendChild(picker);

        return {
            getRange: () => ({ start: new Date(startInput.value), end: new Date(endInput.value) }),
            setRange: (start, end) => {
                startInput.value = formatDate(start);
                endInput.value = formatDate(end);
                handleChange();
            },
            remove: () => picker.remove()
        };
    }

    // ==========================================================================
    // FILTERS
    // ==========================================================================

    createAnalyticsFilters(container, options = {}) {
        const {
            filters = [],
            onChange = null
        } = options;

        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return null;

        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'analytics-filters';

        const filtersHtml = filters.map(filter => {
            const optionsHtml = filter.options.map(option => 
                `<option value="${option.value}" ${option.selected ? 'selected' : ''}>${option.label}</option>`
            ).join('');

            return `
                <div class="filter-group">
                    <label class="filter-label">${filter.label}</label>
                    <select class="filter-select" data-filter="${filter.key}">
                        ${optionsHtml}
                    </select>
                </div>
            `;
        }).join('');

        filtersContainer.innerHTML = filtersHtml;

        // Bind change events
        filtersContainer.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const filterKey = e.target.dataset.filter;
                const value = e.target.value;
                this.filters[filterKey] = value;
                if (onChange) onChange(this.filters);
            });
        });

        element.appendChild(filtersContainer);

        return {
            getFilters: () => ({ ...this.filters }),
            setFilter: (key, value) => {
                const select = filtersContainer.querySelector(`[data-filter="${key}"]`);
                if (select) {
                    select.value = value;
                    this.filters[key] = value;
                }
            },
            remove: () => filtersContainer.remove()
        };
    }

    // ==========================================================================
    // UTILITY METHODS
    // ==========================================================================

    generateId() {
        return 'analytics_' + Math.random().toString(36).substr(2, 9);
    }

    removeChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.element.remove();
            this.charts.delete(chartId);
        }
    }

    removeMetric(metricId) {
        const metric = this.metrics.get(metricId);
        if (metric) {
            metric.element.remove();
            this.metrics.delete(metricId);
        }
    }

    bindEvents() {
        // Global export functionality
        window.exportChart = (chartId, format) => {
            showToast({
                title: 'Export Started',
                message: `Exporting chart as ${format.toUpperCase()}...`,
                type: 'info'
            });
        };
    }

    loadSampleData() {
        // Sample data for demonstrations
        this.sampleData = {
            metrics: [
                { title: 'Total Campaigns', value: '24', subtitle: 'Active campaigns', trend: { direction: 'positive', value: '+12%' }, type: 'success' },
                { title: 'Messages Sent', value: '1,847', subtitle: 'This month', trend: { direction: 'positive', value: '+8.5%' }, type: 'primary' },
                { title: 'Click Rate', value: '12.8%', subtitle: 'Average CTR', trend: { direction: 'negative', value: '-2.1%' }, type: 'warning' },
                { title: 'Conversion Rate', value: '3.2%', subtitle: 'Goal completions', trend: { direction: 'positive', value: '+0.8%' }, type: 'info' }
            ],
            barChart: [
                { label: 'Jan', value: 120 },
                { label: 'Feb', value: 190 },
                { label: 'Mar', value: 300 },
                { label: 'Apr', value: 500 },
                { label: 'May', value: 200 },
                { label: 'Jun', value: 300 }
            ],
            tableData: [
                { campaign: 'Product Launch', sent: 1250, delivered: 1200, clicked: 156, converted: 42 },
                { campaign: 'Newsletter #1', sent: 890, delivered: 875, clicked: 98, converted: 23 },
                { campaign: 'Promo Campaign', sent: 2100, delivered: 2050, clicked: 287, converted: 89 },
                { campaign: 'Welcome Series', sent: 450, delivered: 445, clicked: 67, converted: 18 }
            ]
        };
    }

    // ==========================================================================
    // DEMO HELPERS
    // ==========================================================================

    createDemoMetrics(container) {
        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        this.sampleData.metrics.forEach(metric => {
            this.createMetricCard(element, metric);
        });
    }

    createDemoCharts(container) {
        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        // Create bar chart
        this.createBarChart(element, {
            title: 'Monthly Campaign Performance',
            subtitle: 'Messages sent per month',
            data: this.sampleData.barChart,
            colors: ['primary', 'success', 'warning', 'error', 'info', 'primary']
        });

        // Create donut chart
        this.createDonutChart(element, {
            title: 'Campaign Completion',
            subtitle: 'Overall progress',
            value: 78,
            max: 100
        });
    }

    createDemoTable(container) {
        const element = typeof container === 'string' ? document.querySelector(container) : container;
        if (!element) return;

        this.createAnalyticsTable(element, {
            title: 'Campaign Performance',
            columns: [
                { key: 'campaign', label: 'Campaign' },
                { key: 'sent', label: 'Sent' },
                { key: 'delivered', label: 'Delivered' },
                { key: 'clicked', label: 'Clicked' },
                { key: 'converted', label: 'Converted' }
            ],
            data: this.sampleData.tableData
        });
    }
}

// Global instance
window.AnalyticsComponents = new AnalyticsComponents();

// Convenience functions
window.createMetricCard = (container, options) => window.AnalyticsComponents.createMetricCard(container, options);
window.createBarChart = (container, options) => window.AnalyticsComponents.createBarChart(container, options);
window.createLineChart = (container, options) => window.AnalyticsComponents.createLineChart(container, options);
window.createDonutChart = (container, options) => window.AnalyticsComponents.createDonutChart(container, options);
window.createAnalyticsTable = (container, options) => window.AnalyticsComponents.createAnalyticsTable(container, options);
window.createDateRangePicker = (container, options) => window.AnalyticsComponents.createDateRangePicker(container, options);
window.createAnalyticsFilters = (container, options) => window.AnalyticsComponents.createAnalyticsFilters(container, options);
