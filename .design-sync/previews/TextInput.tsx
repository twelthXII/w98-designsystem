import { TextInput, SystemPanel } from 'w98-ascii-design-system';

/** The two surfaces: the sunken system field and the text-mode terminal. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    <TextInput label="Field" defaultValue="Text value" />
    <TextInput label="Terminal" variant="terminal" defaultValue="dir /w" />
  </div>
);

/** States that render statically. */
export const States = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    <TextInput label="Value" defaultValue="Filled" />
    <TextInput label="Empty" placeholder="Placeholder" />
    <TextInput label="Disabled" defaultValue="Locked" disabled />
    <TextInput label="Read only" defaultValue="Fixed" readOnly />
  </div>
);

/** The caret implies a live session in an otherwise static frame. */
export const WithCaret = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    <TextInput label="Typing" defaultValue="Search" caret />
    <TextInput label="Console" variant="terminal" defaultValue={'C:\\>'} caret />
  </div>
);

/** Chrome scale, from authentic density to editorial. */
export const Scales = () => (
  <SystemPanel label="Scale" layout="row" gap={12} align="end">
    <TextInput scale="sm" label="sm" defaultValue="Small" />
    <TextInput scale="md" label="md" defaultValue="Medium" />
    <TextInput scale="lg" label="lg" defaultValue="Large" />
  </SystemPanel>
);
