import { ProgressBar, SystemPanel } from 'w98-ascii-design-system';

/** The three variants at the same value. */
export const Variants = () => (
  <SystemPanel label="Variants" layout="stack" gap={12}>
    <ProgressBar value={0.6} label="Segmented" />
    <ProgressBar value={0.6} variant="solid" label="Solid" />
    <ProgressBar value={0.6} variant="ascii" label="ASCII" />
  </SystemPanel>
);

/** Progression — the bar advances in discrete chunks, never smoothly. */
export const Progression = () => (
  <SystemPanel label="Transfer" layout="stack" gap={12}>
    <ProgressBar value={0.15} label="15 percent" />
    <ProgressBar value={0.5} label="50 percent" />
    <ProgressBar value={0.85} label="85 percent" />
    <ProgressBar value={1} label="Complete" />
  </SystemPanel>
);

/** Indeterminate: the beat is held, the system is working. */
export const Indeterminate = () => (
  <div style={{ width: 280 }}>
    <ProgressBar indeterminate label="Working" />
  </div>
);
