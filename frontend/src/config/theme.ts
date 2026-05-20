/**
 * GLOBAL THEME CONFIGURATION
 * ===========================
 * Centralized color and theme configuration for the entire application.
 * Update colors here to reflect changes across the entire app.
 * 
 * Usage:
 * - Import colors from this file in components
 * - Use CSS variables in globals.css for Tailwind classes
 * - Combine both approaches for maximum consistency
 */

export const THEME_COLORS = {
  // Primary Brand Color (Purple)
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },

  // Secondary Brand Color (Cyan/Blue)
  secondary: {
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },

  // Accent Color (Amber/Orange)
  accent: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  // Semantic Colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  danger: {
    500: '#ef4444',
    600: '#dc2626',
  },
  info: {
    500: '#3b82f6',
    600: '#2563eb',
  },

  // Neutral Colors
  slate: {
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
  },
};

/**
 * Button Color Variants
 */
export const BUTTON_COLORS = {
  primary: {
    bg: THEME_COLORS.primary[600],
    hover: THEME_COLORS.primary[700],
    active: THEME_COLORS.primary[800],
    text: '#ffffff',
  },
  secondary: {
    bg: THEME_COLORS.secondary[500],
    hover: THEME_COLORS.secondary[600],
    active: THEME_COLORS.secondary[700],
    text: '#ffffff',
  },
  accent: {
    bg: THEME_COLORS.accent[500],
    hover: THEME_COLORS.accent[600],
    active: THEME_COLORS.accent[700],
    text: '#ffffff',
  },
};

/**
 * Component Specific Colors
 */
export const COMPONENT_COLORS = {
  navbar: {
    bg: '#ffffff',
    text: '#0f172a',
    hoverBg: '#f8fafc',
    activeBorder: THEME_COLORS.primary[600],
    darkBg: '#0f172a',
    darkText: '#f8fafc',
    darkHoverBg: '#1e293b',
  },

  card: {
    bg: '#ffffff',
    border: '#e2e8f0',
    shadow: 'rgba(124, 58, 237, 0.1)',
    darkBg: '#1e293b',
    darkBorder: '#334155',
  },

  button: {
    default: BUTTON_COLORS.primary,
    secondary: BUTTON_COLORS.secondary,
    accent: BUTTON_COLORS.accent,
  },

  badge: {
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      text: THEME_COLORS.success[600],
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      text: THEME_COLORS.warning[600],
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.1)',
      text: THEME_COLORS.danger[600],
    },
    info: {
      bg: 'rgba(59, 130, 246, 0.1)',
      text: THEME_COLORS.info[600],
    },
  },
};

/**
 * Theme Mode Configuration
 */
export const DARK_MODE_COLORS = {
  background: '#0f172a',
  foreground: '#f8fafc',
  secondary: '#1e293b',
  tertiary: '#334155',
};

export const LIGHT_MODE_COLORS = {
  background: '#ffffff',
  foreground: '#0f172a',
  secondary: '#f8fafc',
  tertiary: '#e2e8f0',
};

/**
 * Helper function to get theme color
 * Usage: getThemeColor('primary', 600)
 */
export const getThemeColor = (
  colorName: keyof typeof THEME_COLORS,
  shade: number | string = 500
) => {
  const color = THEME_COLORS[colorName];
  if (!color) {
    console.warn(`Theme color "${colorName}" not found`);
    return THEME_COLORS.primary[600];
  }
  return (color as Record<number | string, string>)[shade] || THEME_COLORS.primary[600];
};

/**
 * Helper function to get component color
 * Usage: getComponentColor('button', 'primary', 'bg')
 */
export const getComponentColor = (
  component: keyof typeof COMPONENT_COLORS,
  variant: string = 'default'
) => {
  const comp = COMPONENT_COLORS[component];
  if (!comp) {
    console.warn(`Component "${component}" not found in colors`);
    return {};
  }
  return (comp as Record<string, unknown>)[variant] || comp;
};

export default THEME_COLORS;
