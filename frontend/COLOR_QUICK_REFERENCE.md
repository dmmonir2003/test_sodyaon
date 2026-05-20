# Color System - Quick Reference Guide

## The One File You Need to Know

**`/src/config/colors-extended.ts`** - This is where ALL colors live. Change colors here.

---

## How to Change a Color (3 Steps)

### Step 1: Open the file
```
/src/config/colors-extended.ts
```

### Step 2: Find the color you want to change
```typescript
// Example: Change primary button color
export const PRIMARY = {
  600: '#7c3aed',  // ← This is the primary button default
  700: '#6d28d9',  // ← This is the primary button hover
}
```

### Step 3: Change the hex value
```typescript
// Before:
export const PRIMARY = {
  600: '#7c3aed',  // Purple
}

// After:
export const PRIMARY = {
  600: '#3b82f6',  // Blue
}
```

**Done!** The entire app now uses the new color.

---

## Color Structure

```
COLORS IN THE APP
├─ PRIMARY (Purple)
│  ├─ 600: Default color
│  ├─ 700: Hover state
│  └─ 800: Active state
├─ SECONDARY (Sky Blue)
├─ ACCENT (Gold)
├─ NEUTRAL (Grays)
├─ SUCCESS (Green)
├─ WARNING (Amber)
├─ DANGER (Red)
└─ INFO (Blue)
```

---

## Quick Color Changes

### Change Primary Brand Color
```typescript
// File: /src/config/colors-extended.ts, Line ~7
export const PRIMARY = {
  600: '#YOUR_COLOR_HERE',
  700: '#HOVER_STATE',
  800: '#ACTIVE_STATE',
}
```

### Change Secondary Color
```typescript
// File: /src/config/colors-extended.ts, Line ~17
export const SECONDARY = {
  500: '#YOUR_COLOR_HERE',
  600: '#HOVER_STATE',
}
```

### Change Accent Color
```typescript
// File: /src/config/colors-extended.ts, Line ~27
export const ACCENT = {
  500: '#YOUR_COLOR_HERE',
  600: '#HOVER_STATE',
}
```

### Change Success/Warning/Error Colors
```typescript
// File: /src/config/colors-extended.ts, Lines ~37-63
export const SUCCESS = { 500: '#10b981' };    // Green
export const WARNING = { 500: '#f59e0b' };    // Amber
export const DANGER = { 500: '#ef4444' };     // Red
export const INFO = { 500: '#3b82f6' };       // Blue
```

### Change Light/Dark Mode Colors
```typescript
// File: /src/config/colors-extended.ts, Lines ~76-93
export const LIGHT_MODE = {
  background: '#ffffff',        // Change page background
  foreground: '#0f172a',        // Change text color
  border: '#e2e8f0',            // Change borders
}

export const DARK_MODE = {
  background: '#0f172a',        // Dark mode background
  foreground: '#f8fafc',        // Dark mode text
  border: '#334155',            // Dark mode borders
}
```

---

## Using Colors in Components

### Option 1: React Hook (Recommended)
```typescript
import { useColors } from '@/hooks/useColors';

export function MyButton() {
  const colors = useColors();
  
  return (
    <button style={{ backgroundColor: colors.button.primary.background }}>
      Click me
    </button>
  );
}
```

### Option 2: Direct Import
```typescript
import { COMPONENT_COLORS } from '@/config/colors-extended';

export function MyButton() {
  return (
    <button style={{ backgroundColor: COMPONENT_COLORS.button.primary.background }}>
      Click me
    </button>
  );
}
```

### Option 3: Tailwind Classes
```typescript
export function MyButton() {
  return <button className="bg-primary-600 hover:bg-primary-700">Click me</button>;
}
```

---

## Color Map (What Colors Do What)

| Component | Color Constant | Use Case |
|-----------|---|---|
| Primary buttons | `PRIMARY[600]` | Main actions |
| Secondary buttons | `SECONDARY[500]` | Alternative actions |
| Accent elements | `ACCENT[500]` | Highlights |
| Text | `LIGHT_MODE.foreground` | Main text |
| Links | `PRIMARY[600]` | Clickable links |
| Hover states | `PRIMARY[700]` | Hover effects |
| Active states | `PRIMARY[800]` | Pressed/selected |
| Backgrounds | `LIGHT_MODE.background` | Page background |
| Borders | `LIGHT_MODE.border` | Border colors |
| Success messages | `SUCCESS[500]` | Success states |
| Warnings | `WARNING[500]` | Warning messages |
| Errors | `DANGER[500]` | Error messages |
| Info | `INFO[500]` | Information |

---

## Example: Change All Button Colors

**File:** `/src/config/colors-extended.ts`

**Before:**
```typescript
export const PRIMARY = {
  600: '#7c3aed',  // Purple
  700: '#6d28d9',  // Purple hover
  800: '#5b21b6',  // Purple active
}
```

**After:**
```typescript
export const PRIMARY = {
  600: '#3b82f6',  // Blue
  700: '#2563eb',  // Blue hover
  800: '#1d4ed8',  // Blue active
}
```

**Result:** All primary buttons across the entire app are now blue.

---

## Testing Color Changes

1. Edit a color in `/src/config/colors-extended.ts`
2. Save the file
3. Check your browser - colors update automatically ✓

---

## Color Tools

### Online Color Picker
- https://htmlcolorcodes.com/
- https://www.color-hex.com/

### Hex to RGB Converter
- Use the `rgbToHex()` function in colors-extended.ts

### Brightness Adjustment
```typescript
import { adjustBrightness } from '@/config/colors-extended';

const lighter = adjustBrightness('#7c3aed', 10);  // 10% lighter
const darker = adjustBrightness('#7c3aed', -10); // 10% darker
```

---

## Common Color Names & Their Hex Values

```
Purple:    #7c3aed (PRIMARY)
Sky Blue:  #0ea5e9 (SECONDARY)  
Gold:      #f59e0b (ACCENT)
Green:     #10b981 (SUCCESS)
Amber:     #f59e0b (WARNING)
Red:       #ef4444 (DANGER)
Blue:      #3b82f6 (INFO)
Gray:      #64748b (NEUTRAL)
White:     #ffffff
Black:     #0f172a
```

---

## File Locations

```
/src/config/
├── colors-extended.ts      ← EDIT THIS FILE
├── colors.ts              ← Legacy (don't use)

/src/hooks/
└── useColors.ts          ← Use this hook in components

/src/app/
└── globals.css           ← CSS utilities

/
├── COLOR_MANAGEMENT.md   ← Full documentation
└── COLOR_QUICK_REFERENCE.md ← This file
```

---

## Troubleshooting

**Colors not changing?**
- Make sure you edited `/src/config/colors-extended.ts`
- Restart your dev server
- Clear browser cache

**Hook not working?**
- Add `'use client'` at top of component
- Import: `import { useColors } from '@/hooks/useColors'`

**Need dark mode colors?**
- Use `colors.modeColor(lightColor, darkColor)`
- Or edit `DARK_MODE` object in colors-extended.ts

---

## That's It!

You now have a centralized color system where:
- ✅ Change one color → entire app updates
- ✅ Full TypeScript support
- ✅ Dark mode automatic
- ✅ No scattered color values
- ✅ Professional color management

**Happy coloring! 🎨**
