import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import { Window } from '../components/window/Window';
import type { W98Scale, WindowControl } from '../components/types';

export interface SplitWindowProps {
  title?: ReactNode;
  /** Left / top pane. Usually the navigation, the list, or the ASCII figure. */
  primary: ReactNode;
  /** Right / bottom pane. Usually the content. */
  secondary: ReactNode;
  /** Split direction. */
  orientation?: 'horizontal' | 'vertical';
  /** Fraction of the window given to the primary pane, 0–1. */
  ratio?: number;
  /** Draws the beveled splitter bar between panes. */
  splitter?: boolean;
  /** Pane surfaces: `panel` keeps system grey, `field` sinks the pane to white. */
  primarySurface?: 'panel' | 'field' | 'terminal';
  secondarySurface?: 'panel' | 'field' | 'terminal';
  scale?: W98Scale;
  controls?: WindowControl[];
  statusBar?: ReactNode;
  menuBar?: ReactNode;
  active?: boolean;
  elevated?: boolean;
  className?: string;
}

/**
 * SplitWindow — two panes, one frame.
 *
 * The classic Explorer shape, and the most useful comparison device in the
 * system: before/after, list/detail, message/illustration.
 */
export function SplitWindow({
  title,
  primary,
  secondary,
  orientation = 'horizontal',
  ratio = 0.35,
  splitter = true,
  primarySurface = 'panel',
  secondarySurface = 'field',
  scale = 'md',
  controls = ['minimize', 'maximize', 'close'],
  statusBar,
  menuBar,
  active = true,
  elevated = false,
  className,
}: SplitWindowProps) {
  const clamped = Math.min(0.9, Math.max(0.1, ratio));

  return (
    <Window
      title={title}
      controls={controls}
      scale={scale}
      statusBar={statusBar}
      menuBar={menuBar}
      active={active}
      elevated={elevated}
      flush
      className={cx('w98-split-window', `w98-split-window--${orientation}`, className)}
    >
      <div
        className="w98-split-window__grid"
        style={
          /*
           * The splitter is a real grid item, so it needs its own track. Without
           * it the template has two tracks for three children and the secondary
           * pane wraps onto a second row instead of sitting beside the primary.
           */
          orientation === 'horizontal'
            ? { gridTemplateColumns: splitter ? `${clamped * 100}% auto 1fr` : `${clamped * 100}% 1fr` }
            : { gridTemplateRows: splitter ? `${clamped * 100}% auto 1fr` : `${clamped * 100}% 1fr` }
        }
      >
        <div className={cx('w98-split-window__pane', `w98-split-window__pane--${primarySurface}`)}>{primary}</div>
        {splitter ? <div className="w98-split-window__splitter" aria-hidden="true" /> : null}
        <div className={cx('w98-split-window__pane', `w98-split-window__pane--${secondarySurface}`)}>{secondary}</div>
      </div>
    </Window>
  );
}
