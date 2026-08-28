import type { TokenGroup } from './types';

/** Line weights. The system has exactly three, and no corner radius, ever. */
export const border: TokenGroup = {
  'width-hairline': '1px',
  'width-bevel': '2px',
  'width-frame': '4px',
  'radius': '0',
  'focus-style': '1px dotted var(--w98-color-ink)',
  'focus-offset': '-4px',
};

/**
 * Bevels are the load-bearing detail of the whole language: a Windows 98
 * control is defined by a two-step light/dark inset, never by a border-radius
 * or a soft shadow.
 *
 * Read each value as: outer-dark, outer-light, inner-shadow, inner-face.
 */
export const bevel: TokenGroup = {
  /** Buttons, toolbars, unpressed controls. */
  'raised':
    'inset -1px -1px var(--w98-color-bevel-dark), inset 1px 1px var(--w98-color-bevel-light), inset -2px -2px var(--w98-color-bevel-shadow), inset 2px 2px var(--w98-color-bevel-face)',
  /** Active/held state of any raised control. */
  'pressed':
    'inset -1px -1px var(--w98-color-bevel-light), inset 1px 1px var(--w98-color-bevel-dark), inset -2px -2px var(--w98-color-bevel-face), inset 2px 2px var(--w98-color-bevel-shadow)',
  /** Window and dialog frames — one step softer than a button. */
  'window':
    'inset -1px -1px var(--w98-color-bevel-dark), inset 1px 1px var(--w98-color-bevel-face), inset -2px -2px var(--w98-color-bevel-shadow), inset 2px 2px var(--w98-color-bevel-light)',
  /** Text inputs, list boxes, anything that receives content. */
  'field':
    'inset -1px -1px var(--w98-color-bevel-light), inset 1px 1px var(--w98-color-bevel-shadow), inset -2px -2px var(--w98-color-bevel-face), inset 2px 2px var(--w98-color-bevel-dark)',
  /** Group boxes and separators — a single etched line. */
  'etched':
    'inset -1px -1px var(--w98-color-bevel-light), inset 1px 1px var(--w98-color-bevel-shadow)',
  /** Status bar wells and thin sunken slots. */
  'engraved':
    'inset -1px -1px var(--w98-color-bevel-face), inset 1px 1px var(--w98-color-bevel-shadow)',
  /** Menu items and flat toolbar buttons on hover. */
  'outline': 'inset 0 0 0 1px var(--w98-color-bevel-dark)',
  'none': 'none',
};
