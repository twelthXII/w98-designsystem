import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { W98Scale } from '../types';

export interface TabSpec {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabSpec[];
  /** Selected tab id. */
  value?: string;
  onChange?: (id: string) => void;
  scale?: W98Scale;
  /**
   * Variants
   *  - `panel` — tabs welded to a beveled body panel. The classic property sheet.
   *  - `bare` — tab strip only; the composition places its own body.
   */
  variant?: 'panel' | 'bare';
  /** Body content for the `panel` variant. */
  children?: ReactNode;
  className?: string;
}

/**
 * Tabs — parallel contexts.
 *
 * Editorially this is a way to show alternatives, chapters or versions without
 * building a second window.
 */
export function Tabs({ tabs, value, onChange, scale = 'md', variant = 'panel', children, className }: TabsProps) {
  const selected = value ?? tabs[0]?.id;

  return (
    <div className={cx('w98-tabs', `w98-tabs--${variant}`, `w98-tabs--${scale}`, className)}>
      <div className="w98-tabs__strip" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === selected}
            disabled={tab.disabled}
            className={cx('w98-tabs__tab', tab.id === selected && 'is-selected', tab.disabled && 'is-disabled')}
            onClick={() => onChange?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {variant === 'panel' ? (
        <div className="w98-tabs__panel" role="tabpanel">
          {children}
        </div>
      ) : null}
    </div>
  );
}
