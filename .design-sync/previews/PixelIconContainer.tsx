import { PixelIconContainer } from 'w98-ascii-design-system';

/** Fixed sizes — the container's job is proportional discipline. */
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
      <PixelIconContainer key={size} size={size} variant="raised">▤</PixelIconContainer>
    ))}
  </div>
);

/** Surface variants. */
export const Variants = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <PixelIconContainer variant="plain">▤</PixelIconContainer>
    <PixelIconContainer variant="raised">▤</PixelIconContainer>
    <PixelIconContainer variant="sunken">▤</PixelIconContainer>
  </div>
);

/** Tone badges — the dialog icon set. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <PixelIconContainer shape="round" tone="info">i</PixelIconContainer>
    <PixelIconContainer shape="round" tone="ok">✓</PixelIconContainer>
    <PixelIconContainer shape="round" tone="warning">!</PixelIconContainer>
    <PixelIconContainer shape="round" tone="error">✕</PixelIconContainer>
    <PixelIconContainer shape="round" tone="question">?</PixelIconContainer>
    <PixelIconContainer shape="square" tone="info">▦</PixelIconContainer>
  </div>
);
