import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface DesktopIconProps {
  /** Icon artwork — typically a `PixelIconContainer`. */
  icon: ReactNode;
  /** Icon caption. Wraps to two lines like the real thing. */
  label: ReactNode;
  /** Draws the navy selection band behind the label and dithers the icon. */
  selected?: boolean;
  /** Icon artwork size. */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Variants
   *  - `desktop` — white caption with a dark halo, for a coloured desktop ground.
   *  - `panel` — black caption, for use on a system-grey surface.
   */
  variant?: 'desktop' | 'panel';
  onSelect?: () => void;
  onOpen?: () => void;
  className?: string;
}

/**
 * DesktopIcon — a labelled object on a ground.
 *
 * A row of these is the most economical way to establish "this is a desktop"
 * in a single frame, and the label is a legitimate place for real content.
 */
export function DesktopIcon({
  icon,
  label,
  selected = false,
  size = 'md',
  variant = 'desktop',
  onSelect,
  onOpen,
  className,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      className={cx(
        'w98-desktop-icon',
        `w98-desktop-icon--${size}`,
        `w98-desktop-icon--${variant}`,
        selected && 'is-selected',
        className,
      )}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <span className="w98-desktop-icon__art">{icon}</span>
      <span className="w98-desktop-icon__label">{label}</span>
    </button>
  );
}
