import { AsciiPanel, AsciiBadge } from 'w98-ascii-design-system';

const METER = [
  'A ▓▓▓▓▓▓▓▓░░',
  'B ▓▓▓▓▓░░░░░',
  'C ▓▓░░░░░░░░',
].join('\n');

/** Framing is what keeps ASCII subordinate — loose ASCII reads as noise. */
export const Surfaces = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <AsciiPanel label="field" role="illustrative" surface="field" size="md" figure={METER} />
    <AsciiPanel label="terminal" role="illustrative" surface="terminal" size="md" figure={METER} />
    <AsciiPanel label="bare" role="decorative" surface="bare" size="md" figure={METER} />
  </div>
);

/** Label and footer carry UI type around a monospaced body. */
export const Labelled = () => (
  <div style={{ width: 260 }}>
    <AsciiPanel
      label="signal"
      role="illustrative"
      surface="field"
      size="md"
      figure={METER}
      footer={<AsciiBadge tone="ok">STABLE</AsciiBadge>}
    />
  </div>
);

/** Ambient role: passive texture that must stay behind everything else. */
export const Ambient = () => (
  <AsciiPanel
    role="ambient"
    surface="bare"
    size="sm"
    figure={Array.from({ length: 5 }, () => '░▒░▒░▒░▒░▒░▒░▒░▒').join('\n')}
  />
);
