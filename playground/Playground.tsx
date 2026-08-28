import { useState } from 'react';
import { examples } from '../src/examples/index';
import { Window } from '../src/components/window/Window';
import { StatusBar, StatusBarField } from '../src/components/navigation/StatusBar';
import { AsciiBadge } from '../src/components/ascii/AsciiBadge';

/**
 * Local preview shell for the example set.
 *
 * The playground is a development tool, not part of the design system: it is
 * excluded from the published build.
 */
export function Playground() {
  const [activeId, setActiveId] = useState(examples[0]?.id);
  const active = examples.find((entry) => entry.id === activeId) ?? examples[0];
  const Example = active?.component;

  return (
    <div className="w98-root playground">
      <aside className="playground__nav">
        <Window title="W98 ASCII" scale="sm" controls={[]} fill>
          <nav className="playground__list">
            {examples.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`playground__item${entry.id === active?.id ? ' is-active' : ''}`}
                onClick={() => setActiveId(entry.id)}
              >
                <span>{entry.title}</span>
                <AsciiBadge size="xs" brackets="square">
                  {entry.kind === 'composition' ? 'comp' : 'ref'}
                </AsciiBadge>
              </button>
            ))}
          </nav>
        </Window>
      </aside>

      <main className="playground__stage">
        {active ? <p className="playground__summary">{active.summary}</p> : null}
        <div className="playground__frame">{Example ? <Example /> : null}</div>
        <StatusBar>
          <StatusBarField grow>{active?.title}</StatusBarField>
          <StatusBarField width={140}>
            {examples.length} examples
          </StatusBarField>
        </StatusBar>
      </main>
    </div>
  );
}
