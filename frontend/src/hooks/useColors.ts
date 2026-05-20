'use client';

import { useEffect, useState } from 'react';
import {
  PRIMARY,
  SECONDARY,
  ACCENT,
  SUCCESS,
  WARNING,
  DANGER,
  INFO,
  NEUTRAL,
  LIGHT_MODE,
  DARK_MODE,
  COMPONENT_COLORS,
  getColorValue,
  getButtonColors,
  getLinkColors,
  getBadgeColors,
} from '@/config/colors-extended';

/**
 * USECOLORS HOOK
 * ==============
 * React hook for accessing theme colors with automatic dark mode detection
 * 
 * Usage in components:
 * const colors = useColors();
 * 
 * Access colors:
 * colors.button.primary.background
 * colors.nav.text
 * colors.success.default
 */
export function useColors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(prefersDark || hasDarkClass);

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Listen for class changes
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  return {
    // ===== Base Colors =====
    primary: PRIMARY,
    secondary: SECONDARY,
    accent: ACCENT,
    success: SUCCESS,
    warning: WARNING,
    danger: DANGER,
    info: INFO,
    neutral: NEUTRAL,

    // ===== Mode-specific Colors =====
    light: LIGHT_MODE,
    dark: DARK_MODE,

    // ===== Component Colors =====
    button: {
      primary: getButtonColors('primary'),
      secondary: getButtonColors('secondary'),
      accent: getButtonColors('accent'),
      danger: getButtonColors('danger'),
      ghost: getButtonColors('ghost'),
    },

    link: {
      primary: getLinkColors('primary'),
      secondary: getLinkColors('secondary'),
    },

    badge: {
      primary: getBadgeColors('primary'),
      success: getBadgeColors('success'),
      warning: getBadgeColors('warning'),
      danger: getBadgeColors('danger'),
      info: getBadgeColors('info'),
    },

    nav: COMPONENT_COLORS.nav,
    card: COMPONENT_COLORS.card,
    form: COMPONENT_COLORS.form,

    // ===== Utility Functions =====
    get: (path: string) => getColorValue(path),
    getButton: (variant: string) => getButtonColors(variant as any),
    getLink: (variant: string) => getLinkColors(variant as any),
    getBadge: (variant: string) => getBadgeColors(variant as any),

    // ===== Mode Info =====
    isDark,
    mode: isDark ? 'dark' : 'light',

    // ===== Conditional Color Helper =====
    modeColor: (lightColor: string, darkColor: string) => isDark ? darkColor : lightColor,
  };
}

/**
 * COLOR CONSTANTS FOR DIRECT IMPORT
 * Use this when you don't need dynamic color switching
 */
export const colors = {
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: ACCENT,
  success: SUCCESS,
  warning: WARNING,
  danger: DANGER,
  info: INFO,
  neutral: NEUTRAL,
  light: LIGHT_MODE,
  dark: DARK_MODE,
  components: COMPONENT_COLORS,
} as const;
