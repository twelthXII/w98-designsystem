import { Dialog, Button } from 'w98-ascii-design-system';

/** The canonical decision dialog. */
export const Confirm = () => (
  <Dialog
    title="Confirm"
    tone="question"
    message="Apply the current selection?"
    detail="This is the system voice: one statement, one decision."
    width={340}
    actions={
      <>
        <Button variant="default-action">OK</Button>
        <Button>Cancel</Button>
      </>
    }
  />
);

/** Tone drives the pixel badge and the accent. */
export const Tones = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {(['info', 'warning', 'error'] as const).map((tone) => (
      <Dialog
        key={tone}
        title={tone}
        tone={tone}
        message={`A ${tone} statement from the system.`}
        width={300}
        actions={<Button variant="default-action">OK</Button>}
      />
    ))}
  </div>
);

/** No icon column — a plain dialog carrying its own content. */
export const Plain = () => (
  <Dialog
    title="Properties"
    tone="none"
    message="A dialog without an icon column."
    width={300}
    actions={
      <>
        <Button variant="default-action">OK</Button>
        <Button>Cancel</Button>
      </>
    }
  />
);
