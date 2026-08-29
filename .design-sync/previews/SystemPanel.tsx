import { SystemPanel, Button, Checkbox, IconButton } from 'w98-ascii-design-system';

/** The four surface variants. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <SystemPanel label="group" variant="group" layout="stack" gap={8}>
      <Checkbox label="One" defaultChecked />
      <Checkbox label="Two" />
    </SystemPanel>
    <SystemPanel variant="raised" layout="stack" gap={8}>
      <Button scale="sm">Raised</Button>
    </SystemPanel>
    <SystemPanel variant="toolbar" layout="row" gap={4}>
      <IconButton label="A" variant="flat">◄</IconButton>
      <IconButton label="B" variant="flat">►</IconButton>
    </SystemPanel>
    <SystemPanel variant="well" layout="stack" gap={8}>
      <span style={{ fontSize: 12 }}>Sunken well</span>
    </SystemPanel>
  </div>
);

/** Child arrangement. */
export const Layouts = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <SystemPanel label="stack" layout="stack" gap={8}>
      <Button scale="sm">One</Button>
      <Button scale="sm">Two</Button>
    </SystemPanel>
    <SystemPanel label="row" layout="row" gap={8}>
      <Button scale="sm">One</Button>
      <Button scale="sm">Two</Button>
    </SystemPanel>
    <div style={{ width: 260 }}>
      <SystemPanel label="grid" layout="grid" gap={8}>
        <Checkbox label="Alpha" defaultChecked />
        <Checkbox label="Beta" />
        <Checkbox label="Gamma" />
        <Checkbox label="Delta" />
      </SystemPanel>
    </div>
  </div>
);

/** Isolated on empty ground — the composition rules call this complete. */
export const Isolated = () => (
  <div style={{ padding: 40, width: 280 }}>
    <SystemPanel label="Display" layout="stack" gap={8}>
      <Checkbox label="Show hidden objects" defaultChecked />
      <Checkbox label="Display full path" />
    </SystemPanel>
  </div>
);
