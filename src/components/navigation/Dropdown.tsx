import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Menu } from './Menu';
import type { MenuItemSpec } from './Menu';
import type { W98Scale } from '../types';

export interface DropdownOption {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  /** Currently selected option id. */
  value?: string;
  /** Text shown when nothing is selected. */
  placeholder?: ReactNode;
  /** Controlled open state — required for static composition frames. */
  open?: boolean;
  /** Item under the highlight while the list is open. */
  highlightedId?: string;
  onToggle?: (open: boolean) => void;
  onSelect?: (id: string) => void;
  scale?: W98Scale;
  label?: ReactNode;
  disabled?: boolean;
  /** Fixed width in px. */
  width?: number;
  className?: string;
}

/**
 * Dropdown — the 98 combo box.
 *
 * Its open state is the interesting one: an unrolled list of options is a
 * ready-made way to present a set of alternatives as a system choice.
 */
export function Dropdown({
  options,
  value,
  placeholder,
  open = false,
  highlightedId,
  onToggle,
  onSelect,
  scale = 'md',
  label,
  disabled = false,
  width,
  className,
}: DropdownProps) {
  const selected = options.find((option) => option.id === value);
  const items: MenuItemSpec[] = options.map((option) => ({
    id: option.id,
    label: option.label,
    disabled: option.disabled,
  }));

  return (
    <div
      className={cx('w98-dropdown', `w98-dropdown--${scale}`, open && 'is-open', disabled && 'is-disabled', className)}
      style={width ? { width } : undefined}
    >
      {label ? <span className="w98-dropdown__label">{label}</span> : null}
      <button
        type="button"
        className="w98-dropdown__control"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => onToggle?.(!open)}
      >
        <span className={cx('w98-dropdown__value', !selected && 'is-placeholder')}>
          {selected?.label ?? placeholder}
        </span>
        <span className="w98-dropdown__arrow" aria-hidden="true">
          ▼
        </span>
      </button>
      {open ? (
        <div className="w98-dropdown__list">
          <Menu items={items} highlightedId={highlightedId ?? value} onSelect={onSelect} scale={scale} variant="popup" />
        </div>
      ) : null}
    </div>
  );
}
