/**
 * Copies the stylesheets into `dist` after the TypeScript build.
 * `tsc` only emits JS/d.ts; the CSS layer is shipped verbatim.
 */
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const from = resolve(here, '../src/styles');
const to = resolve(here, '../dist/styles');

mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log('css: copied src/styles → dist/styles');
