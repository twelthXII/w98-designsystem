/**
 * Reports the font ACTUALLY used to rasterize text in each preview, via CDP
 * (CSS.getPlatformFontsForNode) — not the declared stack, the resolved face.
 * This is the only way to prove a fallback isn't silently in play.
 */
import { chromium } from 'playwright';
import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const bundle = resolve(process.argv[2] ?? './ds-bundle');
const only = process.argv[3] ? process.argv[3].split(',') : null;

function findHtml(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) findHtml(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = findHtml(join(bundle, 'components'))
  .filter((f) => !only || only.some((n) => f.includes(`/${n}/`)))
  .sort();

const browser = await chromium.launch();
const page = await browser.newPage();
const cdp = await page.context().newCDPSession(page);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');

const tally = new Map();
const perComponent = [];

for (const file of files) {
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);
  const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', {
    nodeId: root.nodeId,
    selector: 'body *',
  });
  const seen = new Map();
  for (const nodeId of nodeIds) {
    let fonts;
    try {
      ({ fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId }));
    } catch {
      continue;
    }
    for (const f of fonts ?? []) {
      if (!f.glyphCount) continue;
      seen.set(f.familyName, (seen.get(f.familyName) ?? 0) + f.glyphCount);
      tally.set(f.familyName, (tally.get(f.familyName) ?? 0) + f.glyphCount);
    }
  }
  const name = file.split('/').slice(-2)[0];
  perComponent.push([name, [...seen.entries()].sort((a, b) => b[1] - a[1])]);
}

await browser.close();

console.log('=== resolved faces per component (family: glyphs) ===');
for (const [name, fonts] of perComponent) {
  console.log(`  ${name.padEnd(22)} ${fonts.map(([f, n]) => `${f}:${n}`).join('  ') || '(no text)'}`);
}
console.log('\n=== totals across all previews ===');
for (const [f, n] of [...tally.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(7)}  ${f}`);
}
