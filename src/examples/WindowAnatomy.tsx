import { useState } from 'react';
import { Window } from '../components/window/Window';
import { MenuBar } from '../components/navigation/MenuBar';
import { Menu } from '../components/navigation/Menu';
import { StatusBar, StatusBarField } from '../components/navigation/StatusBar';
import { Button } from '../components/controls/Button';
import { IconButton } from '../components/controls/IconButton';
import { Dialog } from '../components/window/Dialog';
import { ErrorDialog } from '../components/window/ErrorDialog';
import { SystemMessage } from '../components/window/SystemMessage';
import { PixelIconContainer } from '../components/desktop/PixelIconContainer';
import { AsciiBadge } from '../components/ascii/AsciiBadge';
import { SplitWindow } from '../compositions/SplitWindow';
import { WindowStack } from '../compositions/WindowStack';

/**
 * Window anatomy — full chrome, the split layout, and the dialog family.
 */
export function WindowAnatomy() {
  const [openMenu, setOpenMenu] = useState<string | undefined>('file');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Window
        title="Untitled — full chrome"
        icon={<PixelIconContainer size="sm">▤</PixelIconContainer>}
        menuBar={
          <MenuBar
            items={[
              { id: 'file', label: 'File' },
              { id: 'edit', label: 'Edit' },
              { id: 'view', label: 'View' },
              { id: 'help', label: 'Help' },
            ]}
            openId={openMenu}
            onSelect={(id) => setOpenMenu(id === openMenu ? undefined : id)}
            trailing={<AsciiBadge tone="ok">ONLINE</AsciiBadge>}
          />
        }
        toolbar={
          <>
            <IconButton label="Back" variant="flat">
              ◄
            </IconButton>
            <IconButton label="Forward" variant="flat">
              ►
            </IconButton>
            <IconButton label="Stop" variant="flat">
              ■
            </IconButton>
          </>
        }
        statusBar={
          <StatusBar>
            <StatusBarField grow>4 items</StatusBarField>
            <StatusBarField width={110}>
              <span className="w98-motion-indicator">●</span>
              &nbsp;Idle
            </StatusBarField>
          </StatusBar>
        }
      >
        <div style={{ position: 'relative', minHeight: 140 }}>
          <SystemMessage tone="info" label="Note">
            A window is the primary compositional unit of this system.
          </SystemMessage>
          {openMenu === 'file' ? (
            <div style={{ position: 'absolute', top: 32, left: 0 }}>
              <Menu
                items={[
                  { id: 'new', label: 'New', shortcut: 'Ctrl+N' },
                  { id: 'open', label: 'Open…', shortcut: 'Ctrl+O' },
                  { id: 'sep-1', separator: true },
                  { id: 'props', label: 'Properties', hasSubmenu: true },
                  { id: 'sep-2', separator: true },
                  { id: 'close', label: 'Close', disabled: true },
                ]}
                highlightedId="open"
                width={200}
              />
            </div>
          ) : null}
        </div>
      </Window>

      <SplitWindow
        title="Split — list and detail"
        primary={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
            {['Root', 'Objects', 'Signals', 'Archive'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        }
        secondary={<p style={{ fontSize: 12 }}>Detail pane. Sunken field surface, edge to edge.</p>}
        ratio={0.32}
        statusBar={
          <StatusBar>
            <StatusBarField grow>Two panes, one frame</StatusBarField>
          </StatusBar>
        }
      />

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <Dialog
          title="Confirm"
          tone="question"
          message="Apply the current selection?"
          detail="This is the system voice: one statement, one decision."
          actions={
            <>
              <Button variant="default-action">OK</Button>
              <Button>Cancel</Button>
            </>
          }
          width={340}
        />

        <WindowStack arrangement="stack" offsetY={16}>
          <ErrorDialog
            title="Error"
            message="The operation could not be completed."
            code="ERR_UNSPECIFIED"
            actions={<Button variant="default-action">OK</Button>}
            width={320}
          />
          <ErrorDialog
            title="Error"
            message="The operation could not be completed."
            code="ERR_UNSPECIFIED"
            actions={<Button variant="default-action">OK</Button>}
            width={320}
          />
        </WindowStack>
      </div>
    </div>
  );
}
