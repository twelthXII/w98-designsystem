import type { TokenGroup } from './types';

/**
 * Stacking order for a desktop composition. Nothing in this system should
 * invent its own z-index; take a step from this ladder.
 */
export const z: TokenGroup = {
  'ground': '0',
  'desktop-icon': '5',
  'window': '10',
  'window-active': '20',
  'toolbar': '30',
  'menu': '40',
  'dropdown': '50',
  'tooltip': '60',
  'dialog': '70',
  'scrim': '65',
  'cursor': '90',
};
