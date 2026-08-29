/** Measures the gap between the input's content edge and the synthetic caret. */
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + process.cwd() + '/ds-bundle/components/controls/TextInput/TextInput.html?story=WithCaret', { waitUntil: 'networkidle' });
await p.waitForTimeout(250);
const rows = await p.evaluate(() =>
  [...document.querySelectorAll('.w98-text-input__well.has-caret')].map((w) => {
    const input = w.querySelector('input');
    const caret = w.querySelector('.w98-text-input__caret');
    const ir = input.getBoundingClientRect();
    const cr = caret ? caret.getBoundingClientRect() : null;
    return {
      value: input.value,
      inputW: +ir.width.toFixed(1),
      wellW: +w.getBoundingClientRect().width.toFixed(1),
      caretLeftMinusInputRight: cr ? +(cr.left - ir.right).toFixed(1) : null,
      inputFillsWell: ir.width > w.getBoundingClientRect().width - 12,
    };
  }),
);
console.log(JSON.stringify(rows, null, 2));
await b.close();
