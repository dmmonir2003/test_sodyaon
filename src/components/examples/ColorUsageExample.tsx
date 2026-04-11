'use client';

import { SEMANTIC_COLORS, getColor, getButtonColors, getColorByMode } from '@/config/colors';

/**
 * COLOR USAGE EXAMPLE COMPONENT
 * 
 * This component demonstrates how to use the SEMANTIC_COLORS configuration
 * to change colors globally across your entire application.
 * 
 * There are multiple ways to access colors:
 * 1. Direct object access: SEMANTIC_COLORS.button.primary.hover
 * 2. Using getColor() helper: getColor('button.primary.hover')
 * 3. Using component helpers: getButtonColors('primary')
 * 4. Using mode helper: getColorByMode('light', lightColor, darkColor)
 */

export default function ColorUsageExample() {
  // Method 1: Direct access to colors
  const primaryButtonColor = SEMANTIC_COLORS.button.primary.default;
  const primaryButtonHover = SEMANTIC_COLORS.button.primary.hover;

  // Method 2: Using getColor() helper function
  const secondaryHover = getColor('button.secondary.hover');

  // Method 3: Get all colors for a specific component
  const accentButtonColors = getButtonColors('accent');

  // Method 4: Get colors based on light/dark mode
  const navBackground = getColorByMode('light', 
    SEMANTIC_COLORS.nav.background, 
    SEMANTIC_COLORS.nav.backgroundDark
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: SEMANTIC_COLORS.text.primary }}>
        Color Configuration Examples
      </h2>

      {/* Example 1: Button with semantic colors */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: SEMANTIC_COLORS.text.secondary }}>Primary Button</h3>
        <button
          style={{
            backgroundColor: primaryButtonColor,
            color: SEMANTIC_COLORS.button.primary.text,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = primaryButtonHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = primaryButtonColor;
          }}
        >
          Hover me (Using Direct Access)
        </button>
      </div>

      {/* Example 2: Secondary button using getColor() helper */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: SEMANTIC_COLORS.text.secondary }}>Secondary Button</h3>
        <button
          style={{
            backgroundColor: SEMANTIC_COLORS.button.secondary.default,
            color: SEMANTIC_COLORS.button.secondary.text,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = secondaryHover || '#0284c7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = SEMANTIC_COLORS.button.secondary.default;
          }}
        >
          Hover me (Using getColor helper)
        </button>
      </div>

      {/* Example 3: Card with theme colors */}
      <div
        style={{
          backgroundColor: SEMANTIC_COLORS.card.background,
          border: `1px solid ${SEMANTIC_COLORS.card.border}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: `0 0 20px ${SEMANTIC_COLORS.card.shadow}`,
        }}
      >
        <h3 style={{ color: SEMANTIC_COLORS.text.primary, margin: '0 0 10px 0' }}>
          Card Component
        </h3>
        <p style={{ color: SEMANTIC_COLORS.text.secondary, margin: 0 }}>
          This card uses SEMANTIC_COLORS.card.* for consistent styling
        </p>
      </div>

      {/* Example 4: Badge/Pills */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: SEMANTIC_COLORS.text.secondary }}>Status Badges</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Success Badge */}
          <span
            style={{
              backgroundColor: SEMANTIC_COLORS.badge.success.background,
              color: SEMANTIC_COLORS.badge.success.text,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ✓ Success
          </span>

          {/* Warning Badge */}
          <span
            style={{
              backgroundColor: SEMANTIC_COLORS.badge.warning.background,
              color: SEMANTIC_COLORS.badge.warning.text,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ⚠ Warning
          </span>

          {/* Danger Badge */}
          <span
            style={{
              backgroundColor: SEMANTIC_COLORS.badge.danger.background,
              color: SEMANTIC_COLORS.badge.danger.text,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ✕ Error
          </span>

          {/* Info Badge */}
          <span
            style={{
              backgroundColor: SEMANTIC_COLORS.badge.info.background,
              color: SEMANTIC_COLORS.badge.info.text,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ℹ Info
          </span>
        </div>
      </div>

      {/* Example 5: Form Input */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: SEMANTIC_COLORS.text.secondary }}>Form Input</h3>
        <input
          type="text"
          placeholder="Type something..."
          style={{
            width: '100%',
            padding: '10px 12px',
            backgroundColor: SEMANTIC_COLORS.form.input.background,
            color: SEMANTIC_COLORS.form.input.text,
            border: `2px solid ${SEMANTIC_COLORS.form.input.border}`,
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = SEMANTIC_COLORS.form.input.borderFocus;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = SEMANTIC_COLORS.form.input.border;
          }}
        />
      </div>

      {/* Info Section */}
      <div
        style={{
          backgroundColor: SEMANTIC_COLORS.badge.info.background,
          color: SEMANTIC_COLORS.badge.info.text,
          border: `1px solid ${SEMANTIC_COLORS.badge.info.text}`,
          borderRadius: '8px',
          padding: '15px',
          marginTop: '20px',
        }}
      >
        <h4 style={{ marginTop: 0 }}>How to Change Colors Globally</h4>
        <ol style={{ marginBottom: 0 }}>
          <li>Edit <code>/src/config/colors.ts</code></li>
          <li>Modify the SEMANTIC_COLORS object values</li>
          <li>All components using these colors will update automatically!</li>
          <li>No need to change individual component styles</li>
        </ol>
      </div>
    </div>
  );
}
