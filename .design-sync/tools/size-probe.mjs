/**
 * Computed font-family / font-size for representative component roots, both
 * inside and outside a .w98-root wrapper. Loads the real flattened stylesheet
 * from a real file URL (setContent would give the page an about:blank origin
 * and silently drop the file:// stylesheet).
 */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const probeFile = resolve('./dist/styles/.probe.html');
writeFileSync(
  probeFile,
  `<!doctype html><html><head><link rel="stylesheet" href="./w98.css"></head><body>
<div class="w98-root">
  <button class="w98-button" id="in-btn"><span class="w98-button__inner"><span class="w98-button__label">OK</span></span></button>
  <label class="w98-checkbox" id="in-check"><span class="w98-checkbox__label">Check</span></label>
  <div class="w98-status-bar" id="in-status"><span class="w98-status-bar__field">status</span></div>
  <div class="w98-title-bar" id="in-title"><span class="w98-title-bar__title">Title</span></div>
  <span class="w98-ascii-badge" id="in-ascii"><span class="w98-ascii-badge__content">OK</span></span>
  <div class="w98-menu" id="in-menu"><button class="w98-menu__item"><span class="w98-menu__label">Item</span></button></div>
</div>
<button class="w98-button" id="out-btn"><span class="w98-button__label">Bare</span></button>
<span class="w98-ascii-badge" id="out-ascii"><span class="w98-ascii-badge__content">OK</span></span>
</body></html>`,
);

const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + probeFile, { waitUntil: 'networkidle' });

const rows = await p.evaluate(() =>
  [...document.querySelectorAll('[id]')].map((el) => {
    const cs = getComputedStyle(el);
    return { id: el.id, size: cs.fontSize, stack: cs.fontFamily };
  }),
);
for (const r of rows) {
  console.log(`  ${r.id.padEnd(10)} ${r.size.padStart(9)}   ${r.stack.slice(0, 78)}`);
}
await b.close();
unlinkSync(probeFile);
