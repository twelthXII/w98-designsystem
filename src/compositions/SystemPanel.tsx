import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import type { W98Scale } from '../components/types';

export interface SystemPanelProps {
  children: ReactNode;
  /** Etched group label, welded into the top border. */
  label?: ReactNode;
  /**
   * Variants
   *  - `group`   — the etched group box from a properties dialog.
   *  - `raised`  — a beveled tile.
   *  - `toolbar` — a raised strip for buttons.
   *  - `well`    — a sunken area for content.
   */
  variant?: 'group' | 'raised' | 'toolbar' | 'well';
  /** Child arrangement. */
  layout?: 'stack' | 'row' | 'grid';
  /** Gap between children, in spacing-token px values. */
  gap?: 4 | 8 | 12 | 16 | 24;
  scale?: W98Scale;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

/**
 * SystemPanel — a group of controls, isolated.
 *
 * The point of this primitive is *isolation*: a single etched group box holding
 * three radio buttons, alone on an empty ground, is a complete composition. It
 * is also the honest way to show controls without building a fake application
 * around them.
 */
export function SystemPanel({
  children,
  label,
  variant = 'group',
  layout = 'stack',
  gap = 8,
  scale = 'md',
  align = 'stretch',
  className,
}: SystemPanelProps) {
  return (
    <div
      className={cx(
        'w98-system-panel',
        `w98-system-panel--${variant}`,
        `w98-system-panel--${layout}`,
        `w98-system-panel--${scale}`,
        `w98-system-panel--align-${align}`,
        className,
      )}
      style={{ gap: `${gap}px` }}
    >
      {label ? <span className="w98-system-panel__label">{label}</span> : null}
      {children}
    </div>
  );
}
