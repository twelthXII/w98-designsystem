import { Radio } from 'w98-ascii-design-system';

/** Mutually exclusive selection — "this, not that". */
export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Radio name="rs" label="Selected" defaultChecked />
    <Radio name="rs" label="Unselected" />
    <Radio name="rs2" label="Disabled" disabled />
    <Radio name="rs3" label="Disabled, selected" disabled defaultChecked />
  </div>
);

/** Scale steps in real pixels. */
export const Scales = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Radio name="a" scale="sm" label="sm" defaultChecked />
    <Radio name="b" scale="md" label="md" defaultChecked />
    <Radio name="c" scale="lg" label="lg" defaultChecked />
  </div>
);
