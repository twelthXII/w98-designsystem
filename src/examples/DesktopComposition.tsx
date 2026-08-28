import { DesktopCanvas } from '../compositions/DesktopCanvas';
import { DesktopIcon } from '../components/desktop/DesktopIcon';
import { PixelIconContainer } from '../components/desktop/PixelIconContainer';
import { Window } from '../components/window/Window';
import { WindowStack } from '../compositions/WindowStack';
import { Cursor } from '../components/desktop/Cursor';
import { ProgressBar } from '../components/controls/ProgressBar';
import { Button } from '../components/controls/Button';
import { StatusBar, StatusBarField } from '../components/navigation/StatusBar';
import { AsciiText } from '../components/ascii/AsciiText';

/**
 * Desktop composition — the metaphor at work.
 *
 * A cascade of windows, a selected icon, a pointer mid-action. This is the
 * shape a "first frame" usually takes: an active motion (the cursor and the
 * progress bar) plus one quiet passive detail in the status bar.
 */
export function DesktopComposition() {
  return (
    <DesktopCanvas
      ratio="4:5"
      ground="desktop-alt"
      gutter="sm"
      taskbar={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button>Start</Button>
          <AsciiText variant="label" size="xs">
            2 tasks
          </AsciiText>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 90 }}>
        <DesktopIcon
          icon={<PixelIconContainer size="md">▤</PixelIconContainer>}
          label="Documents"
        />
        <DesktopIcon
          icon={<PixelIconContainer size="md">▥</PixelIconContainer>}
          label="Archive"
          selected
        />
      </div>

      <div style={{ position: 'absolute', top: 48, left: 120, width: 420 }}>
        <WindowStack arrangement="cascade" offsetX={28} offsetY={22} activeIndex={1}>
          <Window title="Background" scale="sm">
            <p style={{ fontSize: 11 }}>Inactive windows read as background.</p>
          </Window>
          <Window
            title="Copying…"
            scale="md"
            controls={['minimize', 'close']}
            elevated
            statusBar={
              <StatusBar>
                <StatusBarField grow>
                  <span className="w98-motion-blink">▮</span>&nbsp;working
                </StatusBarField>
              </StatusBar>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 12 }}>Transferring objects…</p>
              <ProgressBar value={0.55} label="Transfer" />
            </div>
          </Window>
        </WindowStack>
      </div>

      <Cursor shape="default" size={40} x={430} y={300} />
    </DesktopCanvas>
  );
}
