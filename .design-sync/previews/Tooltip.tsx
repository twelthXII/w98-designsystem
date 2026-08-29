import { Tooltip, Button, IconButton } from 'w98-ascii-design-system';

/** Placements — controlled open, since hover does not exist in a rendered frame. */
export const Placements = () => (
  <div style={{ display: 'flex', gap: 64, padding: '40px 16px' }}>
    <Tooltip content="Below the anchor" open placement="bottom"><Button>Bottom</Button></Tooltip>
    <Tooltip content="Above the anchor" open placement="top"><Button>Top</Button></Tooltip>
    <Tooltip content="To the right" open placement="right"><Button>Right</Button></Tooltip>
  </div>
);

/** Labelling a control — the system's own annotation voice. */
export const Annotation = () => (
  <div style={{ padding: '8px 16px 48px' }}>
    <Tooltip content="Delete the selection" open placement="bottom">
      <IconButton label="Delete">✕</IconButton>
    </Tooltip>
  </div>
);
