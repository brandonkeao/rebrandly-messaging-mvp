// Analytics Components v2 - Enhanced Components

class AnalyticsManager {
    constructor() {
        this.data = this.generateSampleData();
        this.dateRange = 'last7days';
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.renderMetrics();
        this.renderCharts();
        this.renderPerformanceTable();
        this.attachEventListeners();
        this.startRealTimeUpdates();
    }

    generateSampleData() {
        const campaigns = [
            { id: '1', name: 'Product Launch', sent: 1250, delivered: 1198, failed: 52, clicks: 342, date: '2025-01-15' },
            { id: '2', name: 'Special Offer', sent: 890, delivered: 856, failed: 34, clicks: 234, date: '2025-01-20' },
            { id: '3', name: 'Newsletter', sent: 456, delivered: 441, failed: 15, clicks: 89, date: '2025-01-25' },
            { id: '4', name: 'Event Reminder', sent: 2100, delivered: 2034, failed: 66, clicks: 567, date: '2025-02-01' },
            { id: '5', name: 'Survey Request', sent: 678, delivered: 652, failed: 26, clicks: 123, date: '2025-02-05' }
        ];

        const dailyStats = this.generateDailyStats();
        
        return { campaigns, dailyStats };
    }

    generateDailyStats() {
        const stats = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            stats.push({
                date: date.toISOString().split('T')[0],
                sent: Math.floor(Math.random() * 500) + 200,
                delivered: Math.floor(Math.random() * 450) + 180,
                clicks: Math.floor(Math.random() * 100) + 20,
                revenue: (Math.random() * 1000 + 200).toFixed(2)
            });
        }
        
        return stats;
    }

    renderMetrics() {
        const totalSent = this.data.campaigns.reduce((sum, c) => sum + c.sent, 0);
        const totalDelivered = this.data.campaigns.reduce((sum, c) => sum + c.delivered, 0);
        const totalClicks = this.data.campaigns.reduce((sum, c) => sum + c.clicks, 0);
        const deliveryRate = ((totalDelivered / totalSent) * 100).toFixed(1);
        const clickRate = ((totalClicks / totalDelivered) * 100).toFixed(1);

        const metricsContainer = document.getElementById('metricsGrid');
        if (!metricsContainer) return;

        metricsContainer.innerHTML = `
            <div class="metric-card success">
                <div class="metric-header">
                    <div class="metric-icon success">📤</div>
                    <div class="metric-trend up">
                        ↗️ +12.5%
                    </div>
                </div>
                <div class="metric-value">${totalSent.toLocaleString()}</div>
                <div class="metric-label">Messages Sent</div>
                <div class="metric-details">Last 30 days</div>
            </div>

            <div class="metric-card info">
                <div class="metric-header">
                    <div class="metric-icon info">✅</div>
                    <div class="metric-trend up">
                        ↗️ +8.3%
                    </div>
                </div>
                <div class="metric-value">${deliveryRate}%</div>
                <div class="metric-label">Delivery Rate</div>
                <div class="metric-details">${totalDelivered.toLocaleString()} delivered</div>
            </div>

            <div class="metric-card warning">
                <div class="metric-header">
                    <div class="metric-icon warning">👆</div>
                    <div class="metric-trend up">
                        ↗️ +15.7%
                    </div>
                </div>
                <div class="metric-value">${clickRate}%</div>
                <div class="metric-label">Click-through Rate</div>
                <div class="metric-details">${totalClicks.toLocaleString()} clicks</div>
            </div>

            <div class="metric-card success">
                <div class="metric-header">
                    <div class="metric-icon success">💰</div>
                    <div class="metric-trend up">
                        ↗️ +22.1%
                    </div>
                </div>
                <div class="metric-value">$${(totalSent * 0.05).toFixed(0)}</div>
                <div class="metric-label">Total Spend</div>
                <div class="metric-details">$0.05 per SMS</div>
            </div>
        `;
    }

    renderCharts() {
        this.renderDailyChart();
        this.renderCampaignChart();
    }

    renderDailyChart() {
        const chartContainer = document.getElementById('dailyChart');
        if (!chartContainer) return;

        const maxValue = Math.max(...this.data.dailyStats.map(d => d.sent));
        
        chartContainer.innerHTML = `
            <div class="chart-header">
                <h3 class="chart-title">Daily Performance</h3>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: #3b82f6;"></div>
                        <span>Messages Sent</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #10b981;"></div>
                        <span>Delivered</span>
                    </div>
                </div>
            </div>
            <div class="bar-chart">
                ${this.data.dailyStats.map(day => `
                    <div class="bar" style="height: ${(day.sent / maxValue) * 100}%;">
                        <div class="bar-value">${day.sent}</div>
                        <div class="bar-label">${new Date(day.date).toLocaleDateString('en', {weekday: 'short'})}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCampaignChart() {
        const chartContainer = document.getElementById('campaignChart');
        if (!chartContainer) return;

        const maxClicks = Math.max(...this.data.campaigns.map(c => c.clicks));
        
        chartContainer.innerHTML = `
            <div class="chart-header">
                <h3 class="chart-title">Campaign Performance</h3>
                <div class="export-controls">
                    <button class="export-btn" onclick="analyticsManager.exportChart('campaign')">📊 Export</button>
                </div>
            </div>
            <div class="bar-chart">
                ${this.data.campaigns.map(campaign => `
                    <div class="bar" style="height: ${(campaign.clicks / maxClicks) * 100}%; background: #10b981;">
                        <div class="bar-value">${campaign.clicks}</div>
                        <div class="bar-label">${campaign.name.split(' ')[0]}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderPerformanceTable() {
        const tableContainer = document.getElementById('performanceTable');
        if (!tableContainer) return;

        tableContainer.innerHTML = `
            <div class="table-header">
                <h3 style="margin: 0;">Campaign Performance</h3>
                <div class="export-controls">
                    <button class="export-btn" onclick="analyticsManager.exportTable()">📤 Export CSV</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Campaign</th>
                        <th>Sent</th>
                        <th>Delivered</th>
                        <th>Failed</th>
                        <th>Clicks</th>
                        <th>CTR</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.campaigns.map(campaign => {
                        const ctr = ((campaign.clicks / campaign.delivered) * 100).toFixed(1);
                        const status = campaign.failed > campaign.sent * 0.1 ? 'failed' : 'delivered';
                        
                        return `
                            <tr>
                                <td style="font-weight: 500;">${campaign.name}</td>
                                <td>${campaign.sent.toLocaleString()}</td>
                                <td>${campaign.delivered.toLocaleString()}</td>
                                <td>${campaign.failed}</td>
                                <td>${campaign.clicks}</td>
                                <td>${ctr}%</td>
                                <td>
                                    <div class="status-indicator ${status}">
                                        <div class="status-dot"></div>
                                        ${status === 'delivered' ? 'Completed' : 'Issues'}
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    attachEventListeners() {
        // Date range filter
        document.addEventListener('change', (e) => {
            if (e.target.id === 'dateRangeSelect') {
                this.dateRange = e.target.value;
                this.updateDashboard();
            }
        });

        // Real-time toggle
        document.addEventListener('click', (e) => {
            if (e.target.id === 'toggleRealtime') {
                this.toggleRealTimeUpdates();
            }
        });
    }

    updateDashboard() {
        // Simulate data update based on date range
        this.data = this.generateSampleData();
        this.renderMetrics();
        this.renderCharts();
        this.renderPerformanceTable();
        
        showToast(`Dashboard updated for ${this.dateRange}`, 'info');
    }

    startRealTimeUpdates() {
        const indicator = document.getElementById('realtimeIndicator');
        if (indicator) {
            indicator.style.display = 'flex';
        }

        this.updateInterval = setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 5000);
    }

    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        const indicator = document.getElementById('realtimeIndicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    toggleRealTimeUpdates() {
        if (this.updateInterval) {
            this.stopRealTimeUpdates();
            showToast('Real-time updates disabled', 'info');
        } else {
            this.startRealTimeUpdates();
            showToast('Real-time updates enabled', 'success');
        }
    }

    simulateRealTimeUpdate() {
        // Simulate small changes in metrics
        const randomCampaign = this.data.campaigns[Math.floor(Math.random() * this.data.campaigns.length)];
        const increment = Math.floor(Math.random() * 5) + 1;
        
        randomCampaign.delivered += increment;
        randomCampaign.clicks += Math.floor(increment * 0.3);
        
        // Update only metrics to show real-time changes
        this.renderMetrics();
        
        // Show subtle notification
        const indicator = document.getElementById('realtimeIndicator');
        if (indicator) {
            indicator.style.background = '#dcfce7';
            setTimeout(() => {
                indicator.style.background = '#f0fdf4';
            }, 1000);
        }
    }

    exportChart(type) {
        const data = type === 'campaign' ? this.data.campaigns : this.data.dailyStats;
        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, `${type}-chart-data.csv`);
        showToast('Chart data exported!', 'success');
    }

    exportTable() {
        const csv = this.convertToCSV(this.data.campaigns);
        this.downloadCSV(csv, 'campaign-performance.csv');
        showToast('Table exported!', 'success');
    }

    convertToCSV(data) {
        if (!data.length) return '';
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');
        
        return csvContent;
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    showCampaignDetails(campaignId) {
        const campaign = this.data.campaigns.find(c => c.id === campaignId);
        if (!campaign) return;

        showModal({
            title: `${campaign.name} - Detailed Analytics`,
            size: 'large',
            content: `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
                    <div class="metric-card">
                        <div class="metric-value">${campaign.sent.toLocaleString()}</div>
                        <div class="metric-label">Messages Sent</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${((campaign.delivered / campaign.sent) * 100).toFixed(1)}%</div>
                        <div class="metric-label">Delivery Rate</div>
                    </div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                    <h4>Campaign Timeline</h4>
                    <p>Created: ${new Date(campaign.date).toLocaleDateString()}</p>
                    <p>Status: Completed</p>
                    <p>Total Cost: $${(campaign.sent * 0.05).toFixed(2)}</p>
                </div>
            `,
            buttons: [
                { text: 'Close', class: 'btn-secondary' },
                { text: 'Export Details', class: 'btn-primary', onclick: `analyticsManager.exportCampaignDetails('${campaignId}')` }
            ]
        });
    }

    exportCampaignDetails(campaignId) {
        const campaign = this.data.campaigns.find(c => c.id === campaignId);
        const details = {
            campaign,
            exportedAt: new Date().toISOString(),
            summary: {
                deliveryRate: ((campaign.delivered / campaign.sent) * 100).toFixed(1),
                clickRate: ((campaign.clicks / campaign.delivered) * 100).toFixed(1),
                totalCost: (campaign.sent * 0.05).toFixed(2)
            }
        };
        
        const blob = new Blob([JSON.stringify(details, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${campaign.name.toLowerCase().replace(/\s+/g, '-')}-details.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        closeModal();
        showToast('Campaign details exported!', 'success');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsManager = new AnalyticsManager();
});
