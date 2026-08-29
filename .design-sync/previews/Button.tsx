import { Button } from 'w98-ascii-design-system';

/** The four variants, which is the axis that most changes appearance. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button>Default</Button>
    <Button variant="default-action">Default action</Button>
    <Button variant="flat">Flat</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

/** Chrome scale: sm is authentic density, lg is editorial. */
export const Scales = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button scale="sm">Small</Button>
    <Button scale="md">Medium</Button>
    <Button scale="lg">Large</Button>
  </div>
);

/** Statically renderable states. The press is a bevel flip, not a transition. */
export const States = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button>Rest</Button>
    <Button pressed>Pressed</Button>
    <Button disabled>Disabled</Button>
    <Button icon={<span aria-hidden="true">▣</span>}>With icon</Button>
  </div>
);

/** The canonical composition: a dialog action row, primary action first. */
export const ActionRow = () => (
  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
    <Button variant="default-action">OK</Button>
    <Button>Cancel</Button>
    <Button>Apply</Button>
  </div>
);
