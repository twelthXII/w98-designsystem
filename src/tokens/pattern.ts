import type { TokenGroup } from './types';

/**
 * Repeating pixel patterns.
 *
 * Windows 98 fills several surfaces with a 2×2 checkerboard rather than a flat
 * colour — the scrollbar track most visibly, and the desktop pattern picker
 * behind it. The pattern is expressed as tokens (two colours plus a cell size)
 * and composed once by the `.w98-pattern-checker` utility in `base.css`, so a
 * component never hand-rolls a background.
 *
 * CALIBRATION NOTE: the ink/ground pair and the cell size are the calibration
 * surface here. The authentic scrollbar track is a 1px checker of system grey
 * against white; whether that is what this system ships is a decision for the
 * Windows 98 fidelity pass, not a default to lock in now.
 */
export const pattern: TokenGroup = {
  /** The ground the checker sits on. */
  'checker-ground': 'var(--w98-color-surface)',
  /** The alternating square. */
  'checker-ink': 'var(--w98-color-bevel-light)',
  /** Cell size. The offset copy is drawn at half this value. */
  'checker-cell': '2px',
};
