import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
const r = await p.evaluate(() => ({
  version: navigator.userAgent.match(/Chrome\/[\d.]+/)?.[0],
  fieldSizing: CSS.supports('field-sizing', 'content'),
  colorMix: CSS.supports('color', 'color-mix(in srgb, red, blue)'),
  where: CSS.supports('selector(:where(a))'),
}));
console.log(JSON.stringify(r, null, 2));
await b.close();
