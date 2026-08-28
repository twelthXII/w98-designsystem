/**
 * Pixel cursors, stored as bitmaps rather than as vector art.
 *
 * `K` = ink (black by default), `W` = fill (white by default), `.` = transparent.
 * Storing them as grids keeps them honestly pixel-aligned at any size and lets a
 * composition recolour them without new assets.
 */
export type CursorBitmap = readonly string[];

const arrow: CursorBitmap = [
  'K...........',
  'KK..........',
  'KWK.........',
  'KWWK........',
  'KWWWK.......',
  'KWWWWK......',
  'KWWWWWK.....',
  'KWWWWWWK....',
  'KWWWWWWWK...',
  'KWWWWWWWWK..',
  'KWWWWWKKKKK.',
  'KWWKWWK.....',
  'KWK.KWWK....',
  'KK..KWWK....',
  'K....KWWK...',
  '.....KWWK...',
  '......KWWK..',
  '......KWWK..',
  '.......KK...',
];

const text: CursorBitmap = [
  'KKK.KKK',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  '...K...',
  'KKK.KKK',
];

const busy: CursorBitmap = [
  'KKKKKKKKKK',
  'KWWWWWWWWK',
  'KWWWWWWWWK',
  'KWKKKKKKWK',
  '.KWWWWWWK.',
  '..KWWWWK..',
  '...KWWK...',
  '....KK....',
  '....KK....',
  '...KWWK...',
  '..KWWWWK..',
  '.KWWWWWWK.',
  'KWKKKKKKWK',
  'KWWWWWWWWK',
  'KWWWWWWWWK',
  'KKKKKKKKKK',
];

const pointer: CursorBitmap = [
  '...KK......',
  '..KWWK.....',
  '..KWWK.....',
  '..KWWK.....',
  '..KWWK.....',
  '..KWWKKK...',
  '..KWWKWWKK.',
  '..KWWKWWKWK',
  'KKKWWWWWWWK',
  'KWKWWWWWWWK',
  'KWWWWWWWWWK',
  '.KWWWWWWWWK',
  '.KWWWWWWWK.',
  '..KWWWWWWK.',
  '..KWWWWWWK.',
  '..KKKKKKKK.',
];

const crosshair: CursorBitmap = [
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  'KKKKKKKKKKKKK',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
];

const move: CursorBitmap = [
  '.......K.......',
  '......KWK......',
  '.....KWWWK.....',
  '.......K.......',
  '...K...K...K...',
  '..KW...K...WK..',
  '.KWWKKKKKKKWWK.',
  'KWWWWWWWWWWWWWK',
  '.KWWKKKKKKKWWK.',
  '..KW...K...WK..',
  '...K...K...K...',
  '.......K.......',
  '.....KWWWK.....',
  '......KWK......',
  '.......K.......',
];

/**
 * The cursor set. Deliberately small — these are the pointers a desktop
 * composition actually needs. Add a shape only when a composition needs it,
 * not speculatively.
 */
export const cursorShapes = {
  /** The arrow. The narrator of every desktop composition. */
  default: arrow,
  /** Hand. Something is clickable — or being pointed at. */
  pointer,
  /** I-beam. Text is editable; a person is about to write. */
  text,
  /** Hourglass. The system is busy; the beat is being held. */
  busy,
  /** Crosshair. Precision, targeting, measurement. */
  crosshair,
  /** Four-way arrows. Something is being repositioned. */
  move,
} as const;

export type CursorShape = keyof typeof cursorShapes;

/** Hotspot (in cells) for each shape — where the pointer actually points. */
export const cursorHotspots: Record<CursorShape, { x: number; y: number }> = {
  default: { x: 0, y: 0 },
  pointer: { x: 4, y: 0 },
  text: { x: 3, y: 6 },
  busy: { x: 5, y: 8 },
  crosshair: { x: 6, y: 6 },
  move: { x: 7, y: 7 },
};
