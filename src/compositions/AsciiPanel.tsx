import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import { AsciiCanvas } from '../components/ascii/AsciiCanvas';
import type { AsciiRole } from '../components/types';

export interface AsciiPanelProps {
  /** The figure, as a multi-line string. */
  figure?: string;
  /** Frame list for a passive loop; the composition drives `frameIndex`. */
  frames?: string[];
  frameIndex?: number;
  /** Arbitrary ASCII content, if a plain string is not enough. */
  children?: ReactNode;
  /** @see AsciiRole */
  role?: AsciiRole;
  /** Small label drawn above the figure in UI type. */
  label?: ReactNode;
  /** Status line beneath the figure — a counter, a state, an AsciiBadge. */
  footer?: ReactNode;
  /**
   * Frame
   *  - `field`    — sunken white well. Reads as content inside an application.
   *  - `terminal` — dark text-mode panel.
   *  - `bare`     — no surface; the figure sits directly on the canvas.
   */
  surface?: 'field' | 'terminal' | 'bare';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  cols?: number;
  rows?: number;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * AsciiPanel — the ASCII layer, framed by the system.
 *
 * This is where the two languages meet: a Windows 98 well containing text-mode
 * art. Framing the ASCII is what keeps it subordinate — loose ASCII floating
 * over a composition reads as noise, the same figure inside a sunken well reads
 * as content the system is displaying.
 */
export function AsciiPanel({
  figure,
  frames,
  frameIndex = 0,
  children,
  role = 'illustrative',
  label,
  footer,
  surface = 'field',
  size = 'md',
  cols,
  rows,
  align = 'center',
  className,
}: AsciiPanelProps) {
  return (
    <div className={cx('w98-ascii-panel', `w98-ascii-panel--${surface}`, `w98-ascii-panel--${role}`, className)}>
      {label ? <div className="w98-ascii-panel__label">{label}</div> : null}
      <div className="w98-ascii-panel__body">
        <AsciiCanvas
          role={role}
          size={size}
          surface={surface === 'bare' ? 'none' : surface}
          cols={cols}
          rows={rows}
          align={align}
          frames={frames}
          frameIndex={frameIndex}
        >
          {children ?? (frames?.length ? undefined : figure)}
        </AsciiCanvas>
      </div>
      {footer ? <div className="w98-ascii-panel__footer">{footer}</div> : null}
    </div>
  );
}
