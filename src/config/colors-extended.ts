/**
 * EXTENDED COLOR CONFIGURATION
 * ============================
 * Master color palette with all variants and shades.
 * This is the SINGLE SOURCE OF TRUTH for all colors in the application.
 * Change a color here and it propagates throughout the entire project.
 */

// ============================================
// PRIMARY COLOR - Main brand color (Teal)
// ============================================
export const PRIMARY = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5ee7db',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',  // Primary default (Teal)
  700: '#0f766e',  // Primary hover
  800: '#115e59',  // Primary active
  900: '#134e4a',
} as const;

// ============================================
// SECONDARY COLOR - Accent color (Coral/Pink)
// ============================================
export const SECONDARY = {
  300: '#fb7185',
  400: '#f43f5e',
  500: '#ec4899', // Secondary default (Hot Pink)
  600: '#db2777', // Secondary hover
  800: '#831843',
} as const;

// ============================================
// ACCENT COLOR - Highlight color (Amber)
// ============================================
export const ACCENT = {
  200: '#fef08a',
  400: '#fbbf24',
  500: '#f59e0b', // Accent default
  600: '#d97706', // Accent hover
  800: '#92400e',
} as const;

// ============================================
// SEMANTIC COLORS - Status and utility colors
// ============================================
export const SUCCESS = {
  50: '#f0fdf4',
  400: '#4ade80',
  500: '#10b981',
  600: '#059669',
  900: '#064e3b',
} as const;

export const WARNING = {
  50: '#fffbeb',
  400: '#facc15',
  500: '#f59e0b',
  600: '#d97706',
  900: '#78350f',
} as const;

export const DANGER = {
  50: '#fef2f2',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  900: '#7f1d1d',
} as const;

export const INFO = {
  50: '#eff6ff',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  900: '#1e3a8a',
} as const;

// ============================================
// NEUTRAL COLORS - Grayscale
// ============================================
export const NEUTRAL = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
} as const;

// ============================================
// LIGHT MODE COLORS
// ============================================
export const LIGHT_MODE = {
  background: NEUTRAL[50],
  backgroundSecondary: NEUTRAL[100],
  backgroundTertiary: NEUTRAL[200],
  foreground: NEUTRAL[900],
  foregroundSecondary: NEUTRAL[600],
  foregroundMuted: NEUTRAL[500],
  border: NEUTRAL[200],
  borderLight: NEUTRAL[100],
  divider: NEUTRAL[200],
} as const;

// ============================================
// DARK MODE COLORS
// ============================================
export const DARK_MODE = {
  background: NEUTRAL[900],
  backgroundSecondary: NEUTRAL[800],
  backgroundTertiary: NEUTRAL[700],
  foreground: NEUTRAL[50],
  foregroundSecondary: NEUTRAL[300],
  foregroundMuted: NEUTRAL[400],
  border: NEUTRAL[700],
  borderLight: NEUTRAL[800],
  divider: NEUTRAL[700],
} as const;

// ============================================
// COMPONENT COLOR MAP
// Map component names to their colors for easy reference
// ============================================
export const COMPONENT_COLORS = {
  button: {
    primary: {
      background: PRIMARY[600],
      backgroundHover: PRIMARY[700],
      backgroundActive: PRIMARY[800],
      text: '#ffffff',
    },
    secondary: {
      background: SECONDARY[500],
      backgroundHover: SECONDARY[600],
      backgroundActive: SECONDARY[600],
      text: '#ffffff',
    },
    accent: {
      background: ACCENT[500],
      backgroundHover: ACCENT[600],
      backgroundActive: ACCENT[600],
      text: '#ffffff',
    },
    danger: {
      background: DANGER[500],
      backgroundHover: DANGER[600],
      backgroundActive: DANGER[600],
      text: '#ffffff',
    },
    ghost: {
      background: 'transparent',
      backgroundHover: LIGHT_MODE.backgroundSecondary,
      backgroundHoverDark: DARK_MODE.backgroundSecondary,
      backgroundActive: LIGHT_MODE.backgroundTertiary,
      backgroundActiveDark: DARK_MODE.backgroundTertiary,
      text: LIGHT_MODE.foreground,
      textDark: DARK_MODE.foreground,
    },
  },

  link: {
    primary: {
      default: PRIMARY[600],
      hover: PRIMARY[700],
      active: PRIMARY[800],
      visited: PRIMARY[700],
    },
    secondary: {
      default: SECONDARY[500],
      hover: SECONDARY[600],
      active: SECONDARY[600],
      visited: SECONDARY[600],
    },
  },

  nav: {
    background: LIGHT_MODE.background,
    backgroundDark: DARK_MODE.background,
    text: LIGHT_MODE.foreground,
    textDark: DARK_MODE.foreground,
    activeLink: PRIMARY[600],
    activeLinkDark: PRIMARY[400],
    hoverBackground: LIGHT_MODE.backgroundSecondary,
    hoverBackgroundDark: DARK_MODE.backgroundSecondary,
    border: LIGHT_MODE.border,
    borderDark: DARK_MODE.border,
  },

  card: {
    background: LIGHT_MODE.background,
    backgroundDark: DARK_MODE.backgroundSecondary,
    border: LIGHT_MODE.border,
    borderDark: DARK_MODE.border,
    hover: LIGHT_MODE.backgroundSecondary,
    hoverDark: DARK_MODE.backgroundTertiary,
    shadow: 'rgba(124, 58, 237, 0.1)',
  },

  form: {
    background: LIGHT_MODE.background,
    backgroundDark: DARK_MODE.backgroundSecondary,
    border: LIGHT_MODE.border,
    borderDark: DARK_MODE.border,
    borderFocus: PRIMARY[600],
    borderFocusDark: PRIMARY[400],
    text: LIGHT_MODE.foreground,
    textDark: DARK_MODE.foreground,
    placeholder: LIGHT_MODE.foregroundMuted,
    placeholderDark: DARK_MODE.foregroundMuted,
  },

  badge: {
    primary: {
      background: PRIMARY[50],
      backgroundDark: PRIMARY[900],
      text: PRIMARY[800],
      textDark: PRIMARY[300],
    },
    success: {
      background: SUCCESS[50],
      backgroundDark: SUCCESS[900],
      text: SUCCESS[600],
      textDark: SUCCESS[400],
    },
    warning: {
      background: WARNING[50],
      backgroundDark: WARNING[900],
      text: WARNING[600],
      textDark: WARNING[400],
    },
    danger: {
      background: DANGER[50],
      backgroundDark: DANGER[900],
      text: DANGER[600],
      textDark: DANGER[400],
    },
    info: {
      background: INFO[50],
      backgroundDark: INFO[900],
      text: INFO[600],
      textDark: INFO[400],
    },
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a specific color by flattened path
 * Example: getColorValue('button.primary.background')
 */
export function getColorValue(path: string): string | undefined {
  const keys = path.split('.');
  let current: any = COMPONENT_COLORS;

  for (const key of keys) {
    current = current[key];
    if (current === undefined) return undefined;
  }

  return current;
}

/**
 * Get color with automatic dark mode handling
 * Example: getColorWithMode('light', buttonLight, buttonDark)
 */
export function getColorWithMode(mode: 'light' | 'dark', lightColor: string, darkColor: string): string {
  return mode === 'light' ? lightColor : darkColor;
}

/**
 * Get all primary button colors
 */
export function getButtonColors(variant: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost') {
  return COMPONENT_COLORS.button[variant];
}

/**
 * Get all link colors for a variant
 */
export function getLinkColors(variant: 'primary' | 'secondary') {
  return COMPONENT_COLORS.link[variant];
}

/**
 * Get all badge colors for a variant
 */
export function getBadgeColors(variant: 'primary' | 'success' | 'warning' | 'danger' | 'info') {
  return COMPONENT_COLORS.badge[variant];
}

/**
 * Convert RGB to Hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Adjust color brightness
 */
export function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return rgbToHex(R, G, B);
}
