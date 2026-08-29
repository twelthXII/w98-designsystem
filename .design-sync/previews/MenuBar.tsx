import { MenuBar, AsciiBadge, Window } from 'w98-ascii-design-system';

const ITEMS = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'view', label: 'View' },
  { id: 'help', label: 'Help' },
];

/** In situ, beneath a title bar — where a menu bar actually lives. */
export const InWindow = () => (
  <Window title="Application" scale="md" menuBar={<MenuBar items={ITEMS} openId="file" />} style={{ width: 380 }}>
    <p style={{ fontSize: 12 }}>A menu bar tells the viewer this is an application.</p>
  </Window>
);

/** Open state: the inverted selection band marks the active title. */
export const OpenState = () => (
  <div style={{ width: 340 }}>
    <MenuBar items={ITEMS} openId="view" />
  </div>
);

/** Trailing slot carries a status without disturbing the command row. */
export const WithTrailing = () => (
  <div style={{ width: 340 }}>
    <MenuBar items={[...ITEMS, { id: 'x', label: 'Tools', disabled: true }]} trailing={<AsciiBadge tone="ok">READY</AsciiBadge>} />
  </div>
);
