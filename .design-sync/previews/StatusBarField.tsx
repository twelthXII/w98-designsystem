import { StatusBar, StatusBarField, AsciiBadge } from 'w98-ascii-design-system';

/** A single engraved well — the atom of the status line. */
export const Single = () => (
  <div style={{ width: 300 }}>
    <StatusBar grip={false}>
      <StatusBarField grow>A single engraved field</StatusBarField>
    </StatusBar>
  </div>
);

/** Sizing: one growing field, the rest fixed. */
export const Sizing = () => (
  <div style={{ width: 380 }}>
    <StatusBar>
      <StatusBarField grow>Grows to fill</StatusBarField>
      <StatusBarField width={80}>80px</StatusBarField>
      <StatusBarField width={120}><AsciiBadge tone="info">BADGE</AsciiBadge></StatusBarField>
    </StatusBar>
  </div>
);
