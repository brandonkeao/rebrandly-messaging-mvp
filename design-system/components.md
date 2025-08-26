# Component System

## Button Components

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
```

### Secondary Button
```css
.btn-secondary {
  background: white;
  color: #667eea;
  border: 1px solid #e2e8f0;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #667eea;
  background: #f8fafc;
}
```

### Button Sizes
- **Small**: `padding: 8px 16px; font-size: 12px;`
- **Regular**: `padding: 12px 24px; font-size: 14px;`
- **Large**: `padding: 16px 32px; font-size: 16px;`

## Card Components

### Base Card
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

### Card Header
```css
.card-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}
```

### Card Actions
```css
.card-actions {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
  margin-top: 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

## Form Components

### Form Group
```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 8px;
}
```

### Input Fields
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2c3e50;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
}
```

### Textarea
```css
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2c3e50;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}
```

### Select Dropdown
```css
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2c3e50;
  background: white;
  cursor: pointer;
}
```

## Navigation Components

### Sidebar Navigation
```css
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 24px 0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 0 12px;
  border-radius: 8px;
}

.nav-item:hover {
  background: #f8fafc;
  color: #2c3e50;
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-icon {
  margin-right: 12px;
  font-size: 16px;
}
```

### Progress Steps
```css
.progress-container {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 24px;
}

.progress-step {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}

.step-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  background: #e2e8f0;
  color: #64748b;
  z-index: 2;
}

.step-indicator.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.step-indicator.completed {
  background: #10b981;
  color: white;
}
```

## Message Components

### Message Bubble
```css
.message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
  border-radius: 16px 16px 4px 16px;
  margin-bottom: 16px;
  max-width: 280px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}
```

### Message Preview
```css
.message-preview {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-top: 16px;
}

.preview-label {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}
```

## Upload Components

### Upload Area
```css
.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  background: #fafbfc;
  transition: all 0.2s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.upload-area.dragover {
  border-color: #667eea;
  background: #f0f4ff;
}

.upload-icon {
  font-size: 48px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.upload-subtext {
  font-size: 14px;
  color: #64748b;
}
```

## Status Components

### Status Badge
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
}

.status-badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.error {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.info {
  background: #dbeafe;
  color: #1e40af;
}
```

## Loading Components

### Spinner
```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Loading Button
```css
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

## Usage Guidelines

### Component Composition
- Use consistent spacing between components
- Maintain visual hierarchy through size and color
- Ensure components work well together

### State Management
- Provide clear visual feedback for all interactive states
- Use consistent hover and focus effects
- Implement loading states for async operations

### Accessibility
- Ensure all components meet WCAG AA standards
- Provide proper focus management
- Include appropriate ARIA labels and roles
