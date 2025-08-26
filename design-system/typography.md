# Typography System

## Font Family

### Primary Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

This system font stack provides:
- Native appearance on each platform
- Optimal performance (no web font loading)
- Excellent readability across all devices
- Consistent with modern web applications

## Font Sizes

### Base Size
- **Base**: `14px`
- **Usage**: Body text, form inputs, general content

### Scale System

#### Headers
- **H1**: `20px` - Page titles, main headings
- **H2**: `18px` - Section headings, card titles
- **H3**: `16px` - Subsection headings, component titles

#### Body Text
- **Large**: `16px` - Important body text, emphasized content
- **Regular**: `14px` - Standard body text, form labels
- **Small**: `12px` - Captions, metadata, fine print

## Font Weights

### Available Weights
- **Regular**: `400` - Standard body text
- **Medium**: `500` - Emphasized text, form labels
- **Semi-bold**: `600` - Headings, important information
- **Bold**: `700` - Strong emphasis, warnings

## Line Heights

### Recommended Line Heights
- **Headers**: `1.2` - Tight spacing for headings
- **Body Text**: `1.5` - Comfortable reading for paragraphs
- **UI Elements**: `1.4` - Balanced spacing for buttons and form elements

## Text Styles

### Heading Styles

#### H1 - Page Title
```css
font-size: 20px;
font-weight: 600;
line-height: 1.2;
color: #2c3e50;
margin-bottom: 24px;
```

#### H2 - Section Heading
```css
font-size: 18px;
font-weight: 600;
line-height: 1.2;
color: #2c3e50;
margin-bottom: 16px;
```

#### H3 - Subsection Heading
```css
font-size: 16px;
font-weight: 500;
line-height: 1.2;
color: #2c3e50;
margin-bottom: 12px;
```

### Body Text Styles

#### Primary Body
```css
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #2c3e50;
```

#### Secondary Body
```css
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #64748b;
```

#### Small Text
```css
font-size: 12px;
font-weight: 400;
line-height: 1.4;
color: #64748b;
```

### UI Element Styles

#### Button Text
```css
font-size: 14px;
font-weight: 500;
line-height: 1.4;
```

#### Form Labels
```css
font-size: 14px;
font-weight: 500;
line-height: 1.4;
color: #2c3e50;
```

#### Form Inputs
```css
font-size: 14px;
font-weight: 400;
line-height: 1.4;
color: #2c3e50;
```

#### Navigation Items
```css
font-size: 14px;
font-weight: 400;
line-height: 1.4;
color: #64748b;
```

#### Navigation Active
```css
font-size: 14px;
font-weight: 500;
line-height: 1.4;
color: #2c3e50;
```

## Usage Guidelines

### Hierarchy
- Use font size and weight to create clear visual hierarchy
- Maintain consistent spacing between text elements
- Limit the number of different text styles on a single page

### Readability
- Ensure sufficient contrast between text and background
- Use appropriate line heights for comfortable reading
- Avoid using too many font weights in a single interface

### Responsive Considerations
- Text sizes remain consistent across breakpoints
- Line heights may be adjusted slightly for mobile readability
- Ensure touch targets meet minimum size requirements

### Accessibility
- All text meets WCAG AA contrast requirements
- Font sizes are large enough for comfortable reading
- Text can be scaled up to 200% without loss of functionality
