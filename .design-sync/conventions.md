## Building with this system

**Wrap everything in `W98Root`.** It applies the pixel-locked environment: the
system font stack, disabled font smoothing, `box-sizing: border-box`, and the
zero-radius reset. Components carry their own bevels and colours, so they are not
blank without it — they render in the browser's default font with content-box
padding, which reads as broken. `DesktopCanvas` already includes it; nesting is
harmless.

```jsx
<W98Root ground="system">
  <Window title="Untitled" statusBar={<StatusBar><StatusBarField grow>Ready</StatusBarField></StatusBar>}>
    <SystemPanel label="Options" layout="stack" gap={8}>
      <Checkbox label="Show hidden objects" defaultChecked />
      <Radio name="mode" label="Automatic" defaultChecked />
    </SystemPanel>
    <div style={{ display: 'flex', gap: 'var(--w98-space-8)', marginTop: 'var(--w98-space-16)' }}>
      <Button variant="default-action">OK</Button>
      <Button>Cancel</Button>
    </div>
  </Window>
</W98Root>
```

### The styling idiom: semantic props + CSS custom properties

There is **no utility-class system**. Style components through their props, and
style your own layout glue with `var(--w98-*)` tokens. Never hand-write a colour,
a radius, or a shadow — every value exists as a token.

Three props carry most of the vocabulary:

- `scale` — `sm` (dense, authentic metrics) · `md` (default) · `lg` (editorial;
  real proportions at larger pixel size). `lg` is how you make oversized chrome
  without a caricature. Never CSS-scale a component to enlarge it.
- `tone` — `info` · `ok` · `warning` · `error` · `question`, on `Dialog`,
  `SystemMessage`, `AsciiBadge`, `PixelIconContainer`.
- `role` (ASCII only) — `semantic` · `illustrative` · `decorative` · `ambient`.
  Required whenever ASCII appears; it sets optical weight and therefore hierarchy.

Token families, all prefixed `--w98-`:
`color-*` (`color-surface`, `color-desktop`, `color-select-bg`, `color-status-error`) ·
`bevel-*` (`bevel-raised`, `bevel-pressed`, `bevel-window`, `bevel-field`, `bevel-etched`) ·
`type-*` (`type-family-ui`, `type-family-mono`, `type-size-ui-sm`, `type-size-display-lg`) ·
`space-*` (pixel-valued: `space-4` … `space-128`) · `shadow-*` (`shadow-hard-md` — hard offsets, never blurred) ·
`motion-*` (`motion-duration-base`, `motion-ease-ui`, `motion-step-12`) ·
`ascii-*` (`ascii-size-md`, `ascii-opacity-ambient`) · `layout-*` · `z-*` ·
`border-radius` (always `0`).

Utility classes, when you need them without a component: `.w98-display`
(editorial type), `.w98-ui-label` (caps + tracking), `.w98-mono`, `.w98-surface`,
`.w98-visually-hidden`.

### Motion

Motion is declarative and split in two: **active** motion explains an action,
**passive** motion is atmosphere. Shipped as CSS classes —
`.w98-motion-window-open`, `.w98-motion-press`, `.w98-motion-typing`,
`.w98-motion-blink`, `.w98-motion-indicator`, `.w98-motion-drift`. Rules that
matter when you compose: one active motion per moment; at most two passive loops;
nothing animated ever crosses a headline; control feedback is instant, never eased.

### Where the truth lives

- `_ds/<folder>/styles.css` → `@import "./_ds_bundle.css"` — every token
  definition and component rule. Read it before styling anything.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component API and usage.
  Groups: `window`, `controls`, `navigation`, `desktop`, `ascii`, `compositions`,
  `foundation`.
- `guidelines/docs/COMPOSITION.md` — what the system permits and forbids
  (oversized windows and editorial whitespace are encouraged; filling the frame
  with windows, rounded cards, blurred shadows and ASCII over a headline are not).
  `MOTION.md` and `ASCII.md` cover those layers in depth.

Windows 98 is the compositional grammar; ASCII is a secondary layer that is never
required. Compose by *placing* one primary object, not by filling the frame.
