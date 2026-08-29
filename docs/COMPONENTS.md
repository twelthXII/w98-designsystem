# Component index

Shared vocabulary: `scale` = `sm | md | lg` · `tone` = `info | ok | warning |
error | question` · `role` (ASCII) = `semantic | illustrative | decorative |
ambient`.

Every component's authoritative documentation is the JSDoc above it in source.
This page is the map.

## Window chrome — `src/components/window`

| Component | Variants | Notes |
|-----------|----------|-------|
| `Window` | `variant`: `window` · `panel` · `frame`; `scale`; `active`; `elevated`; `flush`; `fill` | The primary compositional unit. Slots: `menuBar`, `toolbar`, `statusBar`, custom `titleBar`. |
| `TitleBar` | `active` / inactive; `scale`; `controls[]` | `controls`: `minimize` · `maximize` · `restore` · `help` · `close`. Pass `[]` for a bare band. |
| `Dialog` | `tone` (+ `none`); `scale`; `width` | Slots: `message`, `detail`, `actions`. The turn in an argument — use sparingly. |
| `ErrorDialog` | inherits `Dialog`; adds `code` | The only object allowed to be the whole composition. Stack for escalation. |
| `SystemMessage` | `variant`: `inline` · `banner` · `bare`; `tone` | Non-modal system voice. |

## Controls — `src/components/controls`

| Component | Variants | Notes |
|-----------|----------|-------|
| `Button` | `variant`: `default` · `default-action` · `flat` · `ghost`; `scale`; `pressed`; `block` | Press is instant: bevel flips, label shifts 1px. |
| `IconButton` | `variant`: `default` · `flat` · `chrome`; `scale`; `pressed` | Requires `label`. At `lg`, an isolated system object. |
| `Checkbox` | `scale`; `indeterminate` | Check appears in one frame — never faded. |
| `Radio` / `RadioGroup` | `scale`; group `direction`: `column` · `row` | "This, not that", in one control. |
| `TextInput` | `variant`: `field` · `terminal`; `scale`; `caret`; `block` | `caret` implies a live session in a static frame. |
| `ProgressBar` | `variant`: `segmented` · `solid` · `ascii`; `scale`; `indeterminate` | Fills in discrete steps. Never smooth. |
| `Scrollbar` | `orientation`; `scale`; `arrows`; `position`; `thumbSize` | Works detached, as a statement about scale. |

## Navigation and furniture — `src/components/navigation`

| Component | Variants | Notes |
|-----------|----------|-------|
| `MenuBar` | `scale`; `openId`; `trailing` slot | Signals "this is an application" even if no menu opens. |
| `Menu` | `variant`: `popup` · `inline`; `scale`; `highlightedId` | Items support `shortcut`, `checked`, `hasSubmenu`, `separator`. |
| `Dropdown` | `scale`; controlled `open`; `highlightedId`; `width` | The open state presents a set of alternatives as a system choice. |
| `Tabs` | `variant`: `panel` · `bare`; `scale` | Parallel contexts without a second window. |
| `StatusBar` / `StatusBarField` | `scale`; `grip`; field `grow` / `width` | The right home for passive detail. |
| `Tooltip` | `placement`: `top` · `right` · `bottom` · `left`; controlled `open`; `offset` | Set `open` explicitly — hover does not exist in a rendered frame. |

## Desktop objects — `src/components/desktop`

| Component | Variants | Notes |
|-----------|----------|-------|
| `DesktopIcon` | `variant`: `desktop` · `panel`; `size`; `selected` | The caption is a legitimate place for real content. |
| `Cursor` | `shape`: `default` · `pointer` · `text` · `busy` · `crosshair` · `move`; `size`; `rotate`; `shadow`; `x`/`y` | Pixel bitmaps, not vector art. Hotspot-aligned when positioned. |
| `PixelIconContainer` | `size`: `sm` · `md` · `lg` · `xl`; `variant`: `plain` · `raised` · `sunken`; `shape`: `none` · `square` · `round`; `tone` | Fixes proportions so an icon set can drop in later. |

## ASCII layer — `src/components/ascii`

| Component | Variants | Notes |
|-----------|----------|-------|
| `AsciiCanvas` | `role`; `surface`: `none` · `field` · `terminal`; `size`; `cols`/`rows`; `align` | The base grid. `frames` + `frameIndex` for externally driven loops. |
| `AsciiText` | `variant`: `plain` · `label` · `path` · `terminal`; `role`; `size`; `caret`; `prefix` | Readable text in the text-mode voice. |
| `AsciiIllustration` | `role`; `surface`; `size`; `align`; `alt`; `caption` | `alt` required for `semantic` / `illustrative`. |
| `AsciiBadge` | `brackets`: `square` · `angle` · `none`; `variant`: `text` · `well` · `terminal`; `tone`; `size` | The system's smallest unit of character. |

## Composition primitives — `src/compositions`

| Component | Variants | Notes |
|-----------|----------|-------|
| `DesktopCanvas` | `ratio`: `1:1` · `4:5` · `9:16` · `16:9` · `3:2` · `auto`; `ground`: `desktop` · `desktop-alt` · `system` · `paper` · `void`; `gutter`; `layout`: `free` · `flow` · `center` | The root frame and coordinate space. Applies `.w98-root`. |
| `WindowStack` | `arrangement`: `cascade` · `stack` · `fan`; `offsetX`/`offsetY`; `activeIndex` | Depth or escalation — `cascade` is the escalation arrangement. `stack` aligns exactly and ignores the offsets. Four windows is the ceiling. |
| `EditorialWindow` | `layout`: `stacked` · `split` · `bare`; `headlineSize`: `md` · `lg` · `xl` · `2xl` | 98 chrome around editorial typography. Slots: `eyebrow`, `standfirst`, `aside`, `footer`. |
| `SplitWindow` | `orientation`; `ratio`; `splitter`; pane surfaces `panel` · `field` · `terminal` | The comparison device: before/after, list/detail, message/figure. |
| `SystemPanel` | `variant`: `group` · `raised` · `toolbar` · `well`; `layout`: `stack` · `row` · `grid`; `gap`; `align` | Isolation primitive — a lone group box is a complete composition. |
| `AsciiPanel` | `surface`: `field` · `terminal` · `bare`; `role`; `size`; `cols`/`rows`; `align` | Where the two languages meet. Slots: `label`, `footer`. |

## Examples — `src/examples`

| Example | Kind | Shows |
|---------|------|-------|
| `TokenSpecimen` | reference | Every colour, bevel and display step. |
| `ControlGallery` | reference | All controls, all documented variants. |
| `WindowAnatomy` | reference | Full chrome, split layout, dialog family, stacked escalation. |
| `AsciiGallery` | reference | The four ASCII roles and the text primitives. |
| `MotionSpecSheet` | reference | Active/passive specs, the rules, the shipped CSS utilities. |
| `EditorialComposition` | composition | 1:1 frame — 98 as grammar for editorial layout. |
| `DesktopComposition` | composition | 4:5 frame — the desktop metaphor with one active and one passive motion. |

`examples` (from `src/examples/index.ts`) is a registry of these entries with
`id`, `title`, `summary`, `kind` and `component`.
