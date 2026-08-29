import { TitleBar, PixelIconContainer } from 'w98-ascii-design-system';

/** Focus is the whole point: blue is forward, grey is background. */
export const Focus = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
    <TitleBar title="Active window" icon={<PixelIconContainer size="sm">▤</PixelIconContainer>} />
    <TitleBar title="Inactive window" active={false} />
  </div>
);

/** Control sets — pass [] for a bare band. */
export const Controls = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
    <TitleBar title="Full set" controls={['minimize', 'maximize', 'close']} />
    <TitleBar title="Close only" controls={['close']} />
    <TitleBar title="With help" controls={['help', 'close']} />
    <TitleBar title="No controls" controls={[]} />
  </div>
);

/** At lg the title bar becomes a compositional band, not just chrome. */
export const Scales = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 340 }}>
    <TitleBar title="sm" scale="sm" />
    <TitleBar title="md" scale="md" />
    <TitleBar title="lg" scale="lg" />
  </div>
);

/** The meta slot carries a counter or a state without breaking the band. */
export const WithMeta = () => (
  <div style={{ width: 340 }}>
    <TitleBar title="Transfer" meta="3 of 12" controls={['minimize', 'close']} />
  </div>
);
