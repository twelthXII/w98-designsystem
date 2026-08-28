import type { TokenGroup } from './types';

/**
 * NOTE: exported as `typography`, emitted under the CSS group `type`
 * (`--w98-type-size-display-lg`). The short CSS prefix keeps stylesheets legible.
 *
 * Two type roles, held apart on purpose:
 *
 *  - UI type      — small, pixel-locked, never below 11px, never decorative.
 *  - Display type — editorial scale. This is what carries the message and is
 *                   allowed to be very large. It uses the same family so the
 *                   composition still reads as one operating system.
 *  - Mono/ASCII   — the text-mode layer. Must be monospaced; line-height 1.
 *
 * CALIBRATION NOTE: the display ramp is a starting scale. Expect the top three
 * steps to be re-tuned after visual references.
 */
export const typography: TokenGroup = {
  /* --- families --------------------------------------------------------- */
  'family-ui':
    '"Pixelated MS Sans Serif", "MS Sans Serif", Tahoma, "Segoe UI", system-ui, sans-serif',
  'family-display':
    '"Pixelated MS Sans Serif", "MS Sans Serif", Tahoma, "Segoe UI", system-ui, sans-serif',
  'family-mono':
    '"MS Gothic", "IBM Plex Mono", "Courier New", ui-monospace, SFMono-Regular, monospace',

  /* --- ui scale --------------------------------------------------------- */
  'size-ui-xs': '11px',
  'size-ui-sm': '12px',
  'size-ui-md': '14px',
  'size-ui-lg': '16px',

  /* --- display scale ---------------------------------------------------- */
  'size-display-xs': '24px',
  'size-display-sm': '32px',
  'size-display-md': '44px',
  'size-display-lg': '60px',
  'size-display-xl': '80px',
  'size-display-2xl': '112px',

  /* --- leading ---------------------------------------------------------- */
  'leading-flat': '1',
  'leading-ui': '1.15',
  'leading-display': '1.05',
  'leading-prose': '1.45',

  /* --- tracking --------------------------------------------------------- */
  'tracking-ui': '0',
  'tracking-display': '-0.02em',
  'tracking-caps': '0.08em',

  /* --- weight ----------------------------------------------------------- */
  'weight-regular': '400',
  'weight-bold': '700',
};
