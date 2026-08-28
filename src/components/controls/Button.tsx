import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variants
   *  - `default` — raised bevel. The system button.
   *  - `default-action` — raised bevel plus the 1px focus ring 98 used to mark
   *    the default action in a dialog.
   *  - `flat` — toolbar button: no bevel until hover.
   *  - `ghost` — label only; for editorial rows where chrome would be noise.
   */
  variant?: 'default' | 'default-action' | 'flat' | 'ghost';
  /** @see W98Scale */
  scale?: W98Scale;
  /** Renders the pressed bevel. Use for toggle state, not for hover. */
  pressed?: boolean;
  /** Stretches to the width of its container. */
  block?: boolean;
  /** Icon slot drawn before the label. */
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * Button — the atom of the language.
 *
 * The press is instant: bevel flips and the label shifts 1px down-right. Never
 * ease it, never add a hover lift, never round the corners.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', scale = 'md', pressed = false, block = false, icon, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={pressed || undefined}
      className={cx(
        'w98-button',
        `w98-button--${variant}`,
        `w98-button--${scale}`,
        pressed && 'is-pressed',
        block && 'w98-button--block',
        className,
      )}
      {...rest}
    >
      <span className="w98-button__inner">
        {icon ? <span className="w98-button__icon">{icon}</span> : null}
        {children ? <span className="w98-button__label">{children}</span> : null}
      </span>
    </button>
  );
});
