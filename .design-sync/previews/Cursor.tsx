import { Cursor } from 'w98-ascii-design-system';

/** The six shapes, drawn from pixel bitmaps rather than vector art. */
export const Shapes = () => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', padding: 8 }}>
    {(['default', 'pointer', 'text', 'busy', 'crosshair', 'move'] as const).map((shape) => (
      <div key={shape} style={{ textAlign: 'center' }}>
        <Cursor shape={shape} size={40} />
        <div style={{ fontSize: 10, marginTop: 6 }}>{shape}</div>
      </div>
    ))}
  </div>
);

/** Scale: in-scene pointer through to an oversized graphic object. */
export const Scale = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', padding: 8 }}>
    <Cursor size={20} />
    <Cursor size={32} />
    <Cursor size={64} />
    <Cursor size={100} shadow />
  </div>
);

/** Recolouring and rotation, for placement on a busy or dark ground. */
export const Treatments = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center', background: 'var(--w98-color-desktop)', padding: 16 }}>
    <Cursor size={56} />
    <Cursor size={56} ink="var(--w98-color-bevel-light)" fill="var(--w98-color-ink)" />
    <Cursor size={56} rotate={-20} shadow />
  </div>
);
