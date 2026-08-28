/**
 * Render smoke test.
 *
 * Renders every example to static markup. It does not assert on appearance —
 * it proves the component graph mounts, which is the cheapest way to catch a
 * broken export or a bad prop contract before a design sync.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { examples } from '../src/examples/index';

let failures = 0;

for (const example of examples) {
  try {
    const html = renderToStaticMarkup(createElement(example.component));
    if (!html || html.length < 40) throw new Error('rendered markup is suspiciously short');
    console.log(`  ok   ${example.id.padEnd(12)} ${html.length} bytes`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL ${example.id}: ${(error as Error).message}`);
  }
}

console.log(`smoke: ${examples.length - failures}/${examples.length} examples rendered`);
if (failures > 0) process.exit(1);
