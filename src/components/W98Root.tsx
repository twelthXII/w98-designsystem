import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface W98RootProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Ground colour for the wrapper. `none` leaves the background transparent so
   * the surrounding page shows through — the right choice when embedding a few
   * controls into an existing layout.
   */
  ground?: 'none' | 'system' | 'paper' | 'void';
}

/**
 * W98Root — the environment every component in this system assumes.
 *
 * It applies `.w98-root`, which establishes the pixel-locked rendering context:
 * the system font stack, disabled font smoothing, `box-sizing: border-box`, and
 * the zero-radius reset. Components carry their own bevels and colours, so they
 * are not blank without it — but outside a `W98Root` they render in the
 * browser's default font with content-box padding, which reads as broken.
 *
 * Wrap once, as high in the tree as practical. `DesktopCanvas` already includes
 * it; nesting is harmless.
 */
export function W98Root({ children, ground = 'none', className, ...rest }: W98RootProps) {
  return (
    <div className={cx('w98-root', `w98-root--${ground}`, className)} {...rest}>
      {children}
    </div>
  );
}
