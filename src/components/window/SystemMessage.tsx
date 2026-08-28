import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { PixelIconContainer } from '../desktop/PixelIconContainer';
import type { W98Tone } from '../types';

export interface SystemMessageProps {
  /** @see W98Tone */
  tone?: W98Tone;
  /** The statement. One sentence, system voice. */
  children: ReactNode;
  /** Optional label drawn before the message, e.g. a subsystem name. */
  label?: ReactNode;
  icon?: ReactNode;
  /**
   * Variants
   *  - `inline` — a row inside a window body.
   *  - `banner` — full-width strip with a beveled well.
   *  - `bare`   — icon + text with no surface, for editorial placement.
   */
  variant?: 'inline' | 'banner' | 'bare';
  className?: string;
}

const toneGlyph: Record<W98Tone, string> = {
  info: 'i',
  ok: '✓',
  warning: '!',
  error: '✕',
  question: '?',
};

/**
 * SystemMessage — a non-modal system statement.
 *
 * Use it when the composition needs the operating system's voice without
 * interrupting: a note, a warning, a confirmation.
 */
export function SystemMessage({
  tone = 'info',
  children,
  label,
  icon,
  variant = 'inline',
  className,
}: SystemMessageProps) {
  return (
    <div
      className={cx('w98-system-message', `w98-system-message--${variant}`, `w98-system-message--${tone}`, className)}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <span className="w98-system-message__icon">
        {icon ?? (
          <PixelIconContainer size="sm" tone={tone} shape="round">
            {toneGlyph[tone]}
          </PixelIconContainer>
        )}
      </span>
      <span className="w98-system-message__text">
        {label ? <strong className="w98-system-message__label">{label}</strong> : null}
        {children}
      </span>
    </div>
  );
}
