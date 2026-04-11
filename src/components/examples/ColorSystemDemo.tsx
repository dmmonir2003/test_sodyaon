'use client';

import { useColors, colors } from '@/hooks/useColors';
import { COMPONENT_COLORS, getButtonColors, PRIMARY, SECONDARY, ACCENT } from '@/config/colors-extended';

/**
 * COLOR SYSTEM DEMO
 * Shows 5 different methods to use the centralized color system
 */

// ============================================
// METHOD 1: Using useColors Hook (Recommended)
// ============================================
export function Method1_UseColorsHook() {
  const colors = useColors();

  return (
    <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: colors.card.background }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: colors.light.foreground }}>
        Method 1: useColors Hook
      </h3>
      <button
        style={{
          backgroundColor: colors.button.primary.background,
          color: colors.button.primary.text,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.button.primary.backgroundHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.button.primary.background;
        }}
      >
        Hover me (Primary)
      </button>
      <p style={{ color: colors.light.foregroundMuted, marginTop: '10px', fontSize: '12px' }}>
        ✓ Supports dark mode auto-detection
        <br />✓ Real-time color updates
        <br />✓ Recommended for interactive components
      </p>
    </div>
  );
}

// ============================================
// METHOD 2: Direct Import - Static Colors
// ============================================
export function Method2_DirectImport() {
  return (
    <div
      className="p-6 rounded-lg mb-4"
      style={{
        backgroundColor: COMPONENT_COLORS.card.background,
        borderColor: COMPONENT_COLORS.card.border,
        borderWidth: '1px',
      }}
    >
      <h3
        className="text-lg font-bold mb-4"
        style={{ color: COMPONENT_COLORS.nav.text }}
      >
        Method 2: Direct Import
      </h3>
      <button
        style={{
          backgroundColor: getButtonColors('secondary').background,
          color: getButtonColors('secondary').text,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Secondary Button
      </button>
      <p style={{ color: COMPONENT_COLORS.nav.text, marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
        ✓ Direct access to color constants
        <br />✓ No hooks needed
        <br />✓ Best for static/non-interactive colors
      </p>
    </div>
  );
}

// ============================================
// METHOD 3: Using Base Color Palettes
// ============================================
export function Method3_BaseColorPalettes() {
  return (
    <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: PRIMARY[50] }}>
      <h3 style={{ color: PRIMARY[900] }} className="text-lg font-bold mb-4">
        Method 3: Base Color Palettes
      </h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
          <div
            key={shade}
            style={{
              backgroundColor: PRIMARY[shade as keyof typeof PRIMARY],
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: shade > 500 ? '#fff' : '#000',
            }}
          >
            {shade}
          </div>
        ))}
      </div>
      <p style={{ color: PRIMARY[700], marginTop: '10px', fontSize: '12px' }}>
        ✓ Access all color shades (50-900)
        <br />✓ Full color palette flexibility
        <br />✓ Perfect for color-sensitive designs
      </p>
    </div>
  );
}

// ============================================
// METHOD 4: Using Semantic Colors for Status
// ============================================
export function Method4_SemanticColors() {
  const colors = useColors();

  return (
    <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: colors.light.background }}>
      <h3 style={{ color: colors.light.foreground }} className="text-lg font-bold mb-4">
        Method 4: Semantic Status Colors
      </h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div
          style={{
            padding: '10px 15px',
            backgroundColor: colors.badge.success.background,
            color: colors.badge.success.text,
            borderRadius: '20px',
            fontSize: '14px',
          }}
        >
          ✓ Success
        </div>
        <div
          style={{
            padding: '10px 15px',
            backgroundColor: colors.badge.warning.background,
            color: colors.badge.warning.text,
            borderRadius: '20px',
            fontSize: '14px',
          }}
        >
          ⚠ Warning
        </div>
        <div
          style={{
            padding: '10px 15px',
            backgroundColor: colors.badge.danger.background,
            color: colors.badge.danger.text,
            borderRadius: '20px',
            fontSize: '14px',
          }}
        >
          ✕ Error
        </div>
        <div
          style={{
            padding: '10px 15px',
            backgroundColor: colors.badge.info.background,
            color: colors.badge.info.text,
            borderRadius: '20px',
            fontSize: '14px',
          }}
        >
          ℹ Info
        </div>
      </div>
      <p style={{ color: colors.light.foregroundMuted, marginTop: '10px', fontSize: '12px' }}>
        ✓ Pre-configured status colors
        <br />✓ Light and dark mode support
        <br />✓ Perfect for alerts and feedback
      </p>
    </div>
  );
}

// ============================================
// METHOD 5: Color Helper Functions
// ============================================
export function Method5_HelperFunctions() {
  const colors = useColors();

  return (
    <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: colors.card.background }}>
      <h3 style={{ color: colors.nav.text }} className="text-lg font-bold mb-4">
        Method 5: Helper Functions
      </h3>
      <div
        style={{
          padding: '15px',
          backgroundColor: colors.modeColor(SECONDARY[400], SECONDARY[600]),
          color: '#fff',
          borderRadius: '6px',
          marginBottom: '10px',
        }}
      >
        This box changes color based on light/dark mode!
        <br />
        <small>Current mode: {colors.mode.toUpperCase()}</small>
      </div>
      <p style={{ color: colors.light.foregroundMuted, fontSize: '12px' }}>
        ✓ Automatic light/dark detection
        <br />✓ Utility functions for complex logic
        <br />✓ Great for responsive designs
      </p>
    </div>
  );
}

// ============================================
// MAIN DEMO COMPONENT
// ============================================
export function ColorSystemDemo() {
  const colors = useColors();

  return (
    <div style={{ backgroundColor: colors.light.background, padding: '40px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: colors.primary[600], marginBottom: '10px' }}>
          Centralized Color System Demo
        </h1>
        <p style={{ color: colors.light.foregroundMuted, marginBottom: '30px' }}>
          All colors are defined in <code>/src/config/colors-extended.ts</code>. Change a color there and it updates everywhere!
        </p>

        <Method1_UseColorsHook />
        <Method2_DirectImport />
        <Method3_BaseColorPalettes />
        <Method4_SemanticColors />
        <Method5_HelperFunctions />

        <div
          style={{
            backgroundColor: colors.badge.info.background,
            color: colors.badge.info.text,
            padding: '15px',
            borderRadius: '6px',
            marginTop: '20px',
          }}
        >
          <strong>💡 Quick Tip:</strong> To change colors across the entire app, edit one file:
          <code style={{ display: 'block', marginTop: '8px' }}>/src/config/colors-extended.ts</code>
        </div>
      </div>
    </div>
  );
}
