import { ErrorDialog, WindowStack, Button } from 'w98-ascii-design-system';

/** The hard stop — the strongest single object in the system. */
export const Canonical = () => (
  <ErrorDialog
    title="Error"
    message="The operation could not be completed."
    detail="The destination is unavailable."
    code="ERR_UNSPECIFIED"
    width={340}
    actions={<Button variant="default-action">OK</Button>}
  />
);

/** Stacked, it reads as escalation without a word of copy. */
export const Escalation = () => (
  <WindowStack arrangement="cascade" offsetX={16} offsetY={16}>
    {[0, 1, 2].map((i) => (
      <ErrorDialog
        key={i}
        title="Error"
        message="The operation could not be completed."
        code="ERR_UNSPECIFIED"
        width={320}
        actions={<Button variant="default-action">OK</Button>}
      />
    ))}
  </WindowStack>
);
