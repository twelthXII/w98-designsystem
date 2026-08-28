import { tokenGroups } from '../tokens/index';
import { Window } from '../components/window/Window';
import { SystemPanel } from '../compositions/SystemPanel';

/**
 * Token specimen — every token in the system, rendered.
 *
 * This is the reference sheet used during visual calibration: change a token,
 * reload, and see every consequence at once.
 */
export function TokenSpecimen() {
  const colorGroup = tokenGroups.find((group) => group.name === 'color');
  const bevelGroup = tokenGroups.find((group) => group.name === 'bevel');
  const displaySteps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  return (
    <Window title="Design tokens" scale="md" controls={['minimize', 'maximize', 'close']}>
      <SystemPanel label="Palette" layout="grid" gap={8}>
        {Object.keys(colorGroup?.tokens ?? {}).map((key) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                flex: 'none',
                background: `var(--w98-color-${key})`,
                boxShadow: 'var(--w98-bevel-field)',
              }}
            />
            <code style={{ fontFamily: 'var(--w98-type-family-mono)', fontSize: 11 }}>{key}</code>
          </div>
        ))}
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Bevels" layout="row" gap={16}>
        {Object.keys(bevelGroup?.tokens ?? {}).map((key) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 72,
                height: 48,
                background: 'var(--w98-color-surface)',
                boxShadow: `var(--w98-bevel-${key})`,
              }}
            />
            <code style={{ fontSize: 11 }}>{key}</code>
          </div>
        ))}
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Display scale" layout="stack" gap={8}>
        {displaySteps.map((step) => (
          <div key={step} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <code style={{ width: 60, flex: 'none', fontSize: 11 }}>{step}</code>
            <span
              className="w98-display"
              style={{ fontSize: `var(--w98-type-size-display-${step})`, lineHeight: 1 }}
            >
              Aa
            </span>
          </div>
        ))}
      </SystemPanel>
    </Window>
  );
}
