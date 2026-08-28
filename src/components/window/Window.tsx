import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TitleBar } from './TitleBar';
import type { W98Scale, WindowControl } from '../types';

export interface WindowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title bar text. Omit together with `titleBar` for a chrome-less frame. */
  title?: ReactNode;
  /** Replaces the default title bar entirely. */
  titleBar?: ReactNode;
  icon?: ReactNode;
  /** Focus state. Inactive windows read as background in a stack. */
  active?: boolean;
  controls?: WindowControl[];
  /** @see W98Scale */
  scale?: W98Scale;
  /**
   * Variants
   *  - `window` — full chrome. The default object of the language.
   *  - `panel`  — beveled surface with no title bar. For isolated groups of
   *               controls and for cropped compositions.
   *  - `frame`  — heavier outer frame, no inner padding. Use when the window is
   *               acting as a picture frame around ASCII or imagery.
   */
  variant?: 'window' | 'panel' | 'frame';
  /** Menu bar row, directly beneath the title bar. */
  menuBar?: ReactNode;
  /** Toolbar row, beneath the menu bar. */
  toolbar?: ReactNode;
  /** Status bar row, pinned to the bottom edge. */
  statusBar?: ReactNode;
  /** Hard offset shadow. Reserve it for the one window that should float. */
  elevated?: boolean;
  /** Removes body padding — for edge-to-edge content. */
  flush?: boolean;
  /** Stretches the window to fill its container. */
  fill?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children?: ReactNode;
}

/**
 * Window — the primary compositional unit.
 *
 * A composition is built by *placing* windows, not by filling the frame with
 * them. One oversized window that crops off the canvas edge is a stronger move
 * than four small ones.
 */
export const Window = forwardRef<HTMLDivElement, WindowProps>(function Window(
  {
    title,
    titleBar,
    icon,
    active = true,
    controls = ['minimize', 'maximize', 'close'],
    scale = 'md',
    variant = 'window',
    menuBar,
    toolbar,
    statusBar,
    elevated = false,
    flush = false,
    fill = false,
    onClose,
    onMinimize,
    onMaximize,
    className,
    children,
    ...rest
  },
  ref,
) {
  const hasChrome = variant === 'window' && (titleBar !== undefined || title !== undefined);

  return (
    <div
      ref={ref}
      className={cx(
        'w98-window',
        `w98-window--${variant}`,
        `w98-window--${scale}`,
        active ? 'is-active' : 'is-inactive',
        elevated && 'w98-window--elevated',
        fill && 'w98-window--fill',
        className,
      )}
      {...rest}
    >
      {hasChrome
        ? (titleBar ?? (
            <TitleBar
              title={title}
              icon={icon}
              active={active}
              controls={controls}
              scale={scale}
              onClose={onClose}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
            />
          ))
        : null}
      {menuBar ? <div className="w98-window__menu">{menuBar}</div> : null}
      {toolbar ? <div className="w98-window__toolbar">{toolbar}</div> : null}
      <div className={cx('w98-window__body', flush && 'w98-window__body--flush')}>{children}</div>
      {statusBar ? <div className="w98-window__status">{statusBar}</div> : null}
    </div>
  );
});
