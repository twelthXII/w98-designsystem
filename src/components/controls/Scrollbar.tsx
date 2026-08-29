import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface ScrollbarProps {
  orientation?: 'vertical' | 'horizontal';
  /** 0–1 position of the thumb along the track. */
  position?: number;
  /** 0–1 proportion of the track the thumb occupies. */
  thumbSize?: number;
  scale?: W98Scale;
  /** Draws the arrow buttons at both ends. */
  arrows?: boolean;
  /** Accessible name. */
  label?: string;
  className?: string;
}

/**
 * Scrollbar — a statement about scale.
 *
 * A tiny thumb on a long track says "there is far more of this than you can
 * see" faster than any sentence. Usable as a standalone graphic element,
 * detached from any scrollable content.
 */
export function Scrollbar({
  orientation = 'vertical',
  position = 0,
  thumbSize = 0.3,
  scale = 'md',
  arrows = true,
  label,
  className,
}: ScrollbarProps) {
  const size = Math.min(1, Math.max(0.05, thumbSize));
  const pos = Math.min(1, Math.max(0, position));
  const offset = pos * (1 - size);
  const vertical = orientation === 'vertical';

  return (
    <div
      className={cx('w98-scrollbar', `w98-scrollbar--${orientation}`, `w98-scrollbar--${scale}`, className)}
      role="scrollbar"
      aria-label={label}
      aria-orientation={orientation}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={pos}
    >
      {arrows ? (
        <span className="w98-scrollbar__arrow w98-scrollbar__arrow--start" aria-hidden="true">
          {vertical ? '▲' : '◄'}
        </span>
      ) : null}
      <span className="w98-scrollbar__track w98-pattern-checker">
        <span
          className="w98-scrollbar__thumb"
          style={
            vertical
              ? { height: `${size * 100}%`, top: `${offset * 100}%` }
              : { width: `${size * 100}%`, left: `${offset * 100}%` }
          }
        />
      </span>
      {arrows ? (
        <span className="w98-scrollbar__arrow w98-scrollbar__arrow--end" aria-hidden="true">
          {vertical ? '▼' : '►'}
        </span>
      ) : null}
    </div>
  );
}
