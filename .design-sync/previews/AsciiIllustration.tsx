import { AsciiIllustration } from 'w98-ascii-design-system';

const FLOW = [
  '┌──────────┐      ┌──────────┐',
  '│  INPUT   │ ───► │  OUTPUT  │',
  '└──────────┘      └──────────┘',
].join('\n');

const METER = [
  'A ▓▓▓▓▓▓▓▓░░',
  'B ▓▓▓▓▓░░░░░',
  'C ▓▓░░░░░░░░',
].join('\n');

const FRAME = [
  '╔══════════════╗',
  '║ ▒▒▒▒▒▒▒▒▒▒▒▒ ║',
  '║ ▒          ▒ ║',
  '║ ▒▒▒▒▒▒▒▒▒▒▒▒ ║',
  '╚══════════════╝',
].join('\n');

/** Semantic: depicts the process being discussed. Announced via alt. */
export const Semantic = () => (
  <AsciiIllustration
    figure={FLOW}
    role="semantic"
    alt="A flow from an input box to an output box."
    caption="semantic — depicts the subject"
    surface="field"
    size="md"
  />
);

/** Illustrative: helps explain a thought without being the subject. */
export const Illustrative = () => (
  <AsciiIllustration
    figure={METER}
    role="illustrative"
    alt="Three labelled bars of decreasing length."
    caption="illustrative — helps explain"
    surface="terminal"
    size="md"
  />
);

/** Decorative: character only, hidden from assistive technology. */
export const Decorative = () => (
  <AsciiIllustration
    figure={FRAME}
    role="decorative"
    caption="decorative — character only"
    size="md"
  />
);
