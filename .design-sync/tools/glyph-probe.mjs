/** Per-glyph face resolution for the ASCII inventory — proves the mono grid holds. */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const f = resolve('./dist/styles/.glyph.html');
const SETS = {
  'block shading': '░▒▓█',
  'box single': '┌─┐│└┘├┤┬┴┼',
  'box double': '╔═╗║╚╝',
  'box heavy': '┏━┓┃┗┛',
  'marks': '▮▏■□►◄▲▼√×…',
  'ascii base': 'ABCabc0123#%@*+=-:.',
};
writeFileSync(
  f,
  `<!doctype html><html><head><link rel="stylesheet" href="./w98.css"></head><body><div class="w98-root">` +
    Object.entries(SETS)
      .map(([k, v]) => `<div class="w98-ascii-canvas" id="${k.replace(/ /g, '-')}"><pre class="w98-ascii-canvas__pre">${v}</pre></div>`)
      .join('') +
    `</div></body></html>`,
);

const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + f, { waitUntil: 'networkidle' });
const cdp = await p.context().newCDPSession(p);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');
const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
for (const key of Object.keys(SETS)) {
  const { nodeId } = await cdp.send('DOM.querySelector', {
    nodeId: root.nodeId,
    selector: `#${key.replace(/ /g, '-')} pre`,
  });
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  const used = (fonts ?? []).filter((x) => x.glyphCount).map((x) => `${x.familyName}:${x.glyphCount}`);
  console.log(`  ${key.padEnd(14)} ${SETS[key].padEnd(22)} -> ${used.join('  ')}`);
}
// Does the grid hold? Compare rendered width of equal-length rows.
const widths = await p.evaluate(() =>
  [...document.querySelectorAll('pre')].map((el) => ({
    text: el.textContent,
    w: +el.getBoundingClientRect().width.toFixed(2),
    perChar: +(el.getBoundingClientRect().width / el.textContent.length).toFixed(3),
  })),
);
console.log('\n  advance width per character (must be identical for a monospace grid):');
for (const w of widths) console.log(`    ${String(w.perChar).padStart(7)}px  ${w.text.slice(0, 24)}`);
await b.close();
unlinkSync(f);
