import { Scrollbar } from 'w98-ascii-design-system';

/** Both orientations, as the system draws them. */
export const Orientations = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
    <div style={{ height: 160 }}>
      <Scrollbar orientation="vertical" position={0.35} thumbSize={0.3} label="Vertical" />
    </div>
    <div style={{ width: 240 }}>
      <Scrollbar orientation="horizontal" position={0.5} thumbSize={0.35} label="Horizontal" />
    </div>
  </div>
);

/** A small thumb on a long track states scale: there is far more than you see. */
export const Depth = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
    {[0.6, 0.25, 0.08].map((size, i) => (
      <div key={size} style={{ height: 160 }}>
        <Scrollbar position={i * 0.4} thumbSize={size} label={`Thumb ${size}`} />
      </div>
    ))}
  </div>
);

/** Without arrows, and at editorial scale. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
    <div style={{ height: 140 }}>
      <Scrollbar position={0.3} thumbSize={0.3} arrows={false} label="No arrows" />
    </div>
    <div style={{ height: 140 }}>
      <Scrollbar position={0.3} thumbSize={0.3} scale="lg" label="Large" />
    </div>
  </div>
);
