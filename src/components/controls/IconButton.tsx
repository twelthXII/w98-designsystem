import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: an icon-only control still has to announce itself. */
  label: string;
  /** Pixel glyph, SVG, or a single ASCII character. */
  children: ReactNode;
  /**
   * Variants
   *  - `default` — raised square, toolbar style.
   *  - `flat` — bevel appears on hover only.
   *  - `chrome` — small square used inside window furniture.
   */
  variant?: 'default' | 'flat' | 'chrome';
  scale?: W98Scale;
  pressed?: boolean;
}

/**
 * IconButton — a square, icon-only control.
 *
 * At `scale="lg"` this becomes an isolated system object: a single oversized
 * toolbar button on an empty ground is a legitimate composition.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, children, variant = 'default', scale = 'md', pressed = false, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      aria-pressed={pressed || undefined}
      className={cx(
        'w98-icon-button',
        `w98-icon-button--${variant}`,
        `w98-icon-button--${scale}`,
        pressed && 'is-pressed',
        className,
      )}
      {...rest}
    >
      <span className="w98-icon-button__glyph" aria-hidden="true">
        {children}
      </span>
    </button>
  );
});
