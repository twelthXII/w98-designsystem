import { W98Root, Button, Checkbox, TextInput } from 'w98-ascii-design-system';

/**
 * W98Root establishes the pixel-locked environment. Components carry their own
 * bevels either way, so this shows what the wrapper itself contributes.
 */
export const Wrapper = () => (
  <W98Root ground="system" style={{ padding: 16, width: 320 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button variant="default-action">Inside a root</Button>
      <Checkbox label="Inherits the system face" defaultChecked />
      <TextInput label="Field" defaultValue="Pixel-locked" />
    </div>
  </W98Root>
);

/** The ground options. */
export const Grounds = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    {(['system', 'paper', 'void'] as const).map((ground) => (
      <W98Root key={ground} ground={ground} style={{ padding: 12, width: 110 }}>
        <Button scale="sm">{ground}</Button>
      </W98Root>
    ))}
  </div>
);
