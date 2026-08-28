import type { TokenGroup } from './types';

/**
 * Shadows are hard-edged and offset only. No blur, no colour tint, no glow.
 *
 * They exist for one purpose: lifting an oversized window or an isolated
 * control off an editorial ground. If a composition needs more than one
 * shadowed element, it is over-stacked — remove windows instead.
 */
export const shadow: TokenGroup = {
  'none': 'none',
  'hard-sm': '2px 2px 0 var(--w98-color-shadow-hard)',
  'hard-md': '4px 4px 0 var(--w98-color-shadow-hard)',
  'hard-lg': '8px 8px 0 var(--w98-color-shadow-hard)',
  'drop-window': '6px 6px 0 var(--w98-color-shadow-hard)',
};
