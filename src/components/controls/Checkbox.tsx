import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** @see W98Scale — `lg` turns a checkbox into a compositional mark. */
  scale?: W98Scale;
  /** Renders the third, mixed state used by 98 for partial selection. */
  indeterminate?: boolean;
}

/**
 * Checkbox — a binary decision made visible.
 *
 * Compositionally useful as a list of statements where one is checked: it
 * states a position without a single word of UI copy.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, scale = 'md', indeterminate = false, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cx('w98-checkbox', `w98-checkbox--${scale}`, disabled && 'is-disabled', className)}
    >
      <input ref={ref} type="checkbox" className="w98-checkbox__input" disabled={disabled} {...rest} />
      <span className={cx('w98-checkbox__box', indeterminate && 'is-indeterminate')} aria-hidden="true" />
      {label ? <span className="w98-checkbox__label">{label}</span> : null}
    </label>
  );
});
