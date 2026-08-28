# Motion language

> **Active motion explains. Passive motion lives.**

This repository holds motion *rules, specifications and components*. It holds no
timeline runtime, no sequencer and no player — sequenced motion is driven by the
consuming composition.

## Two classes

### ACTIVE — functional interface movement

Movement that carries a thought: a pointer travels, a control is pressed, a
window opens. Every active motion answers "what is happening, and why does it
matter".

`cursor-move` · `cursor-click` · `cursor-double-click` · `cursor-drag` ·
`window-open` · `window-close` · `window-minimize` · `window-maximize` ·
`button-press` · `checkbox-toggle` · `radio-select` · `dropdown-open` ·
`menu-navigate` · `progress-fill` · `loading` · `typing` · `selection` ·
`dialog-open` · `error-popup` · `scrollbar-drag`

Defined in [`src/motion/active.ts`](../src/motion/active.ts).

### PASSIVE — atmosphere

Movement that makes a still frame feel like a running machine. It carries no
meaning and must never be the loudest thing on screen.

`ascii-loop` · `char-cycle` · `glyph-blink` · `pixel-flicker` ·
`status-indicator` · `caret-blink` · `dither-drift` · `marquee-scroll`

Defined in [`src/motion/passive.ts`](../src/motion/passive.ts).

## The rules

Ten rules, in [`src/motion/rules.ts`](../src/motion/rules.ts). The load-bearing
ones:

1. **One active motion carries a moment.** Others wait their turn.
2. **Chain active motions causally** — cursor travels → clicks → window opens.
3. **At most two passive loops**, never in the same optical area as the active
   motion.
4. **Nothing animated crosses a headline.**
5. **Stepped by default.** Quantise text-mode and progress motion with
   `steps()`; reserve smooth easing for pointer travel and window geometry.
6. **Control feedback is instant** — one frame, no easing. Windows 98 controls
   had no transitions, and easing a bevel flip breaks the period immediately.
7. **The opening frame of a sequence must carry motion, and it should be
   active.** Passive motion alone will not hold the first two seconds.
8. **Stop everything for a beat before the payoff.** Contrast is what makes
   movement legible.
9. **If a motion cannot be described in one sentence of intent, cut it.**
10. **Reduced motion must still read.** Every utility resolves to a legible
    static state.

## What ships as CSS

`src/styles/motion.css` carries the self-contained effects:

| Class | Motion |
|-------|--------|
| `.w98-motion-window-open` / `-close` | Window geometry |
| `.w98-motion-dialog` | Dialog appearance |
| `.w98-motion-click` | Cursor tap |
| `.w98-motion-press` | Pressed bevel state |
| `.w98-motion-dropdown` | Unroll |
| `.w98-motion-progress` | Stepped fill (`--w98-motion-progress-target`) |
| `.w98-motion-typing` | Character-stepped reveal (`--w98-motion-typing-chars`) |
| `.w98-motion-select` | Selection sweep |
| `.w98-motion-blink` / `-caret` | Hard on/off blink |
| `.w98-motion-flicker` | CRT texture |
| `.w98-motion-indicator` | Status pulse |
| `.w98-motion-drift` | Ambient background drift |
| `.w98-motion-marquee` | Edge ticker |

Content-swap motion (ASCII frame loops, character cycling) is **not** CSS. Those
components take `frames` and a controlled `frameIndex`; the composition's own
timeline drives them. `.w98-motion-ascii-loop` and `.w98-motion-char-cycle` exist
only to carry the timing contract as CSS variables.

## Building a first frame

An opening composition should be assembled from one active chain plus at most
one passive detail. A reliable shape:

```
cursor-move → cursor-click → window-open        (active chain)
+ status-indicator or caret-blink               (one passive detail)
+ stillness for a beat before the message lands
```

Two examples of complete first frames are in
[`src/examples/DesktopComposition.tsx`](../src/examples/DesktopComposition.tsx)
and [`src/examples/EditorialComposition.tsx`](../src/examples/EditorialComposition.tsx).
