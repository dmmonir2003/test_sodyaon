"use client";

import { useLayoutEffect } from "react";

/**
 * Client-only component that applies the saved theme from localStorage
 * before the browser paints, preventing any visible flash of wrong theme.
 * This approach avoids the Turbopack "script tag in React component" warning.
 */
export default function ThemeInitializer() {
  useLayoutEffect(() => {
    try {
      const theme = localStorage.getItem('preferred-theme') || 'ocean-explorer';
      document.documentElement.setAttribute('data-theme', theme);

      let bgTheme = localStorage.getItem('bg-theme');
      if (!bgTheme) {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        bgTheme = isDark ? 'dark' : 'light';
      }

      document.documentElement.setAttribute('data-bg', bgTheme);

      if (['dark', 'dim', 'midnight'].includes(bgTheme)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  return null;
}
