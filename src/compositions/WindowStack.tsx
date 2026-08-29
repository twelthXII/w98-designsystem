import { Children, isValidElement, cloneElement } from 'react';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface WindowStackProps {
  /** `Window` / `Dialog` elements, back to front. */
  children: ReactNode;
  /** Per-step offset in px. Both are ignored by the `stack` arrangement. */
  offsetX?: number;
  offsetY?: number;
  /**
   * Arrangement
   *  - `cascade` — each window offset down-right by the full offset. The classic
   *    desktop pile, and the arrangement that reads as escalation when the same
   *    window repeats.
   *  - `stack` — perfectly aligned; the windows differ in z only, so `offsetX`
   *    and `offsetY` are ignored. Only useful when the children differ in size
   *    (a dialog over a window); identical children render as one object.
   *  - `fan` — alternating left/right offset with the same downward progression
   *    as cascade. Looser and more editorial.
   */
  arrangement?: 'cascade' | 'stack' | 'fan';
  /**
   * Index of the focused window. It is drawn on top and, if it accepts an
   * `active` prop, is the only one marked active.
   * Defaults to the last child.
   */
  activeIndex?: number;
  className?: string;
  style?: CSSProperties;
}

type MaybeActive = { active?: boolean };

/**
 * WindowStack — several windows read as one object.
 *
 * Use it for depth (a focused window over dimmed ones) or for escalation — the
 * same dialog three times, offset, which is `cascade`. Do not use it to fill
 * space: more than four windows stops being a composition and becomes noise.
 */
export function WindowStack({
  children,
  offsetX = 24,
  offsetY = 24,
  arrangement = 'cascade',
  activeIndex,
  className,
  style,
}: WindowStackProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<MaybeActive>[];
  const focused = activeIndex ?? items.length - 1;

  return (
    <div className={cx('w98-window-stack', `w98-window-stack--${arrangement}`, className)} style={style}>
      {items.map((child, index) => {
        const step = index;
        /*
         * `stack` is aligned exactly, per its contract — it previously carried a
         * quarter-step vertical offset, which was neither "aligned" nor large
         * enough to read as the escalation the doc promised. Escalation is what
         * `cascade` does.
         */
        const dx =
          arrangement === 'stack'
            ? 0
            : arrangement === 'fan'
              ? (index % 2 === 0 ? 1 : -1) * offsetX
              : offsetX * step;
        const dy = arrangement === 'stack' ? 0 : offsetY * step;

        return (
          <div
            key={child.key ?? index}
            className={cx('w98-window-stack__item', index === focused && 'is-focused')}
            style={{
              transform: `translate(${dx}px, ${dy}px)`,
              zIndex: index === focused ? items.length + 1 : index + 1,
            }}
          >
            {cloneElement(child, { active: index === focused })}
          </div>
        );
      })}
    </div>
  );
}
