import { AsciiBadge } from 'w98-ascii-design-system';

/** Tones from the status ramp. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <AsciiBadge>NEUTRAL</AsciiBadge>
    <AsciiBadge tone="info">INFO</AsciiBadge>
    <AsciiBadge tone="ok">OK</AsciiBadge>
    <AsciiBadge tone="warning">HOLD</AsciiBadge>
    <AsciiBadge tone="error">FAIL</AsciiBadge>
  </div>
);

/** Bracket styles and surfaces. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <AsciiBadge brackets="square">SQUARE</AsciiBadge>
    <AsciiBadge brackets="angle">ANGLE</AsciiBadge>
    <AsciiBadge brackets="none">NONE</AsciiBadge>
    <AsciiBadge variant="well" tone="ok">WELL</AsciiBadge>
    <AsciiBadge variant="terminal" brackets="none">▓▓▓░░</AsciiBadge>
  </div>
);

/** Sizes — small enough to sprinkle, strong enough to stand alone. */
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
    {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
      <AsciiBadge key={s} size={s} tone="info">{s.toUpperCase()}</AsciiBadge>
    ))}
  </div>
);
