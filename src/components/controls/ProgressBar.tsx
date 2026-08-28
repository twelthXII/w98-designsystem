import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface ProgressBarProps {
  /** 0–1. Ignored when `indeterminate` is set. */
  value?: number;
  /** Number of segments the bar is divided into. 98 filled in chunks, not smoothly. */
  segments?: number;
  /**
   * Variants
   *  - `segmented` — the classic chunked fill.
   *  - `solid` — one continuous block. Use when the bar is oversized.
   *  - `ascii` — the fill is drawn with ramp glyphs instead of blocks.
   */
  variant?: 'segmented' | 'solid' | 'ascii';
  scale?: W98Scale;
  /** Runs a looping marquee instead of reporting a value. */
  indeterminate?: boolean;
  /** Accessible name — a progress bar without one is decoration. */
  label?: string;
  className?: string;
}

/**
 * ProgressBar — time passing, work being done.
 *
 * Motion rule: this fills in discrete steps (`motion.step-12`). A smooth fill
 * reads as modern product motion and breaks the period instantly.
 */
export function ProgressBar({
  value = 0,
  segments = 20,
  variant = 'segmented',
  scale = 'md',
  indeterminate = false,
  label,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  const filled = Math.round(clamped * segments);

  return (
    <div
      className={cx(
        'w98-progress',
        `w98-progress--${variant}`,
        `w98-progress--${scale}`,
        indeterminate && 'is-indeterminate',
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 1}
      aria-valuenow={indeterminate ? undefined : clamped}
    >
      <div className="w98-progress__track">
        {variant === 'solid' || indeterminate ? (
          <div
            className="w98-progress__fill"
            style={indeterminate ? undefined : { width: `${clamped * 100}%` }}
          />
        ) : (
          <div className="w98-progress__segments">
            {Array.from({ length: segments }, (_, index) => (
              <span
                key={index}
                className={cx('w98-progress__segment', index < filled && 'is-filled')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
