/**
 * Flattens the stylesheet `@import` closure into a single distributable file.
 *
 * `src/styles/index.css` is a manifest: it documents load order, but it only
 * works where a bundler resolves `@import`. A design system also has to be
 * usable from a plain `<link>` — and any tool that consumes the package's CSS
 * without a bundler needs one self-contained file. That file is
 * `dist/styles/w98.css`, and it is what `w98-ascii-design-system/styles.css`
 * resolves to.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const entry = resolve(root, 'src/styles/index.css');
const outFile = resolve(root, 'dist/styles/w98.css');

const IMPORT = /^@import\s+["']([^"']+)["']\s*;[ \t]*$/gm;

/** Inlines local `@import`s depth-first, preserving order; remote ones stay. */
function inline(file, seen) {
  const abs = resolve(file);
  if (seen.has(abs)) return '';
  seen.add(abs);
  const dir = dirname(abs);
  return readFileSync(abs, 'utf8').replace(IMPORT, (match, spec) => {
    if (/^(https?:)?\/\//.test(spec) || spec.startsWith('url(')) return match;
    return `/* ── ${relative(root, resolve(dir, spec))} ── */\n${inline(resolve(dir, spec), seen)}`;
  });
}

const seen = new Set();
const css = [
  '/*',
  ' * W98 ASCII Design System — complete stylesheet',
  ' *',
  ' * GENERATED FILE. Do not edit by hand.',
  ' * Flattened from src/styles/index.css — regenerate with `npm run build`.',
  ' */',
  '',
  inline(entry, seen).trim(),
  '',
].join('\n');

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, css, 'utf8');
console.log(`css: flattened ${seen.size} stylesheets → dist/styles/w98.css (${(css.length / 1024).toFixed(1)} KB)`);
