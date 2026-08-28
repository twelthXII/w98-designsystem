import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  scale?: W98Scale;
}

/**
 * Radio — a choice among alternatives.
 *
 * The mutually-exclusive semantics are the point: a radio group is the fastest
 * way to show "this, not that" in a composition.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, scale = 'md', className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx('w98-radio', `w98-radio--${scale}`, disabled && 'is-disabled', className)}>
      <input ref={ref} type="radio" className="w98-radio__input" disabled={disabled} {...rest} />
      <span className="w98-radio__dot" aria-hidden="true" />
      {label ? <span className="w98-radio__label">{label}</span> : null}
    </label>
  );
});

export interface RadioGroupProps {
  /** Accessible name for the group. */
  label?: ReactNode;
  /** Stacks vertically by default; `row` for a horizontal set. */
  direction?: 'column' | 'row';
  children: ReactNode;
  className?: string;
}

/** RadioGroup — an optional wrapper that draws the 98 etched group box. */
export function RadioGroup({ label, direction = 'column', children, className }: RadioGroupProps) {
  return (
    <fieldset className={cx('w98-radio-group', `w98-radio-group--${direction}`, className)}>
      {label ? <legend className="w98-radio-group__legend">{label}</legend> : null}
      {children}
    </fieldset>
  );
}
