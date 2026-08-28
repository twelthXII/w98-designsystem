import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Tone } from '../types';

export interface PixelIconContainerProps {
  /** The glyph itself: a character, an SVG, or a nested pixel drawing. */
  children: ReactNode;
  /**
   * sm 16px · md 32px · lg 48px · xl 96px.
   * `xl` is for isolated, editorial use — a single system icon as the subject.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Variants
   *  - `plain` — no container, just crisp pixel rendering.
   *  - `raised` — beveled tile, like a toolbar icon.
   *  - `sunken` — recessed well.
   */
  variant?: 'plain' | 'raised' | 'sunken';
  /** Container silhouette. `round` gives the classic dialog badge. */
  shape?: 'none' | 'square' | 'round';
  /** Colours the glyph from the status ramp. */
  tone?: W98Tone;
  className?: string;
}

/**
 * PixelIconContainer — the frame every icon in the system sits in.
 *
 * Its job is discipline: fixed sizes, crisp edges, no smoothing, no scaling
 * artefacts. Any icon set dropped in later inherits correct proportions from
 * this container instead of inventing its own.
 */
export function PixelIconContainer({
  children,
  size = 'md',
  variant = 'plain',
  shape = 'none',
  tone,
  className,
}: PixelIconContainerProps) {
  return (
    <span
      className={cx(
        'w98-pixel-icon',
        `w98-pixel-icon--${size}`,
        `w98-pixel-icon--${variant}`,
        shape !== 'none' && `w98-pixel-icon--${shape}`,
        tone && `w98-pixel-icon--${tone}`,
        className,
      )}
    >
      <span className="w98-pixel-icon__glyph">{children}</span>
    </span>
  );
}
