# Composition rules

Windows 98 UI is the primary compositional language of this system. ASCII is a
secondary language. The message outranks both.

## The five-layer hierarchy

1. **Content / message** — what the composition says.
2. **Windows 98 UI metaphor** — the grammar it says it in.
3. **Functional UI motion** — active motion that explains.
4. **ASCII visual support** — semantic, illustrative, decorative or ambient.
5. **Decorative micro-detail** — passive motion, texture, small system marks.

When two layers conflict, the lower number wins. A headline is never obscured by
an ASCII field; a bevel is never removed to make room for decoration.

## Allowed

- **Oversized windows** — a window larger than the frame, cropped by the canvas.
- **Unconventional cropping** — chrome running off the edge, partial dialogs.
- **Large typography** — the display scale exists to be used at full size.
- **Editorial whitespace** — empty ground is a decision, not an omission.
- **Abstract composition** — chrome used as pure shape.
- **Oversized cursors** — a pointer as the subject, not just as a pointer.
- **Isolated system controls** — one group box, three radio buttons, nothing else.
- **ASCII illustration** — framed, role-declared, subordinate to the message.

## Forbidden

- **Filling the frame with windows.** More surface is not more design. Four
  windows arranged to fill a canvas is a screenshot, not a composition.
- **Illegibly small UI.** If the chrome cannot be read at delivery size, scale it
  up (`scale="lg"`) rather than shrinking the viewer.
- **Unmotivated retro props.** Every 98 element must be doing a job — showing
  focus, marking a decision, holding content. Never "because it looks period".
- **Unruled style mixing.** No Y2K, glassmorphism or cyberpunk unless a written
  rule introduces it, with a stated reason and a stated boundary.
- **Generic gradients.** The only gradients in this system are the two title-bar
  ones. There is no decorative gradient token and there should not be.
- **Rounded SaaS cards.** `--w98-border-radius` is `0`. The only rounded objects
  are the radio dot and the round dialog icon badge.
- **Heavy shadows.** Shadows are hard, offset and unblurred. One elevated object
  per composition; if you need two, remove a window instead.
- **Stray neon.** The palette is VGA-derived. Nothing glows.
- **ASCII noise over a headline.** Never. This is the one rule with no exception.
- **Everything moving at once.** See [`MOTION.md`](MOTION.md).

## Working method

1. **Write the message first.** If the composition does not survive as plain
   text, chrome will not save it.
2. **Choose one primary object.** Usually a window, sometimes a dialog, sometimes
   a single isolated control. Everything else supports it.
3. **Place, don't fill.** Decide where the ground stays empty before adding a
   second object.
4. **Add motion last, and only one active motion.** Ask what it explains.
5. **Ask whether ASCII is needed at all.** Often it is not. When it is, frame it
   and declare its role.

## Scale discipline

| Scale | Use |
|-------|-----|
| `sm`  | Dense, authentic metrics. Background windows, deep detail. |
| `md`  | Default. Readable at social delivery size. |
| `lg`  | Editorial. Chrome as a compositional band, oversized controls. |

Never fake `lg` by CSS-scaling an `sm` component: the system grows in real
pixels so that borders stay 1px/2px crisp and text stays hinted.
