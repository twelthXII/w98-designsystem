import { SystemMessage, Window } from 'w98-ascii-design-system';

/** All tones, inline inside a window body. */
export const Tones = () => (
  <Window title="Messages" scale="md" style={{ width: 420 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SystemMessage tone="info" label="Note">The system speaks in one sentence.</SystemMessage>
      <SystemMessage tone="ok" label="Done">The operation completed.</SystemMessage>
      <SystemMessage tone="warning" label="Warning">The destination is nearly full.</SystemMessage>
      <SystemMessage tone="error" label="Error">The destination is unavailable.</SystemMessage>
    </div>
  </Window>
);

/** The three placements. */
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
    <SystemMessage tone="info" variant="inline">Inline — a row inside a window body.</SystemMessage>
    <SystemMessage tone="info" variant="banner">Banner — a full-width beveled well.</SystemMessage>
    <SystemMessage tone="info" variant="bare">Bare — no surface, for editorial placement.</SystemMessage>
  </div>
);
