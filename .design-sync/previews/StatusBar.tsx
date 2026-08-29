import { StatusBar, StatusBarField, AsciiBadge, Window } from 'w98-ascii-design-system';

/** In situ at the bottom of a window. */
export const InWindow = () => (
  <Window
    title="Explorer"
    scale="md"
    style={{ width: 380 }}
    statusBar={
      <StatusBar>
        <StatusBarField grow>12 objects</StatusBarField>
        <StatusBarField width={90}>1.44 MB</StatusBarField>
      </StatusBar>
    }
  >
    <p style={{ fontSize: 12 }}>The quiet line at the bottom of a window.</p>
  </Window>
);

/** Field layout: one growing field plus fixed ones, with the resize grip. */
export const Fields = () => (
  <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <StatusBar>
      <StatusBarField grow>Ready</StatusBarField>
      <StatusBarField width={70}>CAP</StatusBarField>
      <StatusBarField width={70}>NUM</StatusBarField>
    </StatusBar>
    <StatusBar grip={false}>
      <StatusBarField grow>No grip</StatusBarField>
      <StatusBarField width={110}><AsciiBadge tone="ok">ONLINE</AsciiBadge></StatusBarField>
    </StatusBar>
  </div>
);
