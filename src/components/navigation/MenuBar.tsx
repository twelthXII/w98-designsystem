import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface MenuBarItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface MenuBarProps {
  items: MenuBarItem[];
  /** The open menu title, drawn with the pressed/inverted band. */
  openId?: string;
  onSelect?: (id: string) => void;
  scale?: W98Scale;
  /** Right-aligned slot — a clock, a counter, a status glyph. */
  trailing?: ReactNode;
  className?: string;
}

/**
 * MenuBar — the horizontal command strip beneath a title bar.
 *
 * Even with no menu ever opening, a menu bar does a lot: it tells the viewer
 * the window is an application, not a picture.
 */
export function MenuBar({ items, openId, onSelect, scale = 'md', trailing, className }: MenuBarProps) {
  return (
    <div className={cx('w98-menu-bar', `w98-menu-bar--${scale}`, className)} role="menubar">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className={cx(
            'w98-menu-bar__item',
            item.id === openId && 'is-open',
            item.disabled && 'is-disabled',
          )}
          disabled={item.disabled}
          onClick={() => onSelect?.(item.id)}
        >
          {item.label}
        </button>
      ))}
      {trailing ? <span className="w98-menu-bar__trailing">{trailing}</span> : null}
    </div>
  );
}
