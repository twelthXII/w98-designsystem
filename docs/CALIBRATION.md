# Calibration

Visual references have not landed yet. This repository is deliberately
under-decorated: it establishes an architecture that can absorb styling
decisions, rather than pre-empting them.

## Fixed — not a calibration candidate

These carry the recognisability of the language. Changing them changes what the
system *is*.

- The control substrate: `--w98-color-surface` (`#c0c0c0`) and the bevel ramp
  (`bevel-light` · `bevel-face` · `bevel-shadow` · `bevel-dark`).
- The bevel composites themselves (`raised`, `pressed`, `window`, `field`,
  `etched`, `engraved`).
- `--w98-border-radius: 0`.
- Chrome metrics in `src/tokens/layout.ts` at `sm`/`md` scale.
- The classic title-bar gradients.
- Instant, unstepped control feedback.

## Open — decide after visual exploration

| Area | Token / file | The decision to make |
|------|--------------|----------------------|
| Status ramp | `color['status-*']` | Whether to stay VGA-derived or move to a specific accent family. |
| Editorial neutrals | `color['paper' \| 'void' \| 'desktop*']` | Which grounds the system actually uses, and in what proportion. |
| Display scale | `typography['size-display-*']` | Top three steps will move once real headlines are set. |
| UI family | `typography['family-ui']` | **Open.** The fallback chain is deterministic and ordered deliberately, but the faces themselves are a placeholder, not a choice. |
| Mono family | `typography['family-mono']` | **Open.** Ordered by measured glyph coverage so the ASCII grid holds; which mono face the system wants is undecided. Audit any candidate with `.design-sync/tools/mono-audit.mjs` before adding it — a face that splits the ASCII inventory breaks the 1ch grid. |
| Display family | `typography['family-display']` | Currently the UI stack. A distinct editorial face is an open decision. |
| ASCII weights | `ascii['opacity-*']` | How quiet ambient really needs to be against each ground. |
| ASCII sizes | `ascii['size-*']` | Depends on delivery resolution. |
| Shadow depth | `shadow['hard-*']`, `drop-window` | How far an oversized window floats. |
| Oversized metrics | `layout['*-lg']`, `layout['cursor-*']` | The `lg` scale is a first proposal, not a conclusion. |
| Motion durations | `motion['duration-*']` | Tune against real footage; the *class split* stays. |
| Pixel icon set | `PixelIconContainer` children | No icon set is bundled; the container fixes the proportions so a set can drop in. |

## How to absorb a reference

1. **Name what the reference decides.** One row of the table above, not "the
   whole look".
2. **Change the token, not the component.** If a component needs editing to
   express the reference, the missing thing is a token — add it to
   `src/tokens/*` and regenerate.
3. **Run `npm run tokens && npm run dev`** and check the token specimen and both
   compositions. Every consequence appears at once.
4. **Write the rule down.** If the reference introduces a style outside the
   Windows 98 / ASCII pair, it needs an explicit rule in
   [`COMPOSITION.md`](COMPOSITION.md) with a stated boundary — unruled mixing is
   forbidden.

## Adding variants

Deliberately, the library ships few variants per component. Add one only when a
real composition needs it, and document it in the component's JSDoc at the same
time. Speculative variants are how a design system stops being a system.
