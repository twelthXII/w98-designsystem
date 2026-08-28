import type { TokenGroup } from './types';

/**
 * The ASCII layer is a *secondary* language. These tokens keep it subordinate:
 * it sits on a monospaced grid, at a lower optical weight than the message, and
 * at a size that never competes with display type.
 *
 * Character sets and density ramps are not CSS values — they live in
 * `src/ascii/charsets.ts`.
 */
export const ascii: TokenGroup = {
  'size-xs': '9px',
  'size-sm': '11px',
  'size-md': '13px',
  'size-lg': '17px',
  'size-xl': '24px',

  /** Never change this. A monospaced grid needs an exact 1.0 line box. */
  'leading': '1',
  'tracking': '0',

  /** One character cell, used for grid maths and for cropping. */
  'cell': '1ch',

  /* --- optical weight by role ------------------------------------------- */
  /** Ambient texture behind or beside content. Must stay quiet. */
  'opacity-ambient': '0.35',
  /** Decorative marks that give character but carry no meaning. */
  'opacity-decorative': '0.6',
  /** Illustrative / semantic drawings. Reads as content. */
  'opacity-primary': '1',
};
