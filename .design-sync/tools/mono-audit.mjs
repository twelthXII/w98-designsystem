/**
 * Per-candidate-face audit of the ASCII inventory: which glyphs a face actually
 * has, and whether one face covers everything (a split = a broken grid, because
 * per-glyph fallback brings a different advance width with it).
 */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const INVENTORY =
  '░▒▓█' + '┌─┐│└┘├┤┬┴┼' + '╔═╗║╚╝╬╦╩╠╣' + '┏━┓┃┗┛╋┳┻┣┫' + '▮▏■□►◄▲▼√×…' + '·∙˙' + '▉▊▋▌▍▎▏';
const FACES = [
  'Monaco', 'Menlo', 'Consolas', 'Courier New', 'DejaVu Sans Mono',
  'Lucida Console', 'MS Gothic', 'Andale Mono', 'PT Mono', 'SF Mono',
];

const f = resolve('./dist/styles/.mono.html');
writeFileSync(
  f,
  `<!doctype html><html><body>` +
    FACES.map(
      (face, i) =>
        `<pre id="f${i}" style="font-family:'${face}';font-size:16px;line-height:1;margin:0">${INVENTORY}</pre>`,
    ).join('') +
    `</body></html>`,
);

const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + f, { waitUntil: 'networkidle' });
const cdp = await p.context().newCDPSession(p);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');
const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });

console.log(`  inventory = ${INVENTORY.length} glyphs\n`);
console.log('  face                covered-by            verdict');
for (let i = 0; i < FACES.length; i++) {
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `#f${i}` });
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  const used = (fonts ?? []).filter((x) => x.glyphCount);
  const own = used.find((x) => x.familyName.replace(/\s/g, '').toLowerCase() === FACES[i].replace(/\s/g, '').toLowerCase());
  const total = used.reduce((n, x) => n + x.glyphCount, 0);
  const complete = own && own.glyphCount === total;
  console.log(
    `  ${FACES[i].padEnd(18)} ${used.map((x) => `${x.familyName}:${x.glyphCount}`).join(' + ').padEnd(40)} ${
      !own ? 'ABSENT on this machine' : complete ? '✓ COVERS ALL' : `✗ splits (${own.glyphCount}/${total})`
    }`,
  );
}
await b.close();
unlinkSync(f);
