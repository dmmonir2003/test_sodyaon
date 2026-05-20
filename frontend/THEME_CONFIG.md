# Global Theme Configuration Guide

This document explains how to use and modify the global theme configuration for the Sodayon application.

## Overview

The theme system is centralized in two places:

1. **`src/app/globals.css`** - CSS variables and Tailwind utilities for styling
2. **`src/config/theme.ts`** - TypeScript configuration for programmatic color access

## Changing Global Colors

### Method 1: CSS Variables (Recommended for styling)

Edit `/src/app/globals.css` and modify the color values in the `@theme` block:

```css
@theme {
  /* PRIMARY COLOR - Change this to update primary brand color everywhere */
  --color-primary-600: #7c3aed; /* Change this value */
  
  /* SECONDARY COLOR - Change this to update secondary brand color */
  --color-secondary-500: #0ea5e9; /* Change this value */
  
  /* ACCENT COLOR - Change this for highlight/accent colors */
  --color-accent-500: #f59e0b; /* Change this value */
}
```

### Method 2: TypeScript Config (For programmatic access)

Edit `/src/config/theme.ts` and modify the `THEME_COLORS` object:

```typescript
export const THEME_COLORS = {
  primary: {
    600: '#7c3aed', // Change this value
  },
  secondary: {
    500: '#0ea5e9', // Change this value
  },
  // ... other colors
};
```

## Color Palette

### Primary Colors (Purple)
- **Use for:** Main buttons, primary actions, primary text links
- **Variants:** 50-900 (light to dark)
- **Key shades:** 600 (default), 700 (hover), 800 (active)

### Secondary Colors (Cyan)
- **Use for:** Secondary buttons, info indicators
- **Variants:** 400, 500, 600, 700
- **Key shades:** 500 (default), 600 (hover), 700 (active)

### Accent Colors (Amber)
- **Use for:** Highlights, special offers, important badges
- **Variants:** 400, 500, 600, 700
- **Key shades:** 500 (default), 600 (hover), 700 (active)

### Semantic Colors
- **Success (Green):** Positive actions, successful states
- **Warning (Amber):** Cautionary messages
- **Danger (Red):** Errors, destructive actions
- **Info (Blue):** Informational messages

## Using Colors in Components

### Using Tailwind Classes

```tsx
// Primary button
<button className="btn-primary">Click me</button>

// Secondary button
<button className="btn-secondary">Secondary</button>

// Primary text link
<a href="#" className="link-primary">Link</a>

// Card with theme colors
<div className="card-base border-primary">
  Content
</div>
```

### Using CSS Variables

```tsx
<div style={{
  backgroundColor: 'var(--color-primary-600)',
  color: 'white'
}}>
  Theme-colored box
</div>
```

### Using TypeScript Config

```typescript
import { THEME_COLORS, getThemeColor } from '@/config/theme';

// Direct access
const primaryColor = THEME_COLORS.primary[600];

// Using helper function
const hoverColor = getThemeColor('primary', 700);

// Use in inline styles
<button style={{ backgroundColor: primaryColor }}>
  Click me
</button>
```

## Theme Utilities

Pre-built utility classes for common patterns:

### Button Utilities
```tsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-accent">Accent Button</button>
<button className="btn-ghost">Ghost Button</button>
```

### Link Utilities
```tsx
<a href="#" className="link-primary">Primary Link</a>
<a href="#" className="link-secondary">Secondary Link</a>
```

### Card Utilities
```tsx
<div className="card-base">Basic Card</div>
<div className="card-elevated">Elevated Card</div>
```

### Status Utilities
```tsx
<div className="status-success">Success Message</div>
<div className="status-warning">Warning Message</div>
<div className="status-danger">Error Message</div>
<div className="status-info">Info Message</div>
```

### Hover Effects
```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
```

## Dark Mode Support

All colors automatically adapt to dark mode. No additional configuration needed:

```tsx
// Light mode: white background with dark text
// Dark mode: dark background with light text
<div className="card-base">
  Content adapts automatically
</div>
```

To customize dark mode colors, edit the `@media (prefers-color-scheme: dark)` section in `globals.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --text-color: #f8fafc;
  }
}
```

## State Colors

### Hover States
```css
--color-button-primary-hover: #6d28d9;
--color-button-secondary-hover: #0284c7;
```

### Active/Focus States
```css
--color-button-primary-active: #5b21b6;
--color-button-secondary-active: #0369a1;
```

### Focus Ring (Accessibility)
```tsx
<button className="focus-ring">Accessible button</button>
```

## Navigation Active States

To style active navigation items:

```tsx
<a href="/shop" className={isActive ? 'nav-active' : ''}>
  Shop
</a>
```

CSS for active route:
```css
.nav-active {
  @apply text-primary-600 dark:text-primary-400 border-b-2 border-primary-600;
}
```

## Best Practices

1. **Always use theme colors** - Don't hardcode colors in components
2. **Use utility classes** - Prefer `btn-primary` over individual Tailwind classes
3. **Semantic naming** - Use success/warning/danger for status colors
4. **Consistency** - Keep hover/active states consistent (darker shade by default)
5. **Accessibility** - Always ensure sufficient color contrast (use focus-ring)
6. **Dark mode** - Test components in both light and dark modes

## Common Color Changes

### Change Primary Brand Color
1. Edit `src/app/globals.css` - Change `--color-primary-*` values
2. Edit `src/config/theme.ts` - Change `THEME_COLORS.primary` object
3. All buttons, links, and primary elements update automatically

### Change Secondary Color
1. Edit `src/app/globals.css` - Change `--color-secondary-*` values
2. Edit `src/config/theme.ts` - Change `THEME_COLORS.secondary` object
3. Secondary buttons and accents update automatically

### Change Accent Color
1. Edit `src/app/globals.css` - Change `--color-accent-*` values
2. Edit `src/config/theme.ts` - Change `THEME_COLORS.accent` object
3. Special offers and highlights update automatically

## File Locations

- **CSS Variables:** `/src/app/globals.css`
- **TypeScript Config:** `/src/config/theme.ts`
- **Component Usage:** Any component can import from `/src/config/theme.ts`

## Example: Complete Theme Change

To change from purple to blue theme:

**Step 1:** Update globals.css
```css
--color-primary-600: #2563eb; /* Change from purple to blue */
--color-secondary-500: #06b6d4; /* Update secondary */
```

**Step 2:** Update theme.ts
```typescript
primary: {
  600: '#2563eb', // Blue instead of purple
}
```

That's it! The entire application updates to use the new blue theme.

## Troubleshooting

**Colors not updating?**
- Clear browser cache
- Rebuild the project
- Check that both `globals.css` and `theme.ts` are updated

**Dark mode not working?**
- Ensure system prefers dark mode or add dark mode toggle
- Check `@media (prefers-color-scheme: dark)` settings

**Colors look wrong?**
- Verify color values are valid hex codes
- Check contrast ratios for accessibility
- Test in both light and dark modes
