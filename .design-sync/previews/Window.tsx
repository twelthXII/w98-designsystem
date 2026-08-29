import {
  Window,
  MenuBar,
  IconButton,
  StatusBar,
  StatusBarField,
  SystemMessage,
  PixelIconContainer,
  AsciiBadge,
} from 'w98-ascii-design-system';

/** Full chrome: title bar, menu bar, toolbar, body, status bar. */
export const FullChrome = () => (
  <Window
    title="Untitled"
    icon={<PixelIconContainer size="sm">▤</PixelIconContainer>}
    menuBar={
      <MenuBar
        items={[
          { id: 'file', label: 'File' },
          { id: 'edit', label: 'Edit' },
          { id: 'view', label: 'View' },
          { id: 'help', label: 'Help' },
        ]}
        trailing={<AsciiBadge tone="ok">READY</AsciiBadge>}
      />
    }
    toolbar={
      <>
        <IconButton label="Back" variant="flat">◄</IconButton>
        <IconButton label="Forward" variant="flat">►</IconButton>
        <IconButton label="Stop" variant="flat">■</IconButton>
      </>
    }
    statusBar={
      <StatusBar>
        <StatusBarField grow>4 items</StatusBarField>
        <StatusBarField width={90}>Idle</StatusBarField>
      </StatusBar>
    }
  >
    <SystemMessage tone="info" label="Note">
      A window is the primary compositional unit of this system.
    </SystemMessage>
  </Window>
);

/** Focus: an active window reads forward, an inactive one recedes. */
export const Focus = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <Window title="Active" scale="sm" style={{ width: 200 }}>
      <p style={{ fontSize: 11 }}>Blue title bar, forward in the stack.</p>
    </Window>
    <Window title="Inactive" scale="sm" active={false} style={{ width: 200 }}>
      <p style={{ fontSize: 11 }}>Grey title bar, reads as background.</p>
    </Window>
  </div>
);

/** The three surface variants. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <Window title="window" scale="sm" style={{ width: 170 }}>
      <p style={{ fontSize: 11 }}>Full chrome.</p>
    </Window>
    <Window variant="panel" scale="sm" style={{ width: 150 }}>
      <p style={{ fontSize: 11 }}>Panel — no title bar.</p>
    </Window>
    <Window variant="frame" scale="sm" style={{ width: 150 }}>
      <p style={{ fontSize: 11, padding: 8 }}>Frame — heavier edge.</p>
    </Window>
  </div>
);
