import { WindowStack, Window } from 'w98-ascii-design-system';

const Panes = () =>
  [0, 1, 2].map((i) => (
    <Window key={i} title={`Window ${i + 1}`} scale="sm" style={{ width: 190 }}>
      <p style={{ fontSize: 11 }}>Pane {i + 1}</p>
    </Window>
  ));

/** Cascade — the classic desktop pile; the front window is the focused one. */
export const Cascade = () => (
  <div style={{ height: 190 }}>
    <WindowStack arrangement="cascade" offsetX={26} offsetY={22}>{Panes()}</WindowStack>
  </div>
);

/** Fan — alternating offset, looser and more editorial. */
export const Fan = () => (
  <div style={{ height: 190, paddingLeft: 30 }}>
    <WindowStack arrangement="fan" offsetX={22} offsetY={20}>{Panes()}</WindowStack>
  </div>
);

/** Focus can be set explicitly rather than defaulting to the last child. */
export const FocusIndex = () => (
  <div style={{ height: 190 }}>
    <WindowStack arrangement="cascade" offsetX={26} offsetY={22} activeIndex={0}>{Panes()}</WindowStack>
  </div>
);
