/**
 * Character inventory for the text-mode layer.
 *
 * These are the raw glyphs the ASCII language is built from. They are kept as
 * data (not as pre-drawn art) so that compositions can generate ASCII that is
 * semantic to their own subject rather than reusing a fixed clip-art library.
 */

/** Density ramps, dark → light. Used to map a value onto a glyph. */
export const ramps = {
  /** Classic shading blocks. The house default. */
  block: ['█', '▓', '▒', '░', ' '],
  /** Punctuation ramp — quieter, better under text. */
  fine: ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '],
  /** Very low contrast. For ambient texture only. */
  faint: ['·', '.', ' '],
  /** Two-state ramp for hard-edged pixel work. */
  binary: ['█', ' '],
} as const;

export type RampName = keyof typeof ramps;

/** Box-drawing sets for frames, rules and diagrams. */
export const boxSets = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│', cross: '┼', teeDown: '┬', teeUp: '┴', teeRight: '├', teeLeft: '┤' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║', cross: '╬', teeDown: '╦', teeUp: '╩', teeRight: '╠', teeLeft: '╣' },
  ascii: { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|', cross: '+', teeDown: '+', teeUp: '+', teeRight: '+', teeLeft: '+' },
  heavy: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃', cross: '╋', teeDown: '┳', teeUp: '┻', teeRight: '┣', teeLeft: '┫' },
} as const;

export type BoxSetName = keyof typeof boxSets;

/** Glyph pools for character cycling and reveal effects. */
export const cyclePools = {
  symbols: ['#', '%', '&', '@', '*', '+', '=', '?', '/', '\\'],
  blocks: ['█', '▉', '▊', '▋', '▌', '▍', '▎', '▏'],
  hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
  binary: ['0', '1'],
  dots: ['·', ':', '∙', '˙'],
} as const;

export type CyclePoolName = keyof typeof cyclePools;

/** Single-glyph marks used as bullets, badges and status flags. */
export const marks = {
  caret: '▮',
  caretThin: '▏',
  bullet: '■',
  bulletOpen: '□',
  arrowRight: '►',
  arrowLeft: '◄',
  arrowUp: '▲',
  arrowDown: '▼',
  check: '√',
  cross: '×',
  ellipsis: '…',
  spinner: ['|', '/', '─', '\\'],
} as const;
