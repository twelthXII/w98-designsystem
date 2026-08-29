import { AsciiCanvas } from 'w98-ascii-design-system';

/* Contrast between ramp steps beats density: long runs of █ merge into a
   solid block at small sizes, while ▓ against ░ stays readable. */
const FIGURE = [
  '┌──────────────────┐',
  '│  ░  ▒  ▓  █      │',
  '│                  │',
  '│  A ▓▓▓▓▓▓▓▓░░    │',
  '│  B ▓▓▓▓▓░░░░░    │',
  '│  C ▓▓░░░░░░░░    │',
  '└──────────────────┘',
].join('\n');

/** Surfaces: transparent, sunken field, dark terminal. */
export const Surfaces = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <AsciiCanvas surface="none" role="illustrative" size="md">{FIGURE}</AsciiCanvas>
    <AsciiCanvas surface="field" role="illustrative" size="md">{FIGURE}</AsciiCanvas>
    <AsciiCanvas surface="terminal" role="illustrative" size="md">{FIGURE}</AsciiCanvas>
  </div>
);

/** Role drives optical weight — the mechanism that keeps ASCII subordinate. */
export const Roles = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    {(['semantic', 'decorative', 'ambient'] as const).map((role) => (
      <AsciiCanvas key={role} role={role} size="md" surface="none">{FIGURE}</AsciiCanvas>
    ))}
  </div>
);

/** Glyph sizes on a fixed character grid. */
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <AsciiCanvas key={size} size={size} role="illustrative">
        {['┌────┐', '│ ▓▒░│', '│ ▒░ │', '└────┘'].join('\n')}
      </AsciiCanvas>
    ))}
  </div>
);
