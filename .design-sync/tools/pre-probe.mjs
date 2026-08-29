import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + process.cwd() + '/ds-bundle/components/compositions/EditorialWindow/EditorialWindow.html?story=Canonical', { waitUntil: 'networkidle' });
await p.waitForTimeout(300);
const out = await p.evaluate(() =>
  [...document.querySelectorAll('.w98-ascii-canvas__pre')].map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      fontSize: cs.fontSize,
      clientW: +r.width.toFixed(1),
      scrollW: el.scrollWidth,
      longestLine: Math.max(...el.textContent.split('\n').map((l) => l.length)),
      flexShrink: cs.flexShrink,
      minWidth: cs.minWidth,
      parentDisplay: getComputedStyle(el.parentElement).display,
      parentW: +el.parentElement.getBoundingClientRect().width.toFixed(1),
    };
  }),
);
console.log(JSON.stringify(out, null, 2));
await b.close();
