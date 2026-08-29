import { IconButton, SystemPanel } from 'w98-ascii-design-system';

/** Toolbar row — the canonical use. */
export const Toolbar = () => (
  <div style={{ width: 260 }}>
    <SystemPanel variant="toolbar" layout="row" gap={4}>
      <IconButton label="Back">◄</IconButton>
      <IconButton label="Forward">►</IconButton>
      <IconButton label="Stop" variant="flat">■</IconButton>
      <IconButton label="Grid" variant="flat" pressed>▦</IconButton>
    </SystemPanel>
  </div>
);

/** Variants: raised by default, flat until hover, chrome for window furniture. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <IconButton label="Default">▣</IconButton>
    <IconButton label="Flat" variant="flat">▣</IconButton>
    <IconButton label="Chrome" variant="chrome">✕</IconButton>
    <IconButton label="Pressed" pressed>▣</IconButton>
  </div>
);

/** At lg the control becomes an isolated compositional object. */
export const Scales = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <IconButton label="Small" scale="sm">▣</IconButton>
    <IconButton label="Medium" scale="md">▣</IconButton>
    <IconButton label="Large" scale="lg">▣</IconButton>
  </div>
);
