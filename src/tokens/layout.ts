import type { TokenGroup } from './types';

/**
 * Fixed chrome metrics. These are the numbers that make a control *read* as
 * Windows 98 rather than as a generic square button.
 *
 * `*-lg` variants exist because this system is allowed to render oversized
 * windows and isolated controls at editorial scale — the proportions stay,
 * the pixel size grows.
 */
export const layout: TokenGroup = {
  'title-bar-height': '18px',
  'title-bar-height-lg': '28px',
  'title-button-size': '14px',
  'title-button-size-lg': '22px',
  'menu-bar-height': '20px',
  'status-bar-height': '20px',
  'toolbar-height': '26px',
  'scrollbar-size': '16px',
  'scrollbar-size-lg': '24px',

  'control-height-sm': '18px',
  'control-height': '23px',
  'control-height-lg': '32px',
  'control-min-width': '75px',

  'icon-sm': '16px',
  'icon-md': '32px',
  'icon-lg': '48px',

  'cursor-sm': '20px',
  'cursor-md': '32px',
  'cursor-lg': '64px',
  'cursor-xl': '120px',

  'window-min-width': '160px',
  'dialog-width': '360px',
  'canvas-gutter': '32px',
  'canvas-gutter-lg': '64px',
};
