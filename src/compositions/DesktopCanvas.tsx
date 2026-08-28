import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface DesktopCanvasProps {
  children?: ReactNode;
  /**
   * Output frame. A composition should declare its aspect ratio rather than
   * inheriting an arbitrary container size.
   */
  ratio?: '1:1' | '4:5' | '9:16' | '16:9' | '3:2' | 'auto';
  /**
   * Ground
   *  - `desktop` — the classic teal.
   *  - `desktop-alt` — the 98 default blue.
   *  - `system` — plain system grey. Good for editorial layouts.
   *  - `paper` — white. Maximum editorial whitespace.
   *  - `void` — black. The text-mode ground.
   */
  ground?: 'desktop' | 'desktop-alt' | 'system' | 'paper' | 'void';
  /** Outer padding. `none` allows windows to crop against the frame edge. */
  gutter?: 'none' | 'sm' | 'md' | 'lg';
  /** Pinned bottom strip — a taskbar, a status line, a caption. */
  taskbar?: ReactNode;
  /**
   * Absolute-positioning mode. Compositions that place windows by coordinate
   * (the usual case) want `free`; `flow` lays children out in a column.
   */
  layout?: 'free' | 'flow' | 'center';
  className?: string;
  style?: CSSProperties;
}

const ratioValue: Record<Exclude<DesktopCanvasProps['ratio'], undefined>, string | undefined> = {
  '1:1': '1 / 1',
  '4:5': '4 / 5',
  '9:16': '9 / 16',
  '16:9': '16 / 9',
  '3:2': '3 / 2',
  auto: undefined,
};

/**
 * DesktopCanvas — the frame every composition lives in.
 *
 * This is the root primitive. It establishes the ground, the aspect ratio and
 * the gutter, and it is the coordinate space windows and cursors are placed in.
 *
 * Composition rule: the canvas is not a container to be filled. Empty ground is
 * a design decision, and usually the right one.
 */
export function DesktopCanvas({
  children,
  ratio = '1:1',
  ground = 'desktop',
  gutter = 'md',
  taskbar,
  layout = 'free',
  className,
  style,
}: DesktopCanvasProps) {
  return (
    <div
      className={cx(
        'w98-root',
        'w98-desktop-canvas',
        `w98-desktop-canvas--${ground}`,
        `w98-desktop-canvas--gutter-${gutter}`,
        `w98-desktop-canvas--${layout}`,
        className,
      )}
      style={{ aspectRatio: ratioValue[ratio], ...style }}
    >
      <div className="w98-desktop-canvas__stage">{children}</div>
      {taskbar ? <div className="w98-desktop-canvas__taskbar">{taskbar}</div> : null}
    </div>
  );
}
