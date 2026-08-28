import type { TokenGroup } from './types';

/**
 * Colour is deliberately small and system-accurate.
 *
 * Three layers:
 *  1. `surface` / `bevel-*` — the Windows 98 control substrate. Non-negotiable.
 *  2. `title-*` / `select-*` — system chrome accents (the classic blue).
 *  3. `ascii-*` / editorial neutrals — the secondary text-mode layer.
 *
 * CALIBRATION NOTE: `status-*` and the editorial neutrals are the only values
 * expected to move once visual references land. The system substrate should not.
 */
export const color: TokenGroup = {
  /* --- desktop grounds ------------------------------------------------- */
  'desktop': '#008080',
  'desktop-alt': '#3a6ea5',
  'paper': '#ffffff',
  'void': '#000000',

  /* --- control substrate ----------------------------------------------- */
  'surface': '#c0c0c0',
  'surface-raised': '#dfdfdf',
  'surface-sunken': '#a8a8a8',
  'field': '#ffffff',

  /* --- bevel ramp (light -> dark) --------------------------------------- */
  'bevel-light': '#ffffff',
  'bevel-face': '#dfdfdf',
  'bevel-shadow': '#808080',
  'bevel-dark': '#0a0a0a',

  /* --- ink -------------------------------------------------------------- */
  'ink': '#000000',
  'ink-muted': '#404040',
  'ink-disabled': '#808080',
  'ink-emboss': '#ffffff',
  'ink-inverse': '#ffffff',

  /* --- window chrome ---------------------------------------------------- */
  'title-active-start': '#000080',
  'title-active-end': '#1084d0',
  'title-inactive-start': '#808080',
  'title-inactive-end': '#b5b5b5',
  'title-ink': '#ffffff',
  'title-ink-inactive': '#dfdfdf',

  /* --- interaction ------------------------------------------------------ */
  'select-bg': '#000080',
  'select-ink': '#ffffff',
  'link': '#0000ff',
  'highlight': '#ffff00',

  /* --- status (VGA-derived, calibration candidate) ---------------------- */
  'status-info': '#000080',
  'status-ok': '#008000',
  'status-warning': '#808000',
  'status-error': '#800000',

  /* --- ascii layer ------------------------------------------------------ */
  'ascii-ink': '#000000',
  'ascii-ink-dim': '#808080',
  'ascii-ink-faint': '#a8a8a8',
  'ascii-surface': '#000000',
  'ascii-surface-ink': '#c0c0c0',

  /* --- effects ---------------------------------------------------------- */
  'shadow-hard': 'rgba(0, 0, 0, 0.35)',
  'scrim': 'rgba(0, 0, 0, 0.45)',
};
