# Website Design System Implementation Prompt

## Context
You are tasked with implementing a comprehensive design system based on the Rebrandly website design into a web application prototype. The design system includes specific semantic colors, typography, spacing, and component styling that needs to be adapted from a marketing website context to a functional web application interface.

## Design System Analysis

### Semantic Color System (from Semantic colors.png)

#### Text Colors
- **text-primary**: `#000000` - Primary headings and important text
- **text-secondary**: `#2F3437` - Secondary text and descriptions  
- **on-dark**: `#FFFFFF` - Text on dark backgrounds
- **text-blue**: `#1F68F9` - Blue accent text for links and highlights
- **text-blue-on-dark**: `#80AAFF` - Blue text on dark backgrounds
- **text-yellow**: `#FFBC00` - Yellow accent text for warnings/highlights

#### Background Colors
- **bg-white**: `#FFFFFF` - Primary white background
- **bg-beige-01**: `#F5F1F0` - Light beige background
- **bg-beige-02**: `#E0D5D2` - Medium beige background
- **bg-blue-01**: `#E5EEFF` - Light blue background
- **bg-blue-02**: `#CCDEFF` - Medium blue background
- **bg-blue-03**: `#80AAFF` - Darker blue background
- **bg-blue-04**: `#1F68F9` - Primary blue background
- **bg-teal-01**: `#DBF0F0` - Light teal background
- **bg-yellow-01**: `#FFF1CC` - Light yellow background
- **bg-charcoal-01**: `#F1F2F3` - Light charcoal background
- **bg-charcoal-02**: `#E3E5E8` - Medium charcoal background
- **bg-charcoal-03**: `#2F3437` - Dark charcoal background

#### Button Colors
- **btn-yellow**: `#FFBC00` - Primary yellow CTA button
- **btn-charcoal**: `#232729` - Dark secondary button
- **btn-white**: `#FFFFFF` - White button on dark backgrounds
- **btn-blue-01**: `#1F68F9` - Primary blue button
- **btn-blue-02**: `#012B7E` - Dark blue button
- **btn-purple**: `#A248EA` - Purple accent button
- **btn-pink**: `#E83095` - Pink accent button
- **btn-teal**: `#3A928D` - Teal accent button

#### Border Colors
- **border-btn**: `#232729` - Button borders
- **border-charcoal**: `#BAC0C4` - Charcoal borders
- **border-blue**: `#B2CCFF` - Blue borders
- **border-teal**: `#A3DBD8` - Teal borders
- **border-yellow**: `#FFDEB0` - Yellow borders

### Website Design Analysis (from Final.png)

#### Key Design Elements
1. **Hero Section**: Large typography with yellow CTA button, clean white background
2. **Brand Logos Section**: Trusted partner logos in grayscale
3. **Feature Cards**: Clean white cards with colored accent elements
4. **Statistics Section**: Dark background with large yellow numbers
5. **Testimonial Section**: Light background with profile image and quote
6. **Footer**: Dark charcoal background with organized link sections

#### Typography Hierarchy
- **Hero Headlines**: Large, bold typography (likely 48px+)
- **Section Headlines**: Medium bold typography (likely 32px)
- **Card Titles**: Smaller bold typography (likely 20px)
- **Body Text**: Regular weight, good readability
- **Accent Text**: Yellow highlights for important information

#### Layout Patterns
- **Full-width sections** with contained content
- **Card-based layouts** for features and content
- **Generous white space** for breathing room
- **Centered content** with max-width containers
- **Consistent vertical rhythm** between sections

## Implementation Instructions

### Phase 1: Update Color System

1. **Replace current color variables** with the semantic color system:
```css
:root {
  /* Text Colors */
  --color-text-primary: #000000;
  --color-text-secondary: #2F3437;
  --color-text-on-dark: #FFFFFF;
  --color-text-blue: #1F68F9;
  --color-text-blue-on-dark: #80AAFF;
  --color-text-yellow: #FFBC00;
  
  /* Background Colors */
  --color-bg-white: #FFFFFF;
  --color-bg-beige-01: #F5F1F0;
  --color-bg-beige-02: #E0D5D2;
  --color-bg-blue-01: #E5EEFF;
  --color-bg-blue-02: #CCDEFF;
  --color-bg-blue-03: #80AAFF;
  --color-bg-blue-04: #1F68F9;
  --color-bg-teal-01: #DBF0F0;
  --color-bg-yellow-01: #FFF1CC;
  --color-bg-charcoal-01: #F1F2F3;
  --color-bg-charcoal-02: #E3E5E8;
  --color-bg-charcoal-03: #2F3437;
  
  /* Button Colors */
  --color-btn-yellow: #FFBC00;
  --color-btn-charcoal: #232729;
  --color-btn-white: #FFFFFF;
  --color-btn-blue-01: #1F68F9;
  --color-btn-blue-02: #012B7E;
  --color-btn-purple: #A248EA;
  --color-btn-pink: #E83095;
  --color-btn-teal: #3A928D;
  
  /* Border Colors */
  --color-border-btn: #232729;
  --color-border-charcoal: #BAC0C4;
  --color-border-blue: #B2CCFF;
  --color-border-teal: #A3DBD8;
  --color-border-yellow: #FFDEB0;
}
```

2. **Update semantic mappings** for web app context:
```css
/* App-specific semantic mappings */
--color-primary: var(--color-btn-blue-01);
--color-primary-hover: var(--color-btn-blue-02);
--color-accent: var(--color-btn-yellow);
--color-success: var(--color-btn-teal);
--color-warning: var(--color-text-yellow);
--color-error: var(--color-btn-pink);
--color-surface: var(--color-bg-white);
--color-background: var(--color-bg-charcoal-01);
```

### Phase 2: Update Typography System

1. **Implement website typography hierarchy**:
```css
/* Typography scale matching website design */
--font-size-hero: 48px;
--font-size-section-title: 32px;
--font-size-card-title: 20px;
--font-size-body: 16px;
--font-size-small: 14px;

/* Font weights */
--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-medium: 500;
--font-weight-regular: 400;
```

2. **Create typography classes**:
```css
.hero-title {
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1.1;
}

.section-title {
  font-size: var(--font-size-section-title);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.card-title {
  font-size: var(--font-size-card-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.3;
}
```

### Phase 3: Update Button System

1. **Implement website button styles**:
```css
.btn-primary {
  background: var(--color-btn-yellow);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-btn);
  font-weight: var(--font-weight-semibold);
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #E6A600; /* Darker yellow */
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-btn-charcoal);
  color: var(--color-text-on-dark);
  border: 2px solid var(--color-btn-charcoal);
}

.btn-blue {
  background: var(--color-btn-blue-01);
  color: var(--color-text-on-dark);
  border: 2px solid var(--color-btn-blue-01);
}
```

### Phase 4: Update Layout and Spacing

1. **Implement website layout patterns**:
```css
/* Section spacing matching website */
.section {
  padding: 80px 0;
}

.section-hero {
  padding: 120px 0;
  background: var(--color-bg-white);
}

.section-dark {
  background: var(--color-bg-charcoal-03);
  color: var(--color-text-on-dark);
}

.section-light {
  background: var(--color-bg-charcoal-01);
}
```

2. **Create card system matching website**:
```css
.feature-card {
  background: var(--color-bg-white);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-charcoal);
}

.feature-card-icon {
  width: 48px;
  height: 48px;
  background: var(--color-bg-blue-01);
  border-radius: 12px;
  margin-bottom: 16px;
}
```

### Phase 5: Adapt for Web Application Context

1. **Create app-specific components** using website design language:
```css
/* Navigation using website colors */
.app-nav {
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border-charcoal);
}

.nav-item.active {
  background: var(--color-bg-blue-01);
  color: var(--color-text-blue);
}

/* Data tables using website styling */
.data-table {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border-charcoal);
  border-radius: 12px;
}

.data-table th {
  background: var(--color-bg-charcoal-01);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
}

/* Form elements using website styling */
.form-input {
  border: 2px solid var(--color-border-charcoal);
  border-radius: 8px;
  padding: 12px 16px;
}

.form-input:focus {
  border-color: var(--color-btn-blue-01);
  box-shadow: 0 0 0 3px var(--color-bg-blue-01);
}
```

2. **Create status indicators** using semantic colors:
```css
.status-success {
  background: var(--color-bg-teal-01);
  color: var(--color-btn-teal);
  border: 1px solid var(--color-border-teal);
}

.status-warning {
  background: var(--color-bg-yellow-01);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-yellow);
}

.status-error {
  background: #FEE2E2;
  color: var(--color-btn-pink);
  border: 1px solid #FECACA;
}
```

### Phase 6: Responsive Adaptations

1. **Ensure mobile-first responsive design**:
```css
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .section {
    padding: 40px 0;
  }
  
  .feature-card {
    padding: 24px;
  }
}
```

## Implementation Priority

### High Priority (Immediate Impact)
1. **Color system update** - Replace all color variables
2. **Button styling** - Update primary CTA to yellow
3. **Typography hierarchy** - Implement website font sizes
4. **Card components** - Match website card styling

### Medium Priority (Visual Polish)
1. **Layout spacing** - Match website section spacing
2. **Form styling** - Update input and form elements
3. **Navigation styling** - Apply website navigation patterns
4. **Status indicators** - Implement semantic color usage

### Low Priority (Enhancement)
1. **Animations and transitions** - Add subtle interactions
2. **Advanced components** - Complex layouts and patterns
3. **Dark mode variants** - Using charcoal backgrounds
4. **Accessibility enhancements** - Ensure WCAG compliance

## Success Criteria

### Visual Alignment
- [ ] Color palette matches semantic color system exactly
- [ ] Typography hierarchy reflects website design
- [ ] Button styling uses yellow primary CTA
- [ ] Card components match website styling
- [ ] Spacing and layout feel consistent with website

### Functional Requirements
- [ ] All interactive elements work properly
- [ ] Responsive design maintains usability
- [ ] Accessibility standards are maintained
- [ ] Performance is not negatively impacted
- [ ] Existing functionality is preserved

### Brand Consistency
- [ ] Professional appearance suitable for SaaS application
- [ ] Consistent with Rebrandly brand identity
- [ ] Modern, clean aesthetic throughout
- [ ] Appropriate contrast ratios for readability

## Testing Checklist

1. **Cross-browser compatibility** - Test in Chrome, Firefox, Safari, Edge
2. **Responsive behavior** - Test on mobile, tablet, desktop
3. **Accessibility** - Test with screen readers and keyboard navigation
4. **Performance** - Ensure no significant performance degradation
5. **User experience** - Verify all user flows still work correctly

## Notes

- Maintain backward compatibility where possible
- Document any breaking changes
- Create migration guide for future updates
- Consider creating a style guide/component library
- Test thoroughly before deploying to production

---

**Created**: August 27, 2024  
**Version**: 1.0  
**Based on**: Rebrandly website design system analysis
