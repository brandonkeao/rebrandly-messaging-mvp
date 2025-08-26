# Layout System

## Grid System

### Main Layout Structure
```css
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #e2e8f0;
}

.main-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}
```

### Responsive Layout
```css
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .main-content {
    padding: 16px;
  }
}
```

## Container System

### Content Containers
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.container-fluid {
  width: 100%;
  padding: 0 24px;
}

.container-narrow {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### View Containers
```css
.view {
  width: 100%;
  max-width: 100%;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Flexbox Utilities

### Flex Containers
```css
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-nowrap {
  flex-wrap: nowrap;
}
```

### Flex Items
```css
.flex-1 {
  flex: 1;
}

.flex-auto {
  flex: auto;
}

.flex-none {
  flex: none;
}

.flex-shrink-0 {
  flex-shrink: 0;
}
```

### Alignment
```css
.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}
```

## Grid Utilities

### CSS Grid
```css
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.gap-4 {
  gap: 16px;
}

.gap-6 {
  gap: 24px;
}

.gap-8 {
  gap: 32px;
}
```

### Responsive Grid
```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-responsive {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

## Spacing Utilities

### Margin
```css
.m-0 { margin: 0; }
.m-1 { margin: 8px; }
.m-2 { margin: 16px; }
.m-3 { margin: 24px; }
.m-4 { margin: 32px; }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 32px; }

.ml-0 { margin-left: 0; }
.ml-1 { margin-left: 8px; }
.ml-2 { margin-left: 16px; }
.ml-3 { margin-left: 24px; }
.ml-4 { margin-left: 32px; }

.mr-0 { margin-right: 0; }
.mr-1 { margin-right: 8px; }
.mr-2 { margin-right: 16px; }
.mr-3 { margin-right: 24px; }
.mr-4 { margin-right: 32px; }
```

### Padding
```css
.p-0 { padding: 0; }
.p-1 { padding: 8px; }
.p-2 { padding: 16px; }
.p-3 { padding: 24px; }
.p-4 { padding: 32px; }

.pt-0 { padding-top: 0; }
.pt-1 { padding-top: 8px; }
.pt-2 { padding-top: 16px; }
.pt-3 { padding-top: 24px; }
.pt-4 { padding-top: 32px; }

.pb-0 { padding-bottom: 0; }
.pb-1 { padding-bottom: 8px; }
.pb-2 { padding-bottom: 16px; }
.pb-3 { padding-bottom: 24px; }
.pb-4 { padding-bottom: 32px; }

.pl-0 { padding-left: 0; }
.pl-1 { padding-left: 8px; }
.pl-2 { padding-left: 16px; }
.pl-3 { padding-left: 24px; }
.pl-4 { padding-left: 32px; }

.pr-0 { padding-right: 0; }
.pr-1 { padding-right: 8px; }
.pr-2 { padding-right: 16px; }
.pr-3 { padding-right: 24px; }
.pr-4 { padding-right: 32px; }
```

## Positioning

### Position Utilities
```css
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.sticky {
  position: sticky;
}
```

### Z-Index
```css
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
```

## Display Utilities

### Display Types
```css
.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.inline {
  display: inline;
}

.hidden {
  display: none;
}
```

### Visibility
```css
.visible {
  visibility: visible;
}

.invisible {
  visibility: hidden;
}
```

## Overflow

### Overflow Control
```css
.overflow-auto {
  overflow: auto;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-scroll {
  overflow: scroll;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-y-auto {
  overflow-y: auto;
}
```

## Responsive Breakpoints

### Breakpoint System
```css
/* Mobile First Approach */
/* Base styles: Mobile (0px and up) */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1200px) {
  /* Large desktop styles */
}
```

### Responsive Utilities
```css
/* Hide on mobile */
@media (max-width: 767px) {
  .hidden-mobile {
    display: none;
  }
}

/* Hide on tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .hidden-tablet {
    display: none;
  }
}

/* Hide on desktop */
@media (min-width: 1024px) {
  .hidden-desktop {
    display: none;
  }
}

/* Show only on mobile */
@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

/* Show only on desktop */
@media (max-width: 1023px) {
  .desktop-only {
    display: none;
  }
}
```

## Layout Patterns

### Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
}
```

### Two Column Layout
```css
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

### Sidebar Layout
```css
.sidebar-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .sidebar-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
```

## Usage Guidelines

### Layout Principles
- Use consistent spacing throughout the application
- Maintain visual hierarchy through proper layout structure
- Ensure responsive behavior across all screen sizes
- Optimize for both desktop and mobile experiences

### Performance Considerations
- Use CSS Grid and Flexbox for modern layout solutions
- Minimize layout shifts during loading
- Optimize for smooth scrolling and interactions
- Consider container queries for component-based responsive design

### Accessibility
- Ensure proper focus management in layout changes
- Maintain logical tab order across layout structures
- Provide sufficient spacing for touch targets on mobile
- Consider reduced motion preferences for animations
