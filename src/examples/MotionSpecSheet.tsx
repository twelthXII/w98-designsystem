import type { CSSProperties } from 'react';
import { Window } from '../components/window/Window';
import { SystemPanel } from '../compositions/SystemPanel';
import { AsciiBadge } from '../components/ascii/AsciiBadge';
import { Button } from '../components/controls/Button';
import { ProgressBar } from '../components/controls/ProgressBar';
import { AsciiText } from '../components/ascii/AsciiText';
import { activeMotion, passiveMotion, motionRules } from '../motion/index';
import type { MotionSpec } from '../motion/types';

function SpecRow({ spec }: { spec: MotionSpec }) {
  return (
    <tr>
      <td style={{ padding: '4px 8px', verticalAlign: 'top' }}>
        <code style={{ fontFamily: 'var(--w98-type-family-mono)', fontSize: 11 }}>{spec.id}</code>
      </td>
      <td style={{ padding: '4px 8px', verticalAlign: 'top', fontSize: 12 }}>{spec.intent}</td>
      <td style={{ padding: '4px 8px', verticalAlign: 'top', fontSize: 11 }}>
        {spec.duration.replace('motion.', '')}
      </td>
      <td style={{ padding: '4px 8px', verticalAlign: 'top', fontSize: 11 }}>
        {spec.easing.replace('motion.', '')}
      </td>
      <td style={{ padding: '4px 8px', verticalAlign: 'top' }}>
        {spec.utilityClass ? <AsciiBadge size="xs">{spec.utilityClass}</AsciiBadge> : null}
      </td>
    </tr>
  );
}

/**
 * Motion spec sheet — the specification, rendered.
 *
 * The table is the contract that composition tooling reads. The live strip at
 * the bottom shows only the effects that ship as self-contained CSS; sequenced
 * motion is driven externally, by design.
 */
export function MotionSpecSheet() {
  return (
    <Window title="Motion" scale="md">
      <SystemPanel label="Active motion — explains" layout="stack" gap={4}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {activeMotion.map((spec) => (
              <SpecRow key={spec.id} spec={spec} />
            ))}
          </tbody>
        </table>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Passive motion — lives" layout="stack" gap={4}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {passiveMotion.map((spec) => (
              <SpecRow key={spec.id} spec={spec} />
            ))}
          </tbody>
        </table>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Rules" layout="stack" gap={8}>
        {motionRules.map((rule) => (
          <div key={rule.id} style={{ fontSize: 12 }}>
            <strong>{rule.rule}</strong>
            <div style={{ color: 'var(--w98-color-ink-muted)' }}>{rule.rationale}</div>
          </div>
        ))}
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Shipped CSS utilities" layout="row" gap={24} align="center">
        <Button className="w98-motion-click">click</Button>
        <span className="w98-motion-blink">▮</span>
        <span className="w98-motion-flicker">flicker</span>
        <span className="w98-motion-indicator">●</span>
        <AsciiText>
          <span
            className="w98-motion-typing"
            style={{ '--w98-motion-typing-chars': 8 } as CSSProperties}
          >
            typing…
          </span>
        </AsciiText>
        <div style={{ width: 160 }}>
          <ProgressBar indeterminate label="Loading" />
        </div>
      </SystemPanel>
    </Window>
  );
}
