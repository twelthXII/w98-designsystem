# W98 ASCII Design System

A code-backed design system built on two visual languages:

1. **Windows 98 / late-90s desktop UI** — the primary compositional grammar.
2. **ASCII / text-mode graphics** — a secondary, supporting visual layer.

It ships design tokens, React components, composition primitives and a motion
specification. It is a *design system*, not an application: there is no
pipeline, no renderer, no content, and no runtime beyond React and one
stylesheet.

---

## Hierarchy

Every decision in this repository resolves in this order:

| # | Layer | Role |
|---|-------|------|
| 1 | **Content / message** | What the composition says. Outranks everything. |
| 2 | **Windows 98 UI metaphor** | The compositional grammar: windows, dialogs, controls, chrome. |
| 3 | **Functional UI motion** | Active motion that explains an action or a thought. |
| 4 | **ASCII visual support** | A secondary language: semantic, illustrative, decorative or ambient. |
| 5 | **Decorative micro-detail** | Passive motion, texture, small system marks. |

Two consequences worth stating plainly:

- **Windows 98 is the primary language.** If a composition works without ASCII,
  it ships without ASCII.
- **ASCII is optional and role-bound.** It never has to carry meaning, and it
  never has to appear — but when it does appear, it declares which of the four
  roles it is playing (`semantic` · `illustrative` · `decorative` · `ambient`).

## What this system is not

It is not a Windows 98 screenshot generator. Windows 98 is the *grammar*; the
output is modern editorial and social composition. The system explicitly allows
oversized windows, unconventional cropping, large typography, editorial
whitespace, abstract layouts, oversized cursors, isolated system controls and
ASCII illustration — and explicitly forbids filling a frame with windows,
illegibly small UI, unmotivated retro props, unruled mixing with
Y2K / glassmorphism / cyberpunk, generic gradients, rounded SaaS cards, heavy
shadows, stray neon, ASCII noise over a headline, and everything moving at once.

The full list lives in [`docs/COMPOSITION.md`](docs/COMPOSITION.md).

---

## Repository structure

```
src/
  tokens/            Design tokens — the single source of truth
    color.ts         System palette (substrate greys are fixed)
    typography.ts    UI type, editorial display type, mono/ASCII family
    space.ts         Pixel-locked spacing scale
    border.ts        Line weights + the bevel composites (the core 98 detail)
    shadow.ts        Hard offset shadows only
    motion.ts        Durations, easings, stepped timing
    ascii.ts         Text-mode grid metrics and per-role optical weight
    layout.ts        Fixed chrome metrics, with oversized variants
    z.ts             Stacking ladder
    index.ts         Registry consumed by the CSS generator

  motion/            Motion SPECIFICATION (no runtime)
    active.ts        20 active motions — motion that explains
    passive.ts       8 passive motions — motion that lives
    rules.ts         The motion constitution
    types.ts

  ascii/             Text-mode raw material
    charsets.ts      Density ramps, box-drawing sets, cycle pools, marks
    patterns.ts      Generators: box, rule, field, dither, bar, ramp mapping

  components/
    window/          Window · TitleBar · Dialog · ErrorDialog · SystemMessage
    controls/        Button · IconButton · Checkbox · Radio · TextInput ·
                     ProgressBar · Scrollbar
    navigation/      MenuBar · Menu · Dropdown · Tabs · StatusBar · Tooltip
    desktop/         DesktopIcon · Cursor (pixel bitmaps) · PixelIconContainer
    ascii/           AsciiCanvas · AsciiText · AsciiIllustration · AsciiBadge
    types.ts         Shared vocabulary (W98Scale, W98Tone, AsciiRole, …)

  compositions/      DesktopCanvas · WindowStack · EditorialWindow ·
                     SplitWindow · SystemPanel · AsciiPanel

  styles/
    tokens.css       GENERATED from src/tokens — do not edit
    base.css         Pixel-locked rendering environment + surface/type utilities
    motion.css       Shippable CSS motion utilities
    components/*.css One stylesheet per component domain
    index.css        Single entry point

  examples/          Reference sheets and full compositions

playground/          Local preview shell (dev only, not published)
scripts/             Token generation and build helpers
docs/                Composition, motion, ASCII and calibration documentation
```

---

## Architecture

### Tokens are the source of truth

Tokens are authored in TypeScript and compiled to CSS custom properties:

```
src/tokens/*.ts  ──  npm run tokens  ──▶  src/styles/tokens.css
```

The CSS variable name is derived mechanically as `--w98-<group>-<key>`, so the
TS tokens and the stylesheet can never drift. Composite tokens (bevels, shadows)
reference primitives through `var()`, so re-theming a primitive re-themes
everything built on top of it.

```ts
import { color, cssVar } from 'w98-ascii-design-system';

color['surface'];              // '#c0c0c0'
cssVar('bevel', 'raised');     // 'var(--w98-bevel-raised)'
```

### Components are semantic, not decorative

Every component takes semantic props and documents its variants in its own
JSDoc. There are no style props, no arbitrary colour overrides, and no
brand-specific or campaign copy anywhere in the library — placeholder text in
examples is deliberately generic.

Three props carry most of the system's vocabulary:

- `scale` — `sm` (authentic dense metrics) · `md` (default) · `lg` (editorial;
  real proportions at a larger pixel size). `lg` is what lets the system make
  oversized, compositional chrome without becoming a caricature.
- `tone` — `info` · `ok` · `warning` · `error` · `question`, mapped to the
  status ramp and the pixel icon set.
- `role` (ASCII only) — `semantic` · `illustrative` · `decorative` · `ambient`,
  which drives optical weight and therefore hierarchy.

### Motion is specified, not implemented

Motion lives in two places, on purpose:

- **`src/motion/*`** — the specification. Twenty active motions, eight passive
  ones, and ten rules that outrank them all. Each spec names its intent,
  trigger, duration token, easing token, the properties it may touch, and
  whether it loops.
- **`src/styles/motion.css`** — the subset that is genuinely self-contained CSS
  (blink, flicker, press, dropdown unroll, typing, selection sweep, …).

Sequenced motion — cursor travel, window choreography, ASCII frame swaps — is
*driven by the consuming composition*, which is why ASCII components accept
`frames` + `frameIndex` rather than animating themselves. **No timeline runtime
belongs in this repository.**

The two classes exist because they do different jobs:

> **Active motion explains. Passive motion lives.**

An opening frame must carry motion, and it should be active motion — the
specification is sized so a strong first frame can be built entirely from it.
See [`docs/MOTION.md`](docs/MOTION.md).

### The ASCII layer is framed, not floating

`AsciiCanvas` is the base primitive: a monospaced surface where one character is
one cell and `line-height` is exactly `1`. `AsciiPanel` frames it inside a
Windows 98 well — which is what keeps ASCII subordinate. Loose ASCII floating
over a composition reads as noise; the same figure inside a sunken field reads
as content the system is displaying.

Figures are *generated* (`src/ascii/patterns.ts`) or supplied by the
composition. This library deliberately ships no clip-art set.
See [`docs/ASCII.md`](docs/ASCII.md).

---

## Usage

```tsx
import 'w98-ascii-design-system/styles.css';

import {
  DesktopCanvas,
  EditorialWindow,
  AsciiPanel,
  Cursor,
} from 'w98-ascii-design-system';

export function Frame() {
  return (
    <DesktopCanvas ratio="1:1" ground="desktop" gutter="lg" layout="center">
      <EditorialWindow
        title="Composition"
        eyebrow="System / 01"
        headline="One window. One statement."
        headlineSize="xl"
        layout="split"
        elevated
        aside={<AsciiPanel role="illustrative" surface="field" figure={figure} />}
      />
      <Cursor shape="default" size={96} x={640} y={520} shadow />
    </DesktopCanvas>
  );
}
```

`DesktopCanvas` applies `.w98-root`, which establishes the pixel-locked
rendering environment. Any other root needs that class applied manually.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run tokens` | Regenerates `src/styles/tokens.css` from the TS tokens |
| `npm run typecheck` | `tsc --noEmit` across src, scripts and playground |
| `npm run smoke` | Renders every example to static markup |
| `npm run check` | Tokens + typecheck + smoke — the pre-sync check |
| `npm run build` | Tokens, `tsc` build to `dist/`, CSS copy |
| `npm run dev` | Local playground with every example |
| `npm run build:playground` | Static build of the playground |

## Calibration

Visual references have not landed yet, so this repository is deliberately
under-decorated: it establishes the architecture, not the final styling. The
values expected to move — and where they live — are listed in
[`docs/CALIBRATION.md`](docs/CALIBRATION.md). The system substrate (greys,
bevels, chrome metrics) is not a calibration candidate; the status ramp,
editorial type scale, ASCII weights and shadow depths are.

## Documentation

- [`docs/COMPOSITION.md`](docs/COMPOSITION.md) — the composition rules, allowed and forbidden.
- [`docs/MOTION.md`](docs/MOTION.md) — active/passive motion language and the first-frame rule.
- [`docs/ASCII.md`](docs/ASCII.md) — the four ASCII roles and how to use the text-mode layer.
- [`docs/COMPONENTS.md`](docs/COMPONENTS.md) — component index with variants.
- [`docs/CALIBRATION.md`](docs/CALIBRATION.md) — what to decide after visual exploration.
