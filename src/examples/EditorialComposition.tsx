import { DesktopCanvas } from '../compositions/DesktopCanvas';
import { EditorialWindow } from '../compositions/EditorialWindow';
import { AsciiPanel } from '../compositions/AsciiPanel';
import { Cursor } from '../components/desktop/Cursor';
import { StatusBar, StatusBarField } from '../components/navigation/StatusBar';
import { AsciiBadge } from '../components/ascii/AsciiBadge';
import { Button } from '../components/controls/Button';
import { asciiDither } from '../ascii/patterns';

/**
 * Editorial composition — the system used as a design language rather than as
 * a screenshot.
 *
 * Notice what it does *not* do: it does not fill the canvas with windows, it
 * does not shrink the UI below legibility, and the ASCII stays out of the
 * headline's way.
 */
export function EditorialComposition() {
  return (
    <DesktopCanvas ratio="1:1" ground="desktop" gutter="lg" layout="center">
      {/* Ambient texture — passive, low weight, never over the headline. */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, pointerEvents: 'none' }}>
        <AsciiPanel
          role="ambient"
          surface="bare"
          size="sm"
          figure={asciiDither(30, 12, 0.45)}
          className="w98-motion-drift"
        />
      </div>

      <EditorialWindow
        title="Composition"
        eyebrow="System / 01"
        headline="One window. One statement."
        standfirst="Windows 98 chrome supplies the grammar; the typography carries the message."
        headlineSize="xl"
        layout="split"
        elevated
        aside={
          <AsciiPanel
            label="figure"
            role="illustrative"
            surface="field"
            size="sm"
            align="center"
            figure={[
              '┌──────────────┐',
              '│  ▓▓▓▓▒▒▒░░░  │',
              '│  ▓▓▒▒▒░░░    │',
              '│  ▓▒▒░░       │',
              '└──────────────┘',
            ].join('\n')}
            footer={<AsciiBadge tone="info">supporting layer</AsciiBadge>}
          />
        }
        footer={
          <>
            <Button variant="default-action" scale="lg">
              Continue
            </Button>
            <Button scale="lg">Cancel</Button>
          </>
        }
      />

      {/* An oversized cursor is a graphic object, not just a pointer. */}
      <Cursor shape="default" size={96} x={640} y={520} shadow />

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <StatusBar>
          <StatusBarField grow>Editorial layout · scale lg</StatusBarField>
          <StatusBarField width={120}>
            <span className="w98-motion-indicator">●</span>&nbsp;passive
          </StatusBarField>
        </StatusBar>
      </div>
    </DesktopCanvas>
  );
}
