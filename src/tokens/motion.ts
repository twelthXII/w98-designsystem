import type { TokenGroup } from './types';

/**
 * Motion tokens are the raw material. The *rules* for how they combine live in
 * `src/motion` (ACTIVE vs PASSIVE motion classes).
 *
 * Two things make motion read as late-90s rather than as modern product motion:
 *  - short durations (most UI feedback is under 200ms, some is instant);
 *  - stepped timing. A progress bar, a character cycle and an ASCII loop should
 *    quantise, not glide. That is what `step-*` is for.
 */
export const motion: TokenGroup = {
  /* --- duration --------------------------------------------------------- */
  'duration-instant': '0ms',
  'duration-tap': '80ms',
  'duration-fast': '120ms',
  'duration-base': '180ms',
  'duration-window': '240ms',
  'duration-slow': '360ms',
  'duration-sequence': '640ms',
  'duration-ambient': '1200ms',
  'duration-ambient-slow': '2400ms',
  'duration-ambient-drift': '4800ms',

  /* --- easing ----------------------------------------------------------- */
  'ease-linear': 'linear',
  /** Default for functional UI feedback. Fast out, settled end. */
  'ease-ui': 'cubic-bezier(0.2, 0, 0, 1)',
  /** Pointer travel: accelerates out of rest, decelerates onto target. */
  'ease-cursor': 'cubic-bezier(0.33, 0, 0.15, 1)',
  /** Window/dialog appearance. */
  'ease-open': 'cubic-bezier(0.16, 0.84, 0.44, 1)',
  /** Window/dialog dismissal. */
  'ease-close': 'cubic-bezier(0.6, 0, 0.9, 0.3)',

  /* --- stepped timing (text-mode / quantised motion) -------------------- */
  'step-1': 'steps(1, end)',
  'step-2': 'steps(2, end)',
  'step-4': 'steps(4, end)',
  'step-8': 'steps(8, end)',
  'step-12': 'steps(12, end)',
  'step-24': 'steps(24, end)',

  /* --- rhythm ----------------------------------------------------------- */
  'stagger': '60ms',
  'stagger-slow': '120ms',
  'dwell': '400ms',
  'blink-rate': '1060ms',
};
