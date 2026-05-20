# Complete Color Management System

## Overview

This project uses a **centralized, single-source-of-truth color management system**. All colors are defined in one place, and changing them automatically updates the entire application.

---

## File Structure

### Core Color Files

1. **`src/config/colors-extended.ts`** - The MASTER COLOR FILE
   - Contains all color definitions (PRIMARY, SECONDARY, ACCENT, semantic colors, component colors)
   - This is the ONLY file you need to edit to change colors
   - All colors are organized by component and use case
   - Includes helper functions

2. **`src/hooks/useColors.ts`** - React Hook for colors
   - Provides real-time color access with dark mode support
   - Auto-detects light/dark mode
   - Use this in React components for dynamic color access

3. **`src/config/colors.ts`** - Legacy semantic colors (deprecated)
   - Kept for backward compatibility
   - Prefer using colors-extended.ts instead

4. **`src/app/globals.css`** - Tailwind utilities
   - CSS utility classes for styling
   - Auto-synced with color definitions

---

## How to Change Colors

### Method 1: Change All Colors of a Type (RECOMMENDED)

Edit `/src/config/colors-extended.ts` and change the constant values:

```typescript
// Change primary color palette
export const PRIMARY = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',  // ← Change default
  700: '#6d28d9',  // ← Change hover
  800: '#5b21b6',  // ← Change active
  900: '#4c1d95',
}
```

### Method 2: Change Component-Specific Colors

Edit the `COMPONENT_COLORS` object:

```typescript
export const COMPONENT_COLORS = {
  button: {
    primary: {
      background: PRIMARY[600],      // ← Edit these
      backgroundHover: PRIMARY[700],
      backgroundActive: PRIMARY[800],
      text: '#ffffff',
    },
    // ... more components
  },
}
```

### Method 3: Change Light/Dark Mode Colors

Edit the mode-specific objects:

```typescript
export const LIGHT_MODE = {
  background: NEUTRAL[50],           // ← Edit these
  backgroundSecondary: NEUTRAL[100],
  // ...
}

export const DARK_MODE = {
  background: NEUTRAL[900],          // ← Edit these
  backgroundSecondary: NEUTRAL[800],
  // ...
}
```

---

## Using Colors in Components

### Method 1: Using the `useColors` Hook (Recommended for React Components)

```typescript
'use client';

import { useColors } from '@/hooks/useColors';

export function MyButton() {
  const colors = useColors();

  return (
    <button
      style={{
        backgroundColor: colors.button.primary.background,
        color: colors.button.primary.text,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.button.primary.backgroundHover;
      }}
    >
      Click me
    </button>
  );
}
```

### Method 2: Direct Import (No Dark Mode)

```typescript
import { COMPONENT_COLORS, PRIMARY, SECONDARY } from '@/config/colors-extended';

export function MyComponent() {
  return (
    <div style={{ backgroundColor: COMPONENT_COLORS.button.primary.background }}>
      Hello
    </div>
  );
}
```

### Method 3: Using Tailwind Classes with Colors

```typescript
export function MyComponent() {
  return (
    <button className="bg-primary-600 hover:bg-primary-700 text-white">
      Click me
    </button>
  );
}
```

### Method 4: Using Color Helper Functions

```typescript
import { getButtonColors, getColorValue } from '@/config/colors-extended';

export function MyComponent() {
  const primaryButtonColors = getButtonColors('primary');
  const customColor = getColorValue('button.primary.background');

  return (
    <button style={{ backgroundColor: primaryButtonColors.background }}>
      Click me
    </button>
  );
}
```

---

## Color Organization

### Base Color Palettes

- **PRIMARY** - Main brand color (Purple)
  - Used for primary buttons, links, focus states
  - Variants: 50-900

- **SECONDARY** - Accent color (Sky Blue)
  - Used for secondary actions
  - Variants: 300, 400, 500, 600, 800

- **ACCENT** - Highlight color (Amber/Gold)
  - Used for highlights and special attention
  - Variants: 200, 400, 500, 600, 800

- **NEUTRAL** - Grayscale (for text, borders, backgrounds)
  - Variants: 50-900

### Semantic Colors

- **SUCCESS** - Green (positive actions)
- **WARNING** - Amber (warnings)
- **DANGER** - Red (errors, destructive actions)
- **INFO** - Blue (informational)

### Component Colors

Colors are pre-mapped to components:
- `button` - All button variants and states
- `link` - Link colors for different variants
- `nav` - Navigation colors
- `card` - Card/container colors
- `form` - Form input colors
- `badge` - Badge/pill colors

---

## Color Naming Convention

All colors follow this structure:

```
COMPONENT_COLORS.{component}.{variant}.{state}
```

Examples:
- `COMPONENT_COLORS.button.primary.background` - Primary button background
- `COMPONENT_COLORS.button.primary.backgroundHover` - Primary button hover state
- `COMPONENT_COLORS.nav.text` - Navigation text
- `COMPONENT_COLORS.form.borderFocus` - Form focus border

---

## Automatic Dark Mode Support

The `useColors()` hook automatically detects and responds to dark mode:

```typescript
const colors = useColors();

// Automatically returns correct color for current mode
console.log(colors.nav.background); // Light mode: #ffffff, Dark mode: #0f172a
console.log(colors.isDark);         // true if dark mode, false if light
console.log(colors.mode);           // 'dark' or 'light'
```

---

## Live Color Updates

When you change a color in `/src/config/colors-extended.ts`:

1. **TypeScript components** - Get updated automatically
2. **React components using hooks** - Re-render with new colors
3. **Tailwind classes** - Updated instantly (if using Tailwind integration)
4. **CSS variables** - Updated via globals.css

---

## Quick Color Reference

### Common Color Paths

```typescript
// Buttons
colors.button.primary.background        // Primary button background
colors.button.primary.backgroundHover   // Primary button hover
colors.button.secondary.background      // Secondary button background

// Text/Foreground
colors.light.foreground                 // Light mode text
colors.dark.foreground                  // Dark mode text

// Backgrounds
colors.light.background                 // Light mode background
colors.dark.background                  // Dark mode background

// Borders
colors.light.border                     // Light mode border
colors.dark.border                      // Dark mode border

// Status
colors.success[500]                     // Success color
colors.warning[500]                     // Warning color
colors.danger[500]                      // Error/Danger color
colors.info[500]                        // Info color

// Navigation
colors.nav.activeLink                   // Active navigation link
colors.nav.hoverBackground              // Navigation hover
```

---

## Examples

### Change Primary Brand Color

**Before:**
```typescript
export const PRIMARY = {
  600: '#7c3aed',  // Purple
}
```

**After:**
```typescript
export const PRIMARY = {
  600: '#3b82f6',  // Blue
}
```

Result: Every button, link, and primary element turns blue.

---

### Change Button Hover Color

**Before:**
```typescript
primary: {
  background: PRIMARY[600],
  backgroundHover: PRIMARY[700],  // Darker purple
}
```

**After:**
```typescript
primary: {
  background: PRIMARY[600],
  backgroundHover: PRIMARY[500],  // Lighter purple
}
```

Result: Buttons now lighten instead of darken on hover.

---

### Create Custom Component Colors

Add new component to `COMPONENT_COLORS`:

```typescript
export const COMPONENT_COLORS = {
  // ... existing components
  
  banner: {
    background: PRIMARY[50],
    border: PRIMARY[200],
    text: PRIMARY[900],
  },
}
```

Then use in components:

```typescript
import { COMPONENT_COLORS } from '@/config/colors-extended';

export function Banner() {
  return (
    <div style={{
      backgroundColor: COMPONENT_COLORS.banner.background,
      borderColor: COMPONENT_COLORS.banner.border,
      color: COMPONENT_COLORS.banner.text,
    }}>
      Banner content
    </div>
  );
}
```

---

## Troubleshooting

### Colors not updating?

1. Check you're editing `/src/config/colors-extended.ts`
2. Ensure component uses `useColors()` hook or imports from correct file
3. Clear Next.js cache: `rm -rf .next`
4. Restart dev server

### Dark mode not working?

1. Ensure component uses `useColors()` hook
2. Check that HTML has `dark` class for dark mode detection
3. Verify `isDark` property of colors object

### TypeScript errors?

1. Make sure imports are correct: `from '@/config/colors-extended'`
2. Clear node_modules and reinstall

---

## Best Practices

1. ✅ Always edit `/src/config/colors-extended.ts` for color changes
2. ✅ Use `useColors()` hook in React components for dynamic colors
3. ✅ Use semantic color names (primary, success, danger) instead of hex values
4. ✅ Group related color changes together
5. ✅ Document custom colors you add to `COMPONENT_COLORS`

6. ❌ Don't hardcode hex values in components
7. ❌ Don't edit `src/config/colors.ts` (legacy)
8. ❌ Don't use inline styles if possible, use the color system

---

## Support

For questions or issues with the color system, refer to:
- `/src/config/colors-extended.ts` - Color definitions and helpers
- `/src/hooks/useColors.ts` - Hook documentation
- `/src/components/examples/` - Example components

