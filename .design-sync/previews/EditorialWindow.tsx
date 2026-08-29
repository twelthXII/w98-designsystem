import { EditorialWindow, AsciiPanel, AsciiBadge, Button } from 'w98-ascii-design-system';

/* Structure reads at card size; a solid shading mass does not. */
const FIGURE = [
  '┌────────────────┐',
  '│ A ████████▓▒░  │',
  '│ B █████▓▒░     │',
  '│ C ███▓░        │',
  '└────────────────┘',
].join('\n');

/** The canonical editorial layout: chrome as grammar, typography as message. */
export const Canonical = () => (
  <EditorialWindow
    title="Composition"
    eyebrow="System / 01"
    headline="One window. One statement."
    standfirst="Windows 98 chrome supplies the grammar; the typography carries the message."
    headlineSize="lg"
    layout="split"
    aside={
      <AsciiPanel
        label="figure"
        role="illustrative"
        surface="field"
        size="md"
        align="center"
        figure={FIGURE}
        footer={<AsciiBadge tone="info">supporting layer</AsciiBadge>}
      />
    }
    footer={
      <>
        <Button variant="default-action" scale="lg">Continue</Button>
        <Button scale="lg">Cancel</Button>
      </>
    }
  />
);

/** Headline scale — the axis that most changes the composition. */
export const HeadlineScale = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <EditorialWindow title="md" headline="Editorial at medium." headlineSize="md" layout="bare" />
    <EditorialWindow title="xl" headline="Editorial at extra large." headlineSize="xl" layout="bare" />
  </div>
);

/** Bare layout: maximum whitespace, no aside. */
export const Bare = () => (
  <EditorialWindow
    title="Statement"
    eyebrow="Editorial"
    headline="Empty ground is a decision."
    standfirst="The canvas is not a container to be filled."
    headlineSize="lg"
    layout="bare"
  />
);
