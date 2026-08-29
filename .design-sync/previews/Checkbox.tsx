import { Checkbox, SystemPanel } from 'w98-ascii-design-system';

/** All four states. The check appears in one frame — never faded. */
export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Unchecked" />
    <Checkbox label="Mixed" indeterminate readOnly />
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Disabled, checked" disabled defaultChecked />
  </div>
);

/** A list of statements with one checked states a position without UI copy. */
export const OptionList = () => (
  <SystemPanel label="Options" layout="stack" gap={6}>
    <Checkbox label="Show hidden objects" defaultChecked />
    <Checkbox label="Display full path" />
    <Checkbox label="Remember each folder's view" defaultChecked />
  </SystemPanel>
);

/** At lg the checkbox becomes a compositional mark. */
export const Scales = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Checkbox scale="sm" label="sm" defaultChecked />
    <Checkbox scale="md" label="md" defaultChecked />
    <Checkbox scale="lg" label="lg" defaultChecked />
  </div>
);
