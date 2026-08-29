import { Dropdown } from 'w98-ascii-design-system';

const OPTIONS = [
  { id: 'alpha', label: 'Alpha' },
  { id: 'beta', label: 'Beta' },
  { id: 'gamma', label: 'Gamma' },
  { id: 'delta', label: 'Delta', disabled: true },
];

/** Closed — the resting combo box. */
export const Closed = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    <Dropdown label="Selected" options={OPTIONS} value="beta" width={160} />
    <Dropdown label="Empty" options={OPTIONS} placeholder="Choose…" width={160} />
    <Dropdown label="Disabled" options={OPTIONS} value="alpha" disabled width={160} />
  </div>
);

/** Open — a set of alternatives presented as a system choice. */
export const Open = () => (
  <div style={{ height: 150 }}>
    <Dropdown label="View" options={OPTIONS} value="beta" open highlightedId="gamma" width={180} />
  </div>
);
