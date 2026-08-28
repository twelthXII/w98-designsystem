import { cx } from '../../utils/cx';
import { cursorShapes, cursorHotspots } from './cursorShapes';
import type { CursorShape } from './cursorShapes';

export interface CursorProps {
  /** @see cursorShapes */
  shape?: CursorShape;
  /**
   * Size in px of the cursor's longest edge.
   *  - 20–32  → in-scene pointer at UI scale.
   *  - 64–120 → oversized. The cursor becomes a graphic object in its own right,
   *             which is one of the strongest moves in this system.
   */
  size?: number;
  /** Ink colour. Defaults to the system ink token. */
  ink?: string;
  /** Fill colour. Defaults to white. */
  fill?: string;
  /** Rotation in degrees. Small tilts read as motion in a still frame. */
  rotate?: number;
  /** Positions the cursor absolutely, aligned by its hotspot. */
  x?: number;
  y?: number;
  /** Draws a hard offset shadow behind the cursor, for busy grounds. */
  shadow?: boolean;
  className?: string;
}

/**
 * Cursor — a pointer, rendered as pixels.
 *
 * Two uses, both valid:
 *  1. In-scene at UI scale, narrating an action (see motion `cursor-move`).
 *  2. Oversized and isolated, used as the subject of the composition.
 *
 * The hotspot is respected when `x`/`y` are given, so a cursor placed at a
 * coordinate points *at* that coordinate.
 */
export function Cursor({
  shape = 'default',
  size = 32,
  ink,
  fill,
  rotate = 0,
  x,
  y,
  shadow = false,
  className,
}: CursorProps) {
  const bitmap = cursorShapes[shape];
  const rows = bitmap.length;
  const cols = bitmap.reduce((max, row) => Math.max(max, row.length), 0);
  const scale = size / Math.max(rows, cols);
  const hotspot = cursorHotspots[shape];
  const positioned = x !== undefined || y !== undefined;

  return (
    <span
      className={cx('w98-cursor', shadow && 'w98-cursor--shadow', className)}
      style={{
        width: cols * scale,
        height: rows * scale,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...(positioned
          ? {
              position: 'absolute',
              left: (x ?? 0) - hotspot.x * scale,
              top: (y ?? 0) - hotspot.y * scale,
            }
          : null),
      }}
      aria-hidden="true"
    >
      <svg
        className="w98-cursor__svg"
        viewBox={`0 0 ${cols} ${rows}`}
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        focusable="false"
      >
        {bitmap.map((row, rowIndex) =>
          Array.from(row).map((cell, colIndex) =>
            cell === '.' ? null : (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex}
                y={rowIndex}
                width={1}
                height={1}
                fill={cell === 'K' ? (ink ?? 'var(--w98-color-ink)') : (fill ?? 'var(--w98-color-bevel-light)')}
              />
            ),
          ),
        )}
      </svg>
    </span>
  );
}
