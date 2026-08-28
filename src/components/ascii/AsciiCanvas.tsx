import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { AsciiRole } from '../types';

export interface AsciiCanvasProps {
  /** Pre-formatted text. Whitespace is preserved exactly. */
  children?: ReactNode;
  /**
   * Optional frame list for passive animation. This package ships no runtime:
   * a composition drives `frameIndex` from its own timeline.
   */
  frames?: string[];
  /** Index into `frames`. Ignored when `children` is provided. */
  frameIndex?: number;
  /** @see AsciiRole — drives optical weight, and therefore hierarchy. */
  role?: AsciiRole;
  /**
   * Surface
   *  - `none` — transparent; the canvas sits on whatever is behind it.
   *  - `field` — sunken white well, like a text box.
   *  - `terminal` — dark ground with light ink. The text-mode surface.
   */
  surface?: 'none' | 'field' | 'terminal';
  /** Glyph size token: xs · sm · md · lg · xl. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Character-cell width. Sets a hard grid the art is composed against. */
  cols?: number;
  /** Row count. Fixes the height so a looping figure cannot reflow the layout. */
  rows?: number;
  align?: 'start' | 'center' | 'end';
  /** Ink colour override — takes a colour token value. */
  ink?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * AsciiCanvas — the grid the whole text-mode layer is composed on.
 *
 * This is the base primitive: a monospaced, line-height-1 surface where one
 * character is one cell. Everything else in the ASCII family builds on it.
 *
 * Hierarchy rule: an `ambient` canvas must never overlap a headline, and a
 * `decorative` one must never be the largest object in the frame.
 */
export function AsciiCanvas({
  children,
  frames,
  frameIndex = 0,
  role = 'decorative',
  surface = 'none',
  size = 'md',
  cols,
  rows,
  align = 'start',
  ink,
  className,
  style,
}: AsciiCanvasProps) {
  const frameContent = frames?.length ? frames[Math.abs(frameIndex) % frames.length] : undefined;

  return (
    <div
      className={cx(
        'w98-ascii-canvas',
        `w98-ascii-canvas--${role}`,
        `w98-ascii-canvas--${surface}`,
        `w98-ascii-canvas--${size}`,
        `w98-ascii-canvas--align-${align}`,
        className,
      )}
      style={{
        width: cols ? `${cols}ch` : undefined,
        height: rows ? `calc(${rows} * 1em)` : undefined,
        color: ink,
        ...style,
      }}
      aria-hidden={role === 'decorative' || role === 'ambient'}
    >
      <pre className="w98-ascii-canvas__pre">{children ?? frameContent}</pre>
    </div>
  );
}
