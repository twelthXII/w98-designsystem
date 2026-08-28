import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { AsciiRole } from '../types';

export interface AsciiTextProps {
  children: ReactNode;
  /** @see AsciiRole */
  role?: AsciiRole;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Variants
   *  - `plain` — monospaced run of text.
   *  - `label` — uppercase with caps tracking, for system labels.
   *  - `path` — file-path / command styling.
   *  - `terminal` — light ink on a dark inline ground.
   */
  variant?: 'plain' | 'label' | 'path' | 'terminal';
  /** Appends a blinking block caret. Passive motion — see `caret-blink`. */
  caret?: boolean;
  /** Text that precedes the content, e.g. `>` or `C:\>`. */
  prefix?: ReactNode;
  className?: string;
}

/**
 * AsciiText — monospaced text as a design element.
 *
 * Distinct from `AsciiIllustration`: this is *readable text* wearing the
 * text-mode voice, not a drawing. It is the right choice for labels, paths,
 * codes and machine-voice lines that must stay legible.
 */
export function AsciiText({
  children,
  role = 'illustrative',
  size = 'md',
  variant = 'plain',
  caret = false,
  prefix,
  className,
}: AsciiTextProps) {
  return (
    <span
      className={cx(
        'w98-ascii-text',
        `w98-ascii-text--${variant}`,
        `w98-ascii-text--${size}`,
        `w98-ascii-text--${role}`,
        className,
      )}
    >
      {prefix ? <span className="w98-ascii-text__prefix">{prefix}</span> : null}
      <span className="w98-ascii-text__content">{children}</span>
      {caret ? (
        <span className="w98-ascii-text__caret w98-motion-caret" aria-hidden="true">
          ▮
        </span>
      ) : null}
    </span>
  );
}
