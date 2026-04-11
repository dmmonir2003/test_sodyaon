/**
 * SEMANTIC COLOR VARIABLES
 * ========================
 * Meaningful color variable names for consistent color handling across the app.
 * Use these variables instead of raw hex codes for better maintainability.
 * 
 * Structure: componentName.state = color
 * 
 * Usage Example:
 * import { SEMANTIC_COLORS } from '@/config/colors';
 * 
 * const buttonStyle = {
 *   backgroundColor: SEMANTIC_COLORS.button.primary.default,
 *   '&:hover': { backgroundColor: SEMANTIC_COLORS.button.primary.hover },
 *   '&:active': { backgroundColor: SEMANTIC_COLORS.button.primary.active },
 * };
 */

export const SEMANTIC_COLORS = {
  // PRIMARY BUTTON COLORS
  button: {
    primary: {
      default: '#7c3aed',
      hover: '#6d28d9',
      active: '#5b21b6',
      disabled: '#d1d5db',
      text: '#ffffff',
    },
    secondary: {
      default: '#0ea5e9',
      hover: '#0284c7',
      active: '#0369a1',
      disabled: '#d1d5db',
      text: '#ffffff',
    },
    accent: {
      default: '#f59e0b',
      hover: '#d97706',
      active: '#b45309',
      disabled: '#d1d5db',
      text: '#ffffff',
    },
    ghost: {
      default: 'transparent',
      hover: '#f1f5f9',
      hoverDark: '#1e293b',
      active: '#e2e8f0',
      activeDark: '#334155',
      text: '#0f172a',
      textDark: '#f8fafc',
    },
    danger: {
      default: '#ef4444',
      hover: '#dc2626',
      active: '#b91c1c',
      disabled: '#d1d5db',
      text: '#ffffff',
    },
  },

  // LINK COLORS
  link: {
    primary: {
      default: '#7c3aed',
      hover: '#6d28d9',
      active: '#5b21b6',
      visited: '#6d28d9',
      dark: '#a78bfa',
      darkHover: '#c4b5fd',
    },
    secondary: {
      default: '#0ea5e9',
      hover: '#0284c7',
      active: '#0369a1',
      visited: '#0284c7',
      dark: '#38bdf8',
      darkHover: '#7dd3fc',
    },
  },

  // INPUT/FORM COLORS
  form: {
    input: {
      background: '#ffffff',
      backgroundDark: '#1e293b',
      border: '#d1d5db',
      borderDark: '#475569',
      borderFocus: '#7c3aed',
      borderFocusDark: '#a78bfa',
      text: '#0f172a',
      textDark: '#f8fafc',
      placeholder: '#9ca3af',
      placeholderDark: '#64748b',
    },
    error: {
      border: '#ef4444',
      background: '#fef2f2',
      backgroundDark: '#7f1d1d',
      text: '#dc2626',
    },
    success: {
      border: '#10b981',
      background: '#f0fdf4',
      backgroundDark: '#064e3b',
      text: '#059669',
    },
  },

  // NAVIGATION COLORS
  nav: {
    background: '#ffffff',
    backgroundDark: '#0f172a',
    text: '#0f172a',
    textDark: '#f8fafc',
    active: '#7c3aed',
    activeDark: '#a78bfa',
    hover: '#f1f5f9',
    hoverDark: '#1e293b',
    border: '#e2e8f0',
    borderDark: '#334155',
  },

  // CARD COLORS
  card: {
    background: '#ffffff',
    backgroundDark: '#1e293b',
    border: '#e2e8f0',
    borderDark: '#334155',
    hover: '#f8fafc',
    hoverDark: '#0f172a',
    shadow: 'rgba(124, 58, 237, 0.1)',
  },

  // BADGE/PILL COLORS
  badge: {
    primary: {
      background: '#f5f3ff',
      backgroundDark: '#4c1d95',
      text: '#5b21b6',
      textDark: '#c4b5fd',
    },
    success: {
      background: '#f0fdf4',
      backgroundDark: '#064e3b',
      text: '#059669',
      textDark: '#86efac',
    },
    warning: {
      background: '#fffbeb',
      backgroundDark: '#78350f',
      text: '#d97706',
      textDark: '#fbbf24',
    },
    danger: {
      background: '#fef2f2',
      backgroundDark: '#7f1d1d',
      text: '#dc2626',
      textDark: '#fca5a5',
    },
    info: {
      background: '#eff6ff',
      backgroundDark: '#1e3a8a',
      text: '#2563eb',
      textDark: '#93c5fd',
    },
  },

  // TEXT COLORS
  text: {
    primary: '#0f172a',
    primaryDark: '#f8fafc',
    secondary: '#64748b',
    secondaryDark: '#cbd5e1',
    muted: '#94a3b8',
    mutedDark: '#78758d',
    disabled: '#cbd5e1',
    disabledDark: '#64748b',
  },

  // BACKGROUND COLORS
  background: {
    default: '#ffffff',
    defaultDark: '#0f172a',
    secondary: '#f8fafc',
    secondaryDark: '#1e293b',
    tertiary: '#f1f5f9',
    tertiaryDark: '#334155',
  },

  // BORDER COLORS
  border: {
    default: '#e2e8f0',
    defaultDark: '#334155',
    light: '#f1f5f9',
    lightDark: '#1e293b',
    focus: '#7c3aed',
    focusDark: '#a78bfa',
  },

  // OVERLAY/BACKDROP COLORS
  overlay: {
    light: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.7)',
    tooltip: 'rgba(15, 23, 42, 0.9)',
  },

  // STATUS INDICATOR COLORS
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    pending: '#f59e0b',
  },

  // INTERACTIVE ELEMENT COLORS
  interactive: {
    hoverBackground: '#f1f5f9',
    hoverBackgroundDark: '#1e293b',
    activeBackground: '#e2e8f0',
    activeBackgroundDark: '#334155',
    focusRing: '#7c3aed',
    focusRingOpacity: 0.5,
  },

  // DIVIDER/SEPARATOR COLORS
  divider: {
    default: '#e2e8f0',
    defaultDark: '#334155',
    light: '#f1f5f9',
    lightDark: '#1e293b',
  },
};


/**
 * HELPER FUNCTION: Get color value
 * 
 * Usage:
 * getColor('button.primary.hover') // returns '#6d28d9'
 */
export function getColor(path: string): string | undefined {
  const keys = path.split('.');
  let current: any = SEMANTIC_COLORS;

  for (const key of keys) {
    current = current[key];
    if (current === undefined) return undefined;
  }

  return current;
}

/**
 * HELPER FUNCTION: Get button color set
 * 
 * Usage:
 * const primaryButtonColors = getButtonColors('primary');
 */
export function getButtonColors(buttonType: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger') {
  return SEMANTIC_COLORS.button[buttonType];
}

/**
 * HELPER FUNCTION: Get link color set
 */
export function getLinkColors(linkType: 'primary' | 'secondary') {
  return SEMANTIC_COLORS.link[linkType];
}

/**
 * HELPER FUNCTION: Get badge color set
 */
export function getBadgeColors(badgeType: 'primary' | 'success' | 'warning' | 'danger' | 'info') {
  return SEMANTIC_COLORS.badge[badgeType];
}

/**
 * COLOR MODE HELPER
 * Returns appropriate color based on dark mode preference
 * 
 * Usage:
 * getColorByMode('light', '#ffffff', '#0f172a') // returns '#ffffff' or '#0f172a' based on mode
 */
export function getColorByMode(mode: 'light' | 'dark', lightColor: string, darkColor: string): string {
  return mode === 'light' ? lightColor : darkColor;
}
