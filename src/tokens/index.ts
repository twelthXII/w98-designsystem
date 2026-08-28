import { color } from './color';
import { typography } from './typography';
import { space } from './space';
import { border, bevel } from './border';
import { shadow } from './shadow';
import { motion } from './motion';
import { ascii } from './ascii';
import { layout } from './layout';
import { z } from './z';
import type { TokenGroupDefinition } from './types';

export { color, typography, space, border, bevel, shadow, motion, ascii, layout, z };
export type { TokenValue, TokenGroup, TokenGroupName, TokenGroupDefinition } from './types';

/**
 * The token registry. Order matters: primitives are emitted before the
 * composite groups that reference them.
 */
export const tokenGroups: TokenGroupDefinition[] = [
  { name: 'color', doc: 'System palette. Substrate greys are fixed; status colours are calibration candidates.', tokens: color },
  { name: 'type', doc: 'UI type, editorial display type, and the monospaced ASCII family.', tokens: typography },
  { name: 'space', doc: 'Pixel-locked spacing scale. Keys are pixel values.', tokens: space },
  { name: 'border', doc: 'Line weights and focus styling. Radius is always 0.', tokens: border },
  { name: 'bevel', doc: 'Composite two-step light/dark insets. The core Windows 98 detail.', tokens: bevel },
  { name: 'shadow', doc: 'Hard offset shadows only. No blur, no glow.', tokens: shadow },
  { name: 'motion', doc: 'Durations, easings and stepped timing. Rules live in src/motion.', tokens: motion },
  { name: 'ascii', doc: 'Text-mode grid metrics and per-role optical weight.', tokens: ascii },
  { name: 'layout', doc: 'Fixed chrome metrics, with oversized variants for editorial scale.', tokens: layout },
  { name: 'z', doc: 'Stacking ladder for desktop compositions.', tokens: z },
];

export const tokens = { color, typography, space, border, bevel, shadow, motion, ascii, layout, z } as const;

/** CSS custom property name for a token, e.g. `cssVarName('color', 'surface')`. */
export function cssVarName(group: string, key: string): string {
  return `--w98-${group}-${key}`;
}

/** `var(--w98-…)` reference for a token, ready to drop into a style object. */
export function cssVar(group: string, key: string, fallback?: string): string {
  const name = cssVarName(group, key);
  return fallback ? `var(${name}, ${fallback})` : `var(${name})`;
}
