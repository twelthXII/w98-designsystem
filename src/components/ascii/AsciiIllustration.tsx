import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { AsciiCanvas } from './AsciiCanvas';
import type { AsciiRole } from '../types';

export interface AsciiIllustrationProps {
  /** The drawing, as a multi-line string. Composition-supplied, never bundled. */
  figure: string;
  /**
   * Frame list for a passive loop. No runtime ships here — a composition drives
   * `frameIndex`. See motion spec `ascii-loop`.
   */
  frames?: string[];
  frameIndex?: number;
  /**
   * @see AsciiRole
   * `semantic` and `illustrative` figures are content and are announced to
   * assistive technology via `alt`; `decorative` and `ambient` ones are hidden.
   */
  role?: AsciiRole;
  /** Text description. Required for semantic and illustrative roles. */
  alt?: string;
  /** Caption drawn beneath the figure in UI type. */
  caption?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Framing
   *  - `none` — the figure floats.
   *  - `field` — sunken well, as if it were content in a window.
   *  - `terminal` — dark text-mode panel.
   */
  surface?: 'none' | 'field' | 'terminal';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * AsciiIllustration — a text-mode drawing with a declared job.
 *
 * The `role` prop is the important one. ASCII in this system is a *secondary*
 * language: it may depict the subject, help explain a thought, add character,
 * or just breathe in the background — but it has to say which. Nothing here is
 * obliged to appear on every composition.
 */
export function AsciiIllustration({
  figure,
  frames,
  frameIndex = 0,
  role = 'illustrative',
  alt,
  caption,
  size = 'md',
  surface = 'none',
  align = 'start',
  className,
}: AsciiIllustrationProps) {
  const isContent = role === 'semantic' || role === 'illustrative';

  return (
    <figure className={cx('w98-ascii-illustration', `w98-ascii-illustration--${role}`, className)}>
      <AsciiCanvas
        role={role}
        size={size}
        surface={surface}
        align={align}
        frames={frames}
        frameIndex={frameIndex}
      >
        {frames?.length ? undefined : figure}
      </AsciiCanvas>
      {isContent && alt ? <span className="w98-visually-hidden">{alt}</span> : null}
      {caption ? <figcaption className="w98-ascii-illustration__caption">{caption}</figcaption> : null}
    </figure>
  );
}
