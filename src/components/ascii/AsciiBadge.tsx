import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Tone } from '../types';

export interface AsciiBadgeProps {
  children: ReactNode;
  /**
   * Bracket style around the content.
   *  - `square` → `[ VALUE ]`
   *  - `angle`  → `< VALUE >`
   *  - `none`   → no brackets
   */
  brackets?: 'square' | 'angle' | 'none';
  /** Colours the badge from the status ramp. */
  tone?: W98Tone | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Variants
   *  - `text` — brackets only, no surface. The default.
   *  - `well` — engraved status-bar well.
   *  - `terminal` — dark inline chip.
   */
  variant?: 'text' | 'well' | 'terminal';
  className?: string;
}

const bracketPairs: Record<'square' | 'angle', [string, string]> = {
  square: ['[', ']'],
  angle: ['<', '>'],
};

/**
 * AsciiBadge — a small bracketed status mark.
 *
 * The system's smallest unit of character: a state, a count, a label. Cheap
 * enough to sprinkle into status bars and title bars, strong enough to work on
 * its own as a lone mark in an editorial composition.
 */
export function AsciiBadge({
  children,
  brackets = 'square',
  tone = 'neutral',
  size = 'sm',
  variant = 'text',
  className,
}: AsciiBadgeProps) {
  const pair = brackets === 'none' ? null : bracketPairs[brackets];

  return (
    <span
      className={cx(
        'w98-ascii-badge',
        `w98-ascii-badge--${variant}`,
        `w98-ascii-badge--${size}`,
        `w98-ascii-badge--${tone}`,
        className,
      )}
    >
      {pair ? (
        <span className="w98-ascii-badge__bracket" aria-hidden="true">
          {pair[0]}
        </span>
      ) : null}
      <span className="w98-ascii-badge__content">{children}</span>
      {pair ? (
        <span className="w98-ascii-badge__bracket" aria-hidden="true">
          {pair[1]}
        </span>
      ) : null}
    </span>
  );
}
