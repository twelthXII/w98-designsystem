import { SplitWindow, StatusBar, StatusBarField, AsciiPanel } from 'w98-ascii-design-system';

const Tree = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
    {['Root', 'Objects', 'Signals', 'Archive'].map((l) => <span key={l}>{l}</span>)}
  </div>
);

/** The Explorer shape: list and detail in one frame. */
export const ListDetail = () => (
  <div style={{ width: 420 }}>
    <SplitWindow
      title="Explorer"
      primary={<Tree />}
      secondary={<p style={{ fontSize: 12 }}>Detail pane on a sunken field surface.</p>}
      ratio={0.32}
      statusBar={<StatusBar><StatusBarField grow>4 objects</StatusBarField></StatusBar>}
    />
  </div>
);

/** Vertical split — message above, figure below. */
export const Vertical = () => (
  <div style={{ width: 380, height: 240 }}>
    <SplitWindow
      title="Compare"
      orientation="vertical"
      ratio={0.45}
      primary={<p style={{ fontSize: 12 }}>The comparison device: before and after in one frame.</p>}
      secondary={<AsciiPanel role="illustrative" surface="terminal" size="sm" figure={'A ▓▓▓▓▓▓░░\nB ▓▓▓░░░░░'} />}
      secondarySurface="terminal"
    />
  </div>
);

/** Pane surfaces: panel, field, terminal. */
export const Surfaces = () => (
  <div style={{ width: 420 }}>
    <SplitWindow
      title="Terminal pane"
      primary={<Tree />}
      secondary={<AsciiPanel role="illustrative" surface="terminal" size="sm" figure={'> ready\n> _'} />}
      primarySurface="panel"
      secondarySurface="terminal"
      ratio={0.35}
    />
  </div>
);
