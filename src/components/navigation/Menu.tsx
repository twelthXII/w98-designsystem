import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface MenuItemSpec {
  id: string;
  label?: ReactNode;
  /** Right-aligned accelerator text, e.g. `Ctrl+S`. */
  shortcut?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** Draws the 98 check mark in the icon gutter. */
  checked?: boolean;
  /** Draws the submenu arrow. Submenu rendering is the composition's job. */
  hasSubmenu?: boolean;
  /** Renders an etched separator instead of an item. */
  separator?: boolean;
}

export interface MenuProps {
  items: MenuItemSpec[];
  /** Item currently under the highlight. Drives the navy selection band. */
  highlightedId?: string;
  onSelect?: (id: string) => void;
  scale?: W98Scale;
  /**
   * Variants
   *  - `popup` — floating menu with a raised bevel. The default.
   *  - `inline` — flush panel with no bevel, for use inside a window body.
   */
  variant?: 'popup' | 'inline';
  /** Fixed width in px. Menus usually size to their longest item. */
  width?: number;
  className?: string;
}

/**
 * Menu — a list of commands.
 *
 * The highlight band is the useful part: moving it item by item narrates a
 * decision. Dwell on the item that matters (see motion rule `menu-navigate`).
 */
export function Menu({
  items,
  highlightedId,
  onSelect,
  scale = 'md',
  variant = 'popup',
  width,
  className,
}: MenuProps) {
  return (
    <div
      className={cx('w98-menu', `w98-menu--${variant}`, `w98-menu--${scale}`, className)}
      role="menu"
      style={width ? { width } : undefined}
    >
      {items.map((item) =>
        item.separator ? (
          <div key={item.id} className="w98-menu__separator" role="separator" />
        ) : (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className={cx(
              'w98-menu__item',
              item.id === highlightedId && 'is-highlighted',
              item.disabled && 'is-disabled',
            )}
            disabled={item.disabled}
            onClick={() => onSelect?.(item.id)}
          >
            <span className="w98-menu__gutter" aria-hidden="true">
              {item.checked ? '✓' : item.icon}
            </span>
            <span className="w98-menu__label">{item.label}</span>
            {item.shortcut ? <span className="w98-menu__shortcut">{item.shortcut}</span> : null}
            {item.hasSubmenu ? (
              <span className="w98-menu__arrow" aria-hidden="true">
                ►
              </span>
            ) : null}
          </button>
        ),
      )}
    </div>
  );
}
