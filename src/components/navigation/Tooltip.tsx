import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface TooltipProps {
  /** Tooltip body — the pale yellow system hint. */
  content: ReactNode;
  /** The element the tooltip is attached to. */
  children?: ReactNode;
  /**
   * Controlled visibility. Composition frames should set this explicitly
   * rather than relying on hover, which does not exist in a rendered frame.
   */
  open?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** Manual offset in px from the anchor. */
  offset?: number;
  className?: string;
}

/**
 * Tooltip — a small pale-yellow annotation.
 *
 * Extremely useful as a pointing device: an oversized cursor plus a tooltip
 * labels any part of a composition in the system's own voice.
 */
export function Tooltip({ content, children, open = false, placement = 'bottom', offset = 4, className }: TooltipProps) {
  return (
    <span className={cx('w98-tooltip', `w98-tooltip--${placement}`, open && 'is-open', className)}>
      {children ? <span className="w98-tooltip__anchor">{children}</span> : null}
      <span
        className="w98-tooltip__bubble"
        role="tooltip"
        style={{ '--w98-tooltip-offset': `${offset}px` } as CSSProperties}
      >
        {content}
      </span>
    </span>
  );
}
