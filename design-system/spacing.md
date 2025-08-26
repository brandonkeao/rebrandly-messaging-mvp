# Spacing System

## Base Unit

### Foundation
- **Base Unit**: `8px`
- **Rationale**: 8px provides a consistent, scalable foundation that works well across different screen densities and creates harmonious layouts

## Spacing Scale

### Standard Scale
- **XS**: `8px` (1 unit)
- **SM**: `16px` (2 units)
- **MD**: `24px` (3 units)
- **LG**: `32px` (4 units)
- **XL**: `48px` (6 units)
- **XXL**: `64px` (8 units)

### Usage Guidelines

#### XS - 8px
- **Usage**: Tight spacing, small gaps
- **Examples**: 
  - Icon to text spacing
  - Small button padding
  - Form field internal spacing

#### SM - 16px
- **Usage**: Standard component spacing
- **Examples**:
  - Button padding (horizontal)
  - Form field margins
  - Card internal padding
  - List item spacing

#### MD - 24px
- **Usage**: Section spacing, comfortable gaps
- **Examples**:
  - Card padding
  - Section margins
  - Component separation
  - Form group spacing

#### LG - 32px
- **Usage**: Large section separation
- **Examples**:
  - Page section margins
  - Major component separation
  - Content area padding

#### XL - 48px
- **Usage**: Major layout spacing
- **Examples**:
  - Page margins
  - Major section separation
  - Hero section padding

#### XXL - 64px
- **Usage**: Maximum spacing for emphasis
- **Examples**:
  - Page header spacing
  - Major layout breaks
  - Emphasis spacing

## Layout Spacing

### Container Spacing
```css
.container {
  padding: 32px; /* LG */
}

@media (max-width: 768px) {
  .container {
    padding: 16px; /* SM on mobile */
  }
}
```

### Card Spacing
```css
.card {
  padding: 24px; /* MD */
  margin-bottom: 24px; /* MD */
}
```

### Form Spacing
```css
.form-group {
  margin-bottom: 24px; /* MD */
}

.form-label {
  margin-bottom: 8px; /* XS */
}

.form-input {
  padding: 12px 16px; /* Custom + SM */
}
```

### Button Spacing
```css
.btn {
  padding: 12px 24px; /* Custom vertical + MD horizontal */
}

.btn-sm {
  padding: 8px 16px; /* XS vertical + SM horizontal */
}

.btn-lg {
  padding: 16px 32px; /* SM vertical + LG horizontal */
}
```

## Component-Specific Spacing

### Navigation
- **Sidebar width**: `240px`
- **Nav item padding**: `16px` (SM)
- **Nav item spacing**: `8px` (XS)
- **Icon to text**: `12px` (custom)

### Progress Steps
- **Step spacing**: `24px` (MD)
- **Step indicator size**: `32px` (LG)
- **Step content padding**: `16px` (SM)

### Message Bubble
- **Internal padding**: `16px` (SM)
- **Margin bottom**: `16px` (SM)
- **Border radius**: `16px` (SM)

### Upload Area
- **Padding**: `48px 24px` (XL vertical, MD horizontal)
- **Border spacing**: `2px`
- **Icon to text**: `16px` (SM)

## Responsive Spacing

### Mobile Adjustments
```css
/* Reduce spacing on mobile */
@media (max-width: 768px) {
  .container { padding: 16px; }
  .card { padding: 16px; }
  .form-group { margin-bottom: 16px; }
}

/* Increase spacing on large screens */
@media (min-width: 1200px) {
  .container { padding: 48px; }
  .section { margin-bottom: 64px; }
}
```

### Breakpoint-Specific Spacing
- **Mobile** (`< 768px`): Reduce spacing by 25-50%
- **Tablet** (`768px - 1024px`): Standard spacing
- **Desktop** (`> 1024px`): Standard or slightly increased spacing

## Grid System

### Layout Grid
- **Sidebar**: `240px` fixed width
- **Main content**: `calc(100% - 240px)` flexible width
- **Content max-width**: `1200px`
- **Gutter**: `24px` (MD)

### Responsive Grid
```css
.layout {
  display: flex;
  gap: 24px; /* MD */
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    gap: 16px; /* SM */
  }
}
```

## Usage Best Practices

### Consistency
- Always use values from the spacing scale
- Avoid arbitrary spacing values
- Maintain consistent spacing patterns across similar components

### Visual Rhythm
- Use consistent spacing to create visual rhythm
- Group related elements with smaller spacing
- Separate unrelated elements with larger spacing

### Accessibility
- Ensure sufficient spacing for touch targets (minimum 44px)
- Provide adequate spacing for screen reader navigation
- Consider spacing needs for users with motor impairments

### Performance
- Use CSS custom properties for spacing values
- Leverage consistent spacing for easier maintenance
- Consider spacing impact on layout shifts
