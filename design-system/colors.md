# Color System v2.0

## Overview

Updated color palette aligned with modern design system standards, featuring improved accessibility, better contrast ratios, and a comprehensive color scale system.

## Primary Colors

### Brand Primary - Indigo Palette
- **Primary 500**: `#6366f1` (Main primary color)
- **Primary 600**: `#5b5ce6` (Hover states)
- **Primary 700**: `#4f46e5` (Active states)
- **Primary Gradient**: `linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)`
- **Usage**: Primary buttons, active states, brand elements, focus indicators

### Full Primary Scale
- **50**: `#f3f4ff` - Subtle backgrounds
- **100**: `#e8eaff` - Light backgrounds
- **200**: `#d4d8ff` - Borders, focus rings
- **300**: `#b4bbff` - Disabled states
- **400**: `#8b94ff` - Muted elements
- **500**: `#6366f1` - **Main primary**
- **600**: `#5b5ce6` - Hover states
- **700**: `#4f46e5` - Active states
- **800**: `#4338ca` - Dark variants
- **900**: `#3730a3` - Darkest variant

## Semantic Colors

### Success - Emerald Palette
- **Main**: `#10b981` (Success 500)
- **Subtle Background**: `#ecfdf5` (Success 50)
- **Border**: `#a7f3d0` (Success 200)
- **Text**: `#065f46` (Success 800)
- **Usage**: Success messages, completed states, positive actions

### Warning - Amber Palette
- **Main**: `#f59e0b` (Warning 500)
- **Subtle Background**: `#fffbeb` (Warning 50)
- **Border**: `#fde68a` (Warning 200)
- **Text**: `#92400e` (Warning 800)
- **Usage**: Warning messages, pending states, caution indicators

### Error - Red Palette
- **Main**: `#ef4444` (Error 500)
- **Subtle Background**: `#fef2f2` (Error 50)
- **Border**: `#fecaca` (Error 200)
- **Text**: `#991b1b` (Error 800)
- **Usage**: Error messages, destructive actions, validation errors

### Info - Blue Palette
- **Main**: `#3b82f6` (Info 500)
- **Subtle Background**: `#eff6ff` (Info 50)
- **Border**: `#bfdbfe` (Info 200)
- **Text**: `#1e40af` (Info 800)
- **Usage**: Information messages, neutral notifications

## Neutral Colors - Slate Palette

### Background Colors
- **Background**: `#f8fafc` (Neutral 50) - Main app background
- **Surface**: `#ffffff` (Neutral 0) - Cards, modals, elevated surfaces
- **Surface Subtle**: `#f8fafc` (Neutral 50) - Subtle backgrounds
- **Surface Muted**: `#f1f5f9` (Neutral 100) - Muted backgrounds

### Text Colors
- **Primary Text**: `#0f172a` (Neutral 900) - Headlines, primary content
- **Secondary Text**: `#475569` (Neutral 600) - Supporting text, descriptions
- **Muted Text**: `#64748b` (Neutral 500) - Metadata, subtle information
- **Subtle Text**: `#94a3b8` (Neutral 400) - Placeholder text, disabled states

### Border Colors
- **Border**: `#e2e8f0` (Neutral 200) - Default borders, dividers
- **Border Light**: `#f1f5f9` (Neutral 100) - Subtle borders
- **Border Muted**: `#cbd5e1` (Neutral 300) - Emphasized borders
- **Border Strong**: `#94a3b8` (Neutral 400) - Strong borders

### Full Neutral Scale
- **0**: `#ffffff` - Pure white
- **50**: `#f8fafc` - App background
- **100**: `#f1f5f9` - Subtle backgrounds
- **200**: `#e2e8f0` - Borders
- **300**: `#cbd5e1` - Strong borders
- **400**: `#94a3b8` - Muted text
- **500**: `#64748b` - Secondary text
- **600**: `#475569` - Primary text (light backgrounds)
- **700**: `#334155` - Strong text
- **800**: `#1e293b` - Very strong text
- **900**: `#0f172a` - Primary text
- **950**: `#020617` - Darkest variant

## Component-Specific Colors

### Button Colors
```css
/* Primary Button */
--color-button-primary-bg: var(--color-primary-500);
--color-button-primary-hover: var(--color-primary-600);
--color-button-primary-active: var(--color-primary-700);

/* Secondary Button */
--color-button-secondary-bg: var(--color-neutral-0);
--color-button-secondary-border: var(--color-neutral-300);
--color-button-secondary-hover: var(--color-neutral-50);
```

### Form Colors
```css
/* Input Fields */
--color-input-border: var(--color-neutral-300);
--color-input-border-focus: var(--color-primary-500);
--color-input-placeholder: var(--color-neutral-400);
```

### Navigation Colors
```css
/* Navigation */
--color-nav-item-text: var(--color-neutral-600);
--color-nav-item-hover: var(--color-neutral-100);
--color-nav-item-active-bg: var(--color-primary-gradient);
```

## Status Color Usage

### Success States
- **Background**: `var(--color-status-success-bg)` - Success 50
- **Border**: `var(--color-status-success-border)` - Success 200
- **Text**: `var(--color-status-success-text)` - Success 800

### Warning States
- **Background**: `var(--color-status-warning-bg)` - Warning 50
- **Border**: `var(--color-status-warning-border)` - Warning 200
- **Text**: `var(--color-status-warning-text)` - Warning 800

### Error States
- **Background**: `var(--color-status-error-bg)` - Error 50
- **Border**: `var(--color-status-error-border)` - Error 200
- **Text**: `var(--color-status-error-text)` - Error 800

## Accessibility Guidelines

### Contrast Ratios
- All color combinations meet WCAG AA standards (4.5:1 minimum)
- Text on colored backgrounds maintains proper contrast
- Interactive elements have sufficient color contrast in all states

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --color-text-primary: var(--color-neutral-950);
    --color-border: var(--color-neutral-400);
  }
}
```

### Color Usage Best Practices
- Use semantic colors only for their intended purposes
- Maintain consistent color usage across all components
- Don't rely solely on color to convey meaning
- Provide alternative indicators (icons, text) alongside color

## Migration from v1.0

### Updated Variables
- `--color-primary-start` → `--color-primary-500`
- `--color-primary-end` → `--color-primary-700`
- `--color-text-primary` → `--color-neutral-900`
- `--color-text-secondary` → `--color-neutral-600`
- `--color-background` → `--color-neutral-50`

### Legacy Compatibility
All v1.0 color variables are mapped to v2.0 equivalents for backward compatibility.

## Key Improvements in v2.0

### ✨ Enhanced Features
- **Full Color Scales**: 50-950 variants for all color families
- **Better Accessibility**: Improved contrast ratios and high contrast support
- **Modern Palette**: Updated to contemporary indigo-based primary colors
- **Component Tokens**: Specific color tokens for different UI components
- **Status Colors**: Comprehensive status color system with backgrounds, borders, and text
- **Semantic Mapping**: Clear semantic color usage guidelines

### 🎨 Visual Improvements
- More sophisticated neutral grays (slate-based)
- Better color harmony across the palette
- Improved readability and accessibility
- Modern, professional appearance suitable for SaaS applications

---

**Version**: 2.0  
**Last Updated**: August 27, 2024  
**Accessibility**: WCAG AA Compliant
