import type { TokenGroup } from './types';

/**
 * Spacing is a pixel scale, not a rem scale: this system is pixel-locked.
 * Keys are the pixel value, which keeps chrome maths (2px bevels, 4px insets)
 * readable at the call site.
 *
 * 1–8   → control-internal spacing (chrome).
 * 12–32 → component and panel spacing.
 * 48+   → editorial whitespace. This is where the system stops looking like a
 *         screenshot and starts looking like a composition.
 */
export const space: TokenGroup = {
  '0': '0',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '6': '6px',
  '8': '8px',
  '12': '12px',
  '16': '16px',
  '24': '24px',
  '32': '32px',
  '48': '48px',
  '64': '64px',
  '96': '96px',
  '128': '128px',
};
