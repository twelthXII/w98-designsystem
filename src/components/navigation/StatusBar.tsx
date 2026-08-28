import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface StatusBarFieldProps {
  children?: ReactNode;
  /** Field takes the remaining width. Use on exactly one field per bar. */
  grow?: boolean;
  /** Fixed width in px. */
  width?: number;
  className?: string;
}

/** A single engraved well inside a StatusBar. */
export function StatusBarField({ children, grow = false, width, className }: StatusBarFieldProps) {
  return (
    <span
      className={cx('w98-status-bar__field', grow && 'is-grow', className)}
      style={width ? { width, flex: 'none' } : undefined}
    >
      {children}
    </span>
  );
}

export interface StatusBarProps {
  children?: ReactNode;
  scale?: W98Scale;
  /** Draws the diagonal resize grip at the right end. */
  grip?: boolean;
  className?: string;
}

/**
 * StatusBar — the quiet line at the bottom of a window.
 *
 * The best place in the whole system for ambient detail: a counter, a clock, a
 * blinking indicator. Passive motion belongs here, not in the middle of a slide.
 */
export function StatusBar({ children, scale = 'md', grip = true, className }: StatusBarProps) {
  return (
    <div className={cx('w98-status-bar', `w98-status-bar--${scale}`, className)}>
      {children}
      {grip ? <span className="w98-status-bar__grip" aria-hidden="true" /> : null}
    </div>
  );
}
