import { Tabs, Checkbox, Radio, RadioGroup } from 'w98-ascii-design-system';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'view', label: 'View' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'locked', label: 'Locked', disabled: true },
];

/** The classic property sheet: tabs welded to a beveled body. */
export const PropertySheet = () => (
  <div style={{ width: 340 }}>
    <Tabs tabs={TABS} value="general">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox label="Show hidden objects" defaultChecked />
        <Checkbox label="Display full path" />
        <RadioGroup label="Mode" direction="row">
          <Radio name="t" label="Auto" defaultChecked />
          <Radio name="t" label="Manual" />
        </RadioGroup>
      </div>
    </Tabs>
  </div>
);

/** Selection moves — parallel contexts without a second window. */
export const Selection = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
    <Tabs tabs={TABS.slice(0, 3)} value="general" variant="bare" />
    <Tabs tabs={TABS.slice(0, 3)} value="advanced" variant="bare" />
  </div>
);
