import { DesktopIcon, PixelIconContainer } from 'w98-ascii-design-system';

const Teal = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--w98-color-desktop)', padding: 16, display: 'flex', gap: 8 }}>{children}</div>
);

/** On a coloured desktop ground, with one selected. */
export const OnDesktop = () => (
  <Teal>
    <DesktopIcon icon={<PixelIconContainer size="md">▤</PixelIconContainer>} label="Documents" />
    <DesktopIcon icon={<PixelIconContainer size="md">▥</PixelIconContainer>} label="Archive" selected />
    <DesktopIcon icon={<PixelIconContainer size="md">▦</PixelIconContainer>} label="Network" />
  </Teal>
);

/** The panel variant, for use on system grey. */
export const OnPanel = () => (
  <div style={{ background: 'var(--w98-color-surface)', padding: 16, display: 'flex', gap: 8 }}>
    <DesktopIcon variant="panel" icon={<PixelIconContainer size="md">▤</PixelIconContainer>} label="Documents" />
    <DesktopIcon variant="panel" icon={<PixelIconContainer size="md">▥</PixelIconContainer>} label="Archive" selected />
  </div>
);

/** Sizes — the label wraps to two lines like the real thing. */
export const Sizes = () => (
  <Teal>
    <DesktopIcon size="sm" icon={<PixelIconContainer size="sm">▤</PixelIconContainer>} label="Small" />
    <DesktopIcon size="md" icon={<PixelIconContainer size="md">▤</PixelIconContainer>} label="Medium item" />
    <DesktopIcon size="lg" icon={<PixelIconContainer size="lg">▤</PixelIconContainer>} label="Large item with a longer caption" />
  </Teal>
);
