/** Confirms surface="none" adapts to its container while ink= still pins. */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
const f = resolve('./dist/styles/.ink.html');
writeFileSync(f, `<!doctype html><html><head><link rel="stylesheet" href="./w98.css"></head><body><div class="w98-root">
<div id="light" style="background:var(--w98-color-surface);color:var(--w98-color-ink)">
  <div class="w98-ascii-canvas w98-ascii-canvas--none" id="on-light"><pre class="w98-ascii-canvas__pre">X</pre></div>
</div>
<div id="dark" style="background:var(--w98-color-void);color:var(--w98-color-ascii-surface-ink)">
  <div class="w98-ascii-canvas w98-ascii-canvas--none" id="on-dark"><pre class="w98-ascii-canvas__pre">X</pre></div>
  <div class="w98-ascii-canvas w98-ascii-canvas--none" id="pinned" style="color:#ff0000"><pre class="w98-ascii-canvas__pre">X</pre></div>
</div>
<div class="w98-ascii-canvas w98-ascii-canvas--field" id="field"><pre class="w98-ascii-canvas__pre">X</pre></div>
<div class="w98-ascii-canvas w98-ascii-canvas--terminal" id="terminal"><pre class="w98-ascii-canvas__pre">X</pre></div>
</div></body></html>`);
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + f, { waitUntil: 'networkidle' });
const rows = await p.evaluate(() =>
  ['on-light','on-dark','pinned','field','terminal'].map((id) => {
    const el = document.getElementById(id);
    const cs = getComputedStyle(el);
    return { id, color: cs.color, bg: getComputedStyle(el.parentElement).backgroundColor };
  }),
);
console.table(rows);
await b.close();
unlinkSync(f);
