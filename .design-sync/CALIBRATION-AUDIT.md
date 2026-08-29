# Post-sync calibration audit — scope

**Status: SCOPE ONLY. No changes from this document have been applied.**
Opened during the first design-sync run on the user's instruction to prepare an
audit rather than make uncontrolled visual changes mid-sync. Execute after the
first sync completes.

## Reference foundations

1. **Windows 98 Design System (Figma Community)** —
   https://www.figma.com/design/GKvY1KvlfzS2V652yWCbwr/Windows-98-Design-System--Community-?node-id=122-11
2. **98.css** — https://jdan.github.io/98.css/ · source https://github.com/jdan/98.css

Both are references for **authentic OS chrome only**.

## Hard constraints (from the user, non-negotiable)

- Do **not** replace our architecture with 98.css.
- Do **not** make 98.css a runtime dependency — no wrapping the external library.
- Do **not** remove or weaken the ASCII, composition, or motion architecture.
- Preserve our React API and our token architecture exactly.
- Where 98.css has a more faithful primitive, **translate the underlying visual
  rule into our tokens/styles**; never import its CSS.
- Do **not** copy editorial/composition decisions from 98.css. It is chrome
  reference, not layout language — our social/editorial layer stays ours.
- Do **not** add a JavaScript animation runtime. Motion stays declarative so
  HyperFrames can drive it later.
- ASCII remains an independent secondary visual layer, untouched by this audit.

## Substrate areas to audit

Each is a comparison of our current rule against the reference, resulting in a
token/style delta — not a component rewrite.

| Area | Ours today | To verify against reference |
|---|---|---|
| Bevels | `bevel.raised/pressed/window/field/etched/engraved` composites | inset order, exact 4-stop ramp, 1px vs 2px steps |
| Raised / sunken | box-shadow insets | which elements use window vs button bevel |
| Button dimensions & states | `control-height` 23px, min-width 75px | padding, min sizes, active offset, default-action ring |
| Checkbox | 13px box, `✔` glyph | box size, check mark rendering, indeterminate |
| Radio | 13px, CSS border-radius circle | 98.css uses a bitmap-accurate circle — ours is a CSS ellipse |
| Group boxes | `bevel.etched` + absolute legend | legend inset, border style |
| Text inputs | `bevel.field` | inner padding, selection colour |
| **Sliders** | **absent from our library** | candidate new component — decide scope |
| Dropdowns | custom combo + arrow button | arrow glyph and button metrics |
| Windows | `bevel.window`, 2px frame | title bar height, body inset |
| Title bars | 18px, gradient, 14px buttons | gradient stops, button glyph rendering, inactive state |
| Status bars | 20px, engraved fields | field inset, grip rendering |
| Tabs | negative-margin selected tab | tab overlap geometry |
| Scrollbars | 16px, arrow buttons | thumb/track, arrow glyphs, button metrics |
| Progress indicators | segmented + solid | segment width and gap |
| Field borders | `bevel.field` | 1px vs 2px, colour stops |
| Focus | 1px dotted, `-4px` offset | offset and colour |
| Disabled | `ink-disabled` + white emboss shadow | emboss offset and which elements get it |

## Typography (open — explicitly deferred to this pass)

**No font has been chosen.** The corrective pass deliberately changed nothing
here. `family-ui` and `family-mono` carry deterministic, coverage-ordered
fallback chains and are marked as open decisions in `src/tokens/typography.ts`.
Decide them as part of the substrate, not ahead of it. Two constraints the pass
must respect, both established by measurement rather than preference:

- Never end a stack in `system-ui` / `ui-monospace` — those resolve to whatever
  the host defaults to and make rendering non-deterministic per machine.
- Any mono candidate must carry the whole ASCII inventory. Run
  `.design-sync/tools/mono-audit.mjs`: a face that covers only part of it hands
  the rest to a fallback at a different advance width, which breaks the 1ch grid.



`[FONT_MISSING]` is currently accepted with OS-shipped fallbacks (Tahoma →
Verdana → DejaVu Sans). **98.css ships a redistributable `ms_sans_serif` webfont**
— evaluate it as the bundled face that would close this warn and deliver the true
pixel substrate. This is a calibration decision under `docs/CALIBRATION.md`, and
it interacts with the deterministic fallback chain established in this run.

Do not regress the two typography rules fixed in this run: zero-specificity
resets (`:where()`), and every component declaring its own family.

## Motion mapping

98.css encodes **interaction states**, not animation. Map those states onto our
existing ACTIVE motion specs as a declarative chain:

```
cursor travel → hover → pointer down → pressed/sunken → pointer up → UI event
 cursor-move    (state)   (state)       button-press     (state)      window-open
                                                                    / dialog-open
```

Our `src/motion/active.ts` already names the endpoints; what the reference adds is
the intermediate **state** vocabulary (hover, pointer-down) which we currently do
not model. Decide whether those become motion specs, style states, or both.
Keep everything declarative — no runtime in this repository.

## Method

1. Read 98.css source rule by rule for each area above.
2. Diff against our compiled `dist/styles/w98.css`.
3. Record each delta as a token/style change proposal with the reference rule quoted.
4. Apply in one reviewed pass, then re-sync — grades and previews carry forward.

## Component quirks found during the first sync (not fixed mid-sync)

- **`TextInput` caret placement.** `.w98-text-input__well.has-caret::after` renders
  the caret after the `<input>`, which is `width: 100%`, so the caret lands flush
  against the right edge of the well instead of immediately after the text. Reads
  as an artifact rather than an insertion point. Fix candidate: size the input to
  its content when `caret` is set, or render the caret as an overlay positioned
  from the text end. Deferred — it is a styling decision, and 98.css's text-input
  treatment should inform it in the same pass.

- **RESOLVED (corrective pass).** `WindowStack` `stack` arrangement contradicted
  its own documentation. The
  JSDoc says `stack` is "perfectly aligned, offset in z only. Reads as
  escalation." In practice `dy = offsetY * step * 0.25` yields ~4.5px of
  separation at the default offset, so three stacked dialogs render as one and
  the escalation reads as a single dialog. Either raise the multiplier or rewrite
  the doc to say `cascade` is the escalation arrangement. Found while authoring
  the ErrorDialog preview; the card now uses `cascade`, which does read correctly.
  Fixed: `stack` now aligns exactly (offsets ignored, per its contract) and the
  escalation note moved to `cascade`, where the behaviour actually lives.

- **`AsciiCanvas` forces its ink colour, so ASCII goes invisible on dark grounds.**
  `.w98-ascii-canvas` sets `color: var(--w98-color-ascii-ink)` (black) even at
  `surface="none"`, overriding inheritance. Placing a `bare` ASCII figure inside
  any dark container — `SplitWindow` with `secondarySurface="terminal"`, a
  `DesktopCanvas` with `ground="void"` — renders black on black with no warning.
  `AsciiCanvas` exposes an `ink` prop as the escape hatch, but `AsciiPanel` does
  not forward it, so the composition primitive has no way out. Candidate fix:
  inherit colour at `surface="none"` (safe — on light grounds it still resolves to
  the ink token), and/or forward `ink` through `AsciiPanel`. Deferred; the cards
  now use `surface="terminal"`, which carries its own light ink.
