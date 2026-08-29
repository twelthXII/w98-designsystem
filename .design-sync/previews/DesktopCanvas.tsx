import {
  DesktopCanvas,
  DesktopIcon,
  PixelIconContainer,
  Window,
  Button,
  Cursor,
  ProgressBar,
} from 'w98-ascii-design-system';

/** A complete frame: ground, gutter, placed window, cursor, taskbar. */
export const Composition = () => (
  <div style={{ width: 360 }}>
    <DesktopCanvas
      ratio="4:5"
      ground="desktop-alt"
      gutter="sm"
      taskbar={<Button scale="sm">Start</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 78 }}>
        <DesktopIcon icon={<PixelIconContainer size="md">▤</PixelIconContainer>} label="Documents" />
        <DesktopIcon icon={<PixelIconContainer size="md">▥</PixelIconContainer>} label="Archive" selected />
      </div>
      <div style={{ position: 'absolute', top: 40, left: 96, width: 210 }}>
        <Window title="Copying…" scale="sm" controls={['minimize', 'close']} elevated>
          <ProgressBar value={0.55} label="Transfer" />
        </Window>
      </div>
      <Cursor size={30} x={250} y={150} />
    </DesktopCanvas>
  </div>
);

/** Grounds — the five documented surfaces a composition can sit on. */
export const Grounds = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    {(['desktop', 'desktop-alt', 'system', 'paper', 'void'] as const).map((ground) => (
      <div key={ground} style={{ width: 96 }}>
        <DesktopCanvas ratio="1:1" ground={ground} gutter="sm" layout="center">
          <span style={{ fontSize: 10 }}>{ground}</span>
        </DesktopCanvas>
      </div>
    ))}
  </div>
);

/** Output frames — a composition declares its ratio rather than inheriting one. */
export const Ratios = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    {(['1:1', '4:5', '9:16', '16:9'] as const).map((ratio) => (
      <div key={ratio} style={{ width: 90 }}>
        <DesktopCanvas ratio={ratio} ground="desktop" gutter="sm" layout="center">
          <span style={{ fontSize: 10, color: 'var(--w98-color-ink-inverse)' }}>{ratio}</span>
        </DesktopCanvas>
      </div>
    ))}
  </div>
);
