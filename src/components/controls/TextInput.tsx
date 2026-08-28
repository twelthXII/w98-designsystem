import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  scale?: W98Scale;
  /**
   * Variants
   *  - `field` — the sunken 98 text box.
   *  - `terminal` — dark ground, monospaced. For the ASCII/text-mode layer.
   */
  variant?: 'field' | 'terminal';
  /** Draws a blinking caret after the value — for static "being typed" frames. */
  caret?: boolean;
  block?: boolean;
}

/**
 * TextInput — a place where a person could type.
 *
 * With `caret` on, a static composition implies a live session. That implication
 * does a lot of narrative work for almost no visual cost.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, scale = 'md', variant = 'field', caret = false, block = false, className, disabled, ...rest },
  ref,
) {
  const field = (
    <span className={cx('w98-text-input__well', caret && 'has-caret')}>
      <input
        ref={ref}
        className={cx('w98-text-input__input', `w98-text-input__input--${variant}`)}
        disabled={disabled}
        {...rest}
      />
    </span>
  );

  return (
    <label
      className={cx(
        'w98-text-input',
        `w98-text-input--${scale}`,
        `w98-text-input--${variant}`,
        block && 'w98-text-input--block',
        disabled && 'is-disabled',
        className,
      )}
    >
      {label ? <span className="w98-text-input__label">{label}</span> : null}
      {field}
    </label>
  );
});
