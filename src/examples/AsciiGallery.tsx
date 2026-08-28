import { Window } from '../components/window/Window';
import { AsciiText } from '../components/ascii/AsciiText';
import { AsciiBadge } from '../components/ascii/AsciiBadge';
import { AsciiIllustration } from '../components/ascii/AsciiIllustration';
import { AsciiPanel } from '../compositions/AsciiPanel';
import { SystemPanel } from '../compositions/SystemPanel';
import { asciiBox, asciiDither, asciiBar } from '../ascii/patterns';

/**
 * ASCII gallery — the four roles of the secondary layer.
 *
 * The figures here are generated from `src/ascii/patterns`, not authored as
 * clip art: subject-specific drawings belong to the composition that needs them.
 */
export function AsciiGallery() {
  const diagram = [
    asciiBox(28, 5, { title: 'INPUT' }),
    '            │',
    '            ▼',
    asciiBox(28, 5, { title: 'OUTPUT' }),
  ].join('\n');

  return (
    <Window title="ASCII layer" scale="md">
      <SystemPanel label="Roles" layout="grid" gap={24}>
        <AsciiPanel
          label="semantic"
          role="semantic"
          figure={diagram}
          size="sm"
          surface="field"
          footer={<AsciiBadge tone="info">depicts the subject</AsciiBadge>}
        />
        <AsciiPanel
          label="illustrative"
          role="illustrative"
          figure={[
            '  0%  ' + asciiBar(0.0, 18),
            ' 45%  ' + asciiBar(0.45, 18),
            ' 90%  ' + asciiBar(0.9, 18),
          ].join('\n')}
          size="sm"
          surface="terminal"
          footer={<AsciiBadge tone="ok">explains a thought</AsciiBadge>}
        />
        <AsciiPanel
          label="decorative"
          role="decorative"
          figure={asciiBox(24, 7, { set: 'double' })}
          size="sm"
          surface="bare"
          footer={<AsciiBadge>character only</AsciiBadge>}
        />
        <AsciiPanel
          label="ambient"
          role="ambient"
          figure={asciiDither(32, 7, 0.4)}
          size="sm"
          surface="bare"
          footer={<AsciiBadge>passive texture</AsciiBadge>}
        />
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Text" layout="stack" gap={12}>
        <AsciiText variant="label">system label</AsciiText>
        <AsciiText variant="path" prefix="C:\">
          system\config
        </AsciiText>
        <AsciiText variant="terminal" caret>
          awaiting input
        </AsciiText>
        <div style={{ display: 'flex', gap: 12 }}>
          <AsciiBadge tone="ok">OK</AsciiBadge>
          <AsciiBadge tone="warning" brackets="angle">
            HOLD
          </AsciiBadge>
          <AsciiBadge tone="error" variant="well">
            FAIL
          </AsciiBadge>
          <AsciiBadge variant="terminal" brackets="none">
            ▓▓▓░░
          </AsciiBadge>
        </div>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Illustration with caption" layout="stack" gap={8}>
        <AsciiIllustration
          figure={asciiBox(40, 9, { title: 'FIGURE', fill: ' ' })}
          role="illustrative"
          alt="An empty framed area, drawn with box characters."
          caption="Figures are supplied by the composition, never bundled."
          size="sm"
        />
      </SystemPanel>
    </Window>
  );
}
