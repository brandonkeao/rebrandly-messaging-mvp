# Responsive Design Guidelines

## Breakpoint System

### Breakpoint Definitions
```css
/* Mobile First Approach */
:root {
  --breakpoint-sm: 640px;   /* Small devices */
  --breakpoint-md: 768px;   /* Medium devices (tablets) */
  --breakpoint-lg: 1024px;  /* Large devices (desktops) */
  --breakpoint-xl: 1200px;  /* Extra large devices */
}
```

### Media Query Usage
```css
/* Mobile (default) */
/* Base styles apply to all screen sizes */

/* Small devices and up */
@media (min-width: 640px) {
  /* Small device styles */
}

/* Medium devices and up */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Large devices and up */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Extra large devices and up */
@media (min-width: 1200px) {
  /* Large desktop styles */
}
```

## Layout Adaptations

### Sidebar Navigation
```css
/* Mobile: Hidden sidebar, hamburger menu */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -240px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
  
  .mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .hamburger-menu {
    display: block;
  }
}

/* Desktop: Fixed sidebar */
@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 240px;
    height: 100vh;
  }
  
  .main-content {
    margin-left: 240px;
    padding: 32px;
  }
  
  .mobile-header {
    display: none;
  }
  
  .hamburger-menu {
    display: none;
  }
}
```

### Card Layouts
```css
/* Mobile: Single column */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}

/* Tablet: Two columns */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 24px;
  }
}

/* Desktop: Three columns */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 32px;
  }
}

/* Large desktop: Four columns */
@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Form Layouts
```css
/* Mobile: Stacked form */
.form-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  width: 100%;
}

/* Tablet and up: Side-by-side forms */
@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
    gap: 24px;
  }
  
  .form-group {
    flex: 1;
  }
  
  .form-group.full-width {
    width: 100%;
  }
}
```

## Typography Scaling

### Responsive Font Sizes
```css
/* Mobile typography */
.heading-1 {
  font-size: 18px;
  line-height: 1.2;
}

.heading-2 {
  font-size: 16px;
  line-height: 1.3;
}

.body-text {
  font-size: 14px;
  line-height: 1.5;
}

/* Tablet and up */
@media (min-width: 768px) {
  .heading-1 {
    font-size: 20px;
  }
  
  .heading-2 {
    font-size: 18px;
  }
  
  .body-text {
    font-size: 14px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .heading-1 {
    font-size: 24px;
  }
  
  .heading-2 {
    font-size: 20px;
  }
}
```

## Component Adaptations

### Button Responsive Behavior
```css
/* Mobile: Full width buttons */
.btn-responsive {
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
}

/* Tablet and up: Auto width buttons */
@media (min-width: 768px) {
  .btn-responsive {
    width: auto;
    padding: 12px 24px;
    font-size: 14px;
  }
}
```

### Table Responsive Behavior
```css
/* Mobile: Card-style table */
@media (max-width: 767px) {
  .responsive-table {
    display: block;
  }
  
  .responsive-table thead {
    display: none;
  }
  
  .responsive-table tbody,
  .responsive-table tr,
  .responsive-table td {
    display: block;
  }
  
  .responsive-table tr {
    background: white;
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .responsive-table td {
    border: none;
    padding: 8px 0;
    position: relative;
    padding-left: 120px;
  }
  
  .responsive-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 110px;
    font-weight: 500;
    color: #64748b;
  }
}

/* Desktop: Standard table */
@media (min-width: 768px) {
  .responsive-table {
    display: table;
    width: 100%;
  }
  
  .responsive-table td:before {
    display: none;
  }
}
```

### Navigation Adaptations
```css
/* Mobile: Bottom navigation */
@media (max-width: 767px) {
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
    z-index: 100;
  }
  
  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    color: #64748b;
    text-decoration: none;
    font-size: 12px;
  }
  
  .bottom-nav-item.active {
    color: #667eea;
  }
  
  .bottom-nav-icon {
    font-size: 20px;
    margin-bottom: 4px;
  }
  
  /* Add bottom padding to main content */
  .main-content {
    padding-bottom: 80px;
  }
}

/* Desktop: Hide bottom navigation */
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

## Touch and Interaction

### Touch Target Sizes
```css
/* Ensure minimum 44px touch targets on mobile */
@media (max-width: 767px) {
  .btn,
  .nav-item,
  .form-input,
  .clickable {
    min-height: 44px;
    min-width: 44px;
  }
  
  .btn {
    padding: 14px 20px;
  }
  
  .nav-item {
    padding: 14px 24px;
  }
}
```

### Hover States
```css
/* Only apply hover states on devices that support hover */
@media (hover: hover) {
  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  .card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  .nav-item:hover {
    background: #f8fafc;
  }
}

/* Remove hover effects on touch devices */
@media (hover: none) {
  .btn:hover,
  .card:hover,
  .nav-item:hover {
    transform: none;
    box-shadow: none;
    background: none;
  }
}
```

## Performance Optimizations

### Image Responsive Behavior
```css
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
}

/* Use different image sizes for different breakpoints */
@media (max-width: 767px) {
  .hero-image {
    content: url('hero-mobile.jpg');
  }
}

@media (min-width: 768px) {
  .hero-image {
    content: url('hero-desktop.jpg');
  }
}
```

### Container Queries (Future)
```css
/* When container queries are widely supported */
@container (max-width: 400px) {
  .card {
    padding: 16px;
  }
  
  .card-title {
    font-size: 16px;
  }
}

@container (min-width: 401px) {
  .card {
    padding: 24px;
  }
  
  .card-title {
    font-size: 18px;
  }
}
```

## Testing Guidelines

### Responsive Testing Checklist
- [ ] Test on actual devices, not just browser dev tools
- [ ] Verify touch targets are at least 44px on mobile
- [ ] Check text readability at all screen sizes
- [ ] Ensure horizontal scrolling is not required
- [ ] Test form usability on mobile devices
- [ ] Verify navigation works on all screen sizes
- [ ] Check loading performance on slower connections
- [ ] Test with different orientations (portrait/landscape)

### Common Breakpoints to Test
- **320px**: Small mobile devices
- **375px**: iPhone standard size
- **414px**: iPhone Plus size
- **768px**: iPad portrait
- **1024px**: iPad landscape / small desktop
- **1200px**: Standard desktop
- **1440px**: Large desktop

## Accessibility Considerations

### Mobile Accessibility
```css
/* Ensure sufficient spacing for motor impairments */
@media (max-width: 767px) {
  .interactive-element {
    margin: 8px 0;
    min-height: 44px;
  }
  
  /* Larger text for better readability */
  .body-text {
    font-size: 16px;
    line-height: 1.6;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .btn-primary {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 1px solid currentColor;
  }
}
```

## Usage Best Practices

### Mobile-First Approach
1. Start with mobile styles as the base
2. Use `min-width` media queries to enhance for larger screens
3. Focus on essential content and functionality first
4. Progressive enhancement for desktop features

### Performance Considerations
1. Minimize layout shifts during responsive changes
2. Use efficient CSS selectors and avoid complex calculations
3. Optimize images for different screen densities
4. Consider loading different resources based on screen size

### Content Strategy
1. Prioritize content hierarchy for mobile users
2. Consider different interaction patterns for touch vs. mouse
3. Ensure all functionality is accessible on all devices
4. Test with real content, not just placeholder text
