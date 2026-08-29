# design-sync notes — w98-ascii-design-system

Repo-specific gotchas for future syncs. Read before re-running.

## Environment

- **Playwright browsers cache on macOS is `~/Library/Caches/ms-playwright/`**, not
  `~/.cache/ms-playwright/`. Checking the Linux path reports "nothing cached" and
  leads to proposing an unnecessary ~200MB download. Chromium build `1234`
  (matches playwright 1.62.x) was already present.
- Converter deps live in `.ds-sync/node_modules`. Local tools under
  `.design-sync/tools/` need the fork symlink to resolve `playwright`:
  `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules` (gitignored,
  recreate per clone).
- The shell's cwd persists between commands — an earlier `cd .ds-sync` silently
  broke later repo-relative writes. Use absolute paths or re-`cd` to the root.

## Build

- `cfg.cssEntry` must be **`dist/styles/w98.css`** — the flattened stylesheet
  produced by `scripts/bundle-css.mjs`. Pointing it at `src/styles/index.css` or
  `dist/styles/index.css` ships an `@import`-only manifest whose targets are not
  copied into the bundle, so **every design renders completely unstyled**
  (`_ds_bundle.css` = 1 KB stub, empty `tokens/`). This was the first-sync defect.
- `scripts/bundle-css.mjs` runs as part of `npm run build`. If the styles tree
  gains a file, it is picked up automatically via the `@import` closure.
- `cfg.provider` is `W98Root` — components need `.w98-root` for the pixel-locked
  environment. `W98Root` was added during the first sync specifically for this.
- `docsDir` auto-detects as `docs/`, which holds *guides*, not per-component
  docs, so `docs: 0/34 matched` is expected. `.prompt.md` is synthesized from the
  `.d.ts` + JSDoc, which is rich here. The five guides land in `guidelines/`.

## Typography (fixed during first sync — do not regress)

- Font stacks must **never end in `system-ui` / `ui-monospace` / `Segoe UI`**.
  Those resolve to whatever the host defaults to (SF Pro, Roboto), which silently
  replaces the system face and makes rendering non-deterministic per machine.
  Both stacks now end in faces that actually ship with an OS.
- Environment resets in `base.css` are wrapped in **`:where()`** so they carry zero
  specificity. Written plainly, `.w98-root button { font: inherit }` scores (0,1,1)
  and outranks `.w98-button` (0,1,0) — buttons inside a root rendered at the root's
  14px instead of their own 12px. Keep resets at zero specificity.
- `base.css` carries a **typography guard**: every component root declares
  `font-family: var(--w98-type-family-ui)` itself, because a component rendered
  *outside* a `.w98-root` otherwise gets the UA default (a bare `<button>` came out
  Arial). Inheritance cannot fix this — a UA rule on `<button>` beats an inherited
  value. ASCII components are deliberately excluded; they set the mono family in
  `components/ascii.css`, imported later.
- Verification tools: `.design-sync/tools/font-probe.mjs` (CDP
  `CSS.getPlatformFontsForNode` — reports the face actually rasterized, not the
  declared stack) and `.design-sync/tools/size-probe.mjs` (computed size/family
  inside vs outside a root). Run both after any typography change.
- **A probe that uses `page.setContent()` cannot load a `file://` stylesheet** —
  the page origin is `about:blank` and the CSS is silently dropped, so everything
  reads as UA defaults. Write a real file and `goto()` it.

## Known render warns

- `[FONT_MISSING]` — expected and accepted. The authentic faces (MS Sans Serif,
  Tahoma, MS Gothic, Lucida Console) are not redistributable, so nothing is
  bundled; the stacks fall back to OS-shipped faces of the same lineage
  (Tahoma → Verdana → DejaVu Sans; MS Gothic → Lucida Console → Monaco → Menlo).
  Picking a bundled display face is a **calibration decision**
  (`docs/CALIBRATION.md`), not a fallback decision — do not resolve this warn by
  inventing one.
- `[RENDER_BLANK]` / `[RENDER_THIN]` on unauthored components — these are floor
  cards, not failures. They clear as previews get authored.
- **Floor cards render in `.SF NS` / `system-ui`** because the converter's
  placeholder chrome hardcodes `font-family:system-ui`. That is converter markup,
  **not** a design-system fallback — do not chase it as a DS defect. An authored
  preview flips the component to Tahoma (verified on `Button`).

## Re-sync risks

- `dist/styles/w98.css` is generated. If `npm run build` is skipped before a
  re-sync, the bundle ships a stale stylesheet with no error.
- The typography guard in `base.css` is a hand-maintained selector list. A new
  component added to the library must be added to it, or it will render in the UA
  default outside a `.w98-root`. There is no automated check for this yet.
- `W98Root` and `scripts/bundle-css.mjs` were added by the sync, not by the DS
  authors — if upstream refactors the styles entry, re-check both.

## Post-sync calibration (opened during first sync)

- The user supplied two Windows 98 reference systems (Figma Community file and
  98.css) for a **substrate fidelity audit**, with hard constraints: reference
  only, never a runtime dependency, never a replacement for our architecture.
  Full scope in `.design-sync/CALIBRATION-AUDIT.md` — **read it before touching
  any chrome styling.**
- Explicit instruction: do not make broad visual changes mid-sync. The audit is a
  post-sync deliverable.
- 98.css ships a redistributable `ms_sans_serif` webfont — the likely answer to
  our standing `[FONT_MISSING]` warn, pending the calibration pass.

## First sync — outcome (2026-08-29)

- Project: `de00a72c-df41-4469-8ea3-b0303183aea8` ("W98 ASCII Design System").
- 34 components, all with authored previews; 100 cells, all graded `good`.
  Render check: 34/34 clean, 0 bad / 0 thin / 0 variants-identical, 6 build passes.
- Grades live in `.design-sync/.cache/review/` (gitignored). Cross-machine
  carry-forward comes from the uploaded `_ds_sync.json`, not from git.

### Repo changes this sync made (not authored by the DS team)

- `W98Root` component + `.w98-root--*` ground classes — needed as `cfg.provider`,
  and genuinely missing from the library.
- `scripts/bundle-css.mjs` + `dist/styles/w98.css` — the flattened stylesheet.
  Wired into `npm run build` and into the `./styles.css` export.
- Typography: deterministic stacks, `:where()` resets, the component typography
  guard (see the Typography section above).
- `SplitWindow`: the grid template now allocates a track for the splitter.
  Before the fix, three children in a two-track grid made the secondary pane wrap
  onto a second row, so every horizontal split rendered stacked with two-thirds of
  the window empty.
- `docsMap` regroup stubs in `.design-sync/groups/` — without them `Window`,
  `RadioGroup`, `StatusBarField` and `W98Root` land in a `general` fallback group.

### Re-sync risks

- **`dist/styles/w98.css` is generated.** Skipping `npm run build` before a
  re-sync ships a stale stylesheet with no error.
- **The typography guard in `base.css` is a hand-maintained selector list.** A new
  component must be added to it or it renders in the UA default outside a
  `.w98-root`. No automated check exists — consider adding one.
- **`.design-sync/groups/*.md` are grouping stubs, not documentation.** If real
  per-component docs are ever written, `docsMap` should point at those instead.
- **Grades follow the authored `.tsx` and preview-affecting config.** Editing a
  preview clears that component's grade; unrelated churn does not.
- **The conventions header names real tokens, classes and components.** Re-validate
  it against the fresh build on every re-sync (the driver does this) — a name that
  stops resolving silently misleads the design agent.
- **Pending, not done:** the 98.css / Figma substrate audit in
  `CALIBRATION-AUDIT.md`, plus two logged component quirks (TextInput caret
  placement, `AsciiCanvas` forcing ink on dark grounds) and the `WindowStack`
  `stack` doc/behaviour mismatch.
