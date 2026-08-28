# The ASCII layer

ASCII is the **secondary** visual language of this system. Windows 98 UI is the
primary one. ASCII is never required — a composition that works without it ships
without it.

## The four roles

Every ASCII element declares a `role`, which sets its optical weight and
therefore its place in the hierarchy.

| Role | Job | Weight | Announced to AT |
|------|-----|--------|-----------------|
| `semantic` | Depicts the object or process being discussed. | `1` | yes (`alt`) |
| `illustrative` | Helps explain a thought without being the subject. | `1` | yes (`alt`) |
| `decorative` | Carries character only. | `0.6` | no |
| `ambient` | Passive texture; sits behind everything. | `0.35` | no |

Two things follow from this:

- **ASCII does not have to mean anything.** `decorative` and `ambient` are fully
  legitimate roles.
- **ASCII does not have to be present.** There is no per-composition quota.

## Primitives

| Component | Use |
|-----------|-----|
| `AsciiCanvas` | The base grid. One character = one cell, `line-height: 1`. |
| `AsciiText` | Readable text wearing the text-mode voice: labels, paths, codes. |
| `AsciiIllustration` | A drawing with a declared role, optional `alt` and caption. |
| `AsciiBadge` | A small bracketed mark: state, count, label. |
| `AsciiPanel` | The composition primitive: ASCII framed by a 98 surface. |

## Frame it

Loose ASCII floating over a composition reads as noise. The same figure inside a
sunken field reads as content the system is displaying. `AsciiPanel` is the
default way to place ASCII:

```tsx
<AsciiPanel
  label="figure"
  role="illustrative"
  surface="field"      // field · terminal · bare
  size="sm"
  figure={figure}
  footer={<AsciiBadge tone="info">supporting layer</AsciiBadge>}
/>
```

Use `surface="bare"` only for `ambient` texture, and keep it away from the
headline block.

## Where figures come from

This library ships **no clip art**. Figures are either:

1. **Generated** — `src/ascii/patterns.ts` provides `asciiBox`, `asciiRule`,
   `asciiField`, `asciiDither`, `asciiBar`, `rampGlyph`, `asciiLines`,
   `asciiWidth`. The dither generator is deterministic (ordered threshold, no
   RNG), so a composition renders identically on every pass.
2. **Supplied by the composition** — a subject-specific drawing belongs to the
   piece that needs it, passed in as a multi-line string.

Raw material — density ramps, box-drawing sets, cycle pools and marks — lives in
`src/ascii/charsets.ts`.

## Animation

ASCII animation is **passive motion**. It is specified in
`src/motion/passive.ts` (`ascii-loop`, `char-cycle`, `glyph-blink`) and driven
externally: `AsciiCanvas`, `AsciiIllustration` and `AsciiPanel` accept `frames`
and a controlled `frameIndex`. Nothing in this package animates content on its
own, because content swaps are the consuming composition's timeline to own.

Keep loops under ~12 frames. This is text-mode, not video.

## Hard rules

- Never place ASCII over a headline.
- Never let a `decorative` figure become the largest object in the frame.
- Never break the monospaced grid: `line-height` stays `1`, tracking stays `0`.
- Never use ASCII as a substitute for a missing message.
