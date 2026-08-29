import { Menu } from 'w98-ascii-design-system';

const ITEMS = [
  { id: 'new', label: 'New', shortcut: 'Ctrl+N' },
  { id: 'open', label: 'Open…', shortcut: 'Ctrl+O' },
  { id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
  { id: 's1', separator: true },
  { id: 'props', label: 'Properties', hasSubmenu: true },
  { id: 'grid', label: 'Show grid', checked: true },
  { id: 's2', separator: true },
  { id: 'close', label: 'Close', disabled: true },
];

/** The full command list: shortcuts, separators, submenu arrow, check, disabled. */
export const Popup = () => <Menu items={ITEMS} highlightedId="open" width={220} />;

/** The highlight band is the narration device — it walks a decision. */
export const Highlight = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Menu items={ITEMS.slice(0, 3)} highlightedId="new" width={170} />
    <Menu items={ITEMS.slice(0, 3)} highlightedId="open" width={170} />
    <Menu items={ITEMS.slice(0, 3)} highlightedId="save" width={170} />
  </div>
);

/** Inline variant, flush inside a window body. */
export const Inline = () => <Menu items={ITEMS.slice(0, 5)} variant="inline" width={200} />;
