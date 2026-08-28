/**
 * Emits `src/styles/tokens.css` from the TypeScript token registry.
 *
 * The TS files are the single source of truth. Run `npm run tokens` after any
 * token change; the generated stylesheet is committed so that consumers can use
 * the design system without a build step.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokenGroups, cssVarName } from '../src/tokens/index';

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, '../src/styles/tokens.css');

const lines: string[] = [
  '/*',
  ' * W98 ASCII Design System — design tokens',
  ' *',
  ' * GENERATED FILE. Do not edit by hand.',
  ' * Source: src/tokens/*.ts — regenerate with `npm run tokens`.',
  ' */',
  '',
  ':root {',
];

for (const group of tokenGroups) {
  lines.push(`  /* ${group.name.toUpperCase()} — ${group.doc} */`);
  for (const [key, value] of Object.entries(group.tokens)) {
    lines.push(`  ${cssVarName(group.name, key)}: ${value};`);
  }
  lines.push('');
}

if (lines[lines.length - 1] === '') lines.pop();
lines.push('}', '');

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, lines.join('\n'), 'utf8');

const count = tokenGroups.reduce((total, group) => total + Object.keys(group.tokens).length, 0);
console.log(`tokens: wrote ${count} custom properties across ${tokenGroups.length} groups → src/styles/tokens.css`);
