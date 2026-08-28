import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale, WindowControl } from '../types';

export interface TitleBarProps {
  /** Window title. Keep it system-like: short, sentence case, no marketing copy. */
  title?: ReactNode;
  /** 16px pixel icon slot, drawn left of the title. */
  icon?: ReactNode;
  /**
   * Active windows get the blue gradient; inactive windows get grey.
   * Use inactive deliberately — a stack of grey windows behind one blue window
   * is the cheapest way to show focus.
   */
  active?: boolean;
  /** Which chrome buttons to draw. Pass `[]` for a bare title bar. */
  controls?: WindowControl[];
  /** @see W98Scale */
  scale?: W98Scale;
  /** Extra content between the title and the controls (e.g. a counter). */
  meta?: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onRestore?: () => void;
  onHelp?: () => void;
  className?: string;
}

const controlGlyph: Record<WindowControl, string> = {
  minimize: '_',
  maximize: '□',
  restore: '❐',
  help: '?',
  close: '✕',
};

const controlLabel: Record<WindowControl, string> = {
  minimize: 'Minimize',
  maximize: 'Maximize',
  restore: 'Restore',
  help: 'Help',
  close: 'Close',
};

/**
 * TitleBar — the single most recognisable object in the language.
 *
 * Variants
 *  - active / inactive  → focus within a window stack.
 *  - scale sm | md | lg → lg turns the title bar into a compositional band and
 *                         is the recommended treatment for an oversized hero
 *                         window.
 */
export function TitleBar({
  title,
  icon,
  active = true,
  controls = ['minimize', 'maximize', 'close'],
  scale = 'md',
  meta,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onHelp,
  className,
}: TitleBarProps) {
  const handlers: Record<WindowControl, (() => void) | undefined> = {
    minimize: onMinimize,
    maximize: onMaximize,
    restore: onRestore,
    help: onHelp,
    close: onClose,
  };

  return (
    <div
      className={cx(
        'w98-title-bar',
        `w98-title-bar--${scale}`,
        active ? 'w98-title-bar--active' : 'w98-title-bar--inactive',
        className,
      )}
    >
      {icon ? <span className="w98-title-bar__icon">{icon}</span> : null}
      <span className="w98-title-bar__title">{title}</span>
      {meta ? <span className="w98-title-bar__meta">{meta}</span> : null}
      {controls.length > 0 ? (
        <span className="w98-title-bar__controls">
          {controls.map((control) => (
            <button
              key={control}
              type="button"
              className={cx('w98-title-bar__control', `w98-title-bar__control--${control}`)}
              aria-label={controlLabel[control]}
              onClick={handlers[control]}
            >
              <span aria-hidden="true">{controlGlyph[control]}</span>
            </button>
          ))}
        </span>
      ) : null}
    </div>
  );
}
