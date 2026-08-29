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
  /**
   * Draws a blinking caret immediately after the value — for static
   * "being typed" frames.
   *
   * The input is a real `<input>` throughout; `caret` only changes how it is
   * sized. It stops filling the well and takes the width of its content, so the
   * caret lands next to the last character instead of at the far right edge.
   * Sizing is explicit, not measured: the `size` attribute is set from the value
   * length, and `field-sizing: content` keeps it correct while typing where the
   * browser supports it.
   */
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
  /*
   * Width in characters, so the input shrinks to its content and the caret sits
   * after the last glyph. Derived from whichever value the caller supplied —
   * controlled, uncontrolled, or the placeholder — and never guessed at runtime.
   */
  const contentLength = String(rest.value ?? rest.defaultValue ?? rest.placeholder ?? '').length;

  const field = (
    <span className={cx('w98-text-input__well', caret && 'has-caret')}>
      <input
        ref={ref}
        className={cx('w98-text-input__input', `w98-text-input__input--${variant}`)}
        disabled={disabled}
        size={caret ? Math.max(1, contentLength) : undefined}
        {...rest}
      />
      {caret ? (
        <span className="w98-text-input__caret w98-motion-caret" aria-hidden="true">
          ▮
        </span>
      ) : null}
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
