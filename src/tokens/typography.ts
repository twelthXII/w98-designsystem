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
 *
 * FALLBACK POLICY: every stack ends in a face that actually ships with an OS,
 * never in `system-ui` / `ui-monospace`. Those keywords resolve to whatever the
 * host platform defaults to (SF Pro, Roboto, Segoe UI), which silently replaces
 * the system face with a modern grotesque and makes rendering non-deterministic
 * across machines. The chains below always land somewhere period-appropriate:
 *
 *   UI    Windows → MS Sans Serif / Tahoma · macOS → Tahoma, else Verdana
 *         Linux → DejaVu Sans (Verdana metric-compatible)
 *   Mono  Windows → Consolas · macOS → Menlo · Linux → DejaVu Sans Mono
 *
 * The mono stack is ordered by GLYPH COVERAGE, not by preference, because the
 * ASCII layer renders on a 1ch grid and per-glyph fallback silently changes the
 * advance width. Measured on macOS: Menlo carries all 58 glyphs of the ASCII
 * inventory (shading ramps, three box-drawing weights, marks); Monaco carries
 * 19 and hands the rest to a fallback ~0.31px/char narrower, which visibly
 * misaligns any figure that mixes ramps with frames.
 *
 * `MS Gothic` and other CJK faces are deliberately excluded despite being
 * period-correct: they render box-drawing and block elements as East Asian
 * Wide (double-width) against half-width Latin, which breaks the grid outright.
 * Audit any new candidate with .design-sync/tools/mono-audit.mjs before adding it.
 *
 * Tahoma and Verdana share a designer and a skeleton, so the macOS fallback is
 * the same lineage rather than a different voice. No font is bundled: the real
 * MS faces are not redistributable, and picking a substitute display face is a
 * calibration decision (docs/CALIBRATION.md), not a fallback decision.
 */
export const typography: TokenGroup = {
  /* --- families --------------------------------------------------------- */
  'family-ui':
    '"Pixelated MS Sans Serif", "MS Sans Serif", Tahoma, Verdana, "DejaVu Sans", "Bitstream Vera Sans", sans-serif',
  'family-display':
    '"Pixelated MS Sans Serif", "MS Sans Serif", Tahoma, Verdana, "DejaVu Sans", "Bitstream Vera Sans", sans-serif',
  'family-mono':
    'Consolas, Menlo, "DejaVu Sans Mono", "Liberation Mono", "Courier New", monospace',

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
