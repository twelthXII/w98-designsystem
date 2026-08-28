import { boxSets, ramps, type BoxSetName, type RampName } from './charsets';

/**
 * Generators for text-mode figures.
 *
 * Deliberately generic: this file draws grids, frames, rules and fields — the
 * grammar. Subject-specific illustrations belong in the composition that needs
 * them, passed to `<AsciiIllustration />` as a string.
 */

/** A rectangular frame, optionally with a title welded into the top edge. */
export function asciiBox(
  width: number,
  height: number,
  options: { set?: BoxSetName; title?: string; fill?: string } = {},
): string {
  const { set = 'single', title, fill = ' ' } = options;
  const g = boxSets[set];
  const w = Math.max(2, Math.floor(width));
  const h = Math.max(2, Math.floor(height));

  let top = g.h.repeat(w - 2);
  if (title) {
    const label = ` ${title} `.slice(0, Math.max(0, w - 4));
    top = label + g.h.repeat(Math.max(0, w - 2 - label.length));
  }

  const rows: string[] = [g.tl + top + g.tr];
  for (let i = 0; i < h - 2; i += 1) rows.push(g.v + fill.repeat(w - 2) + g.v);
  rows.push(g.bl + g.h.repeat(w - 2) + g.br);
  return rows.join('\n');
}

/** A horizontal rule of a given width. */
export function asciiRule(width: number, set: BoxSetName = 'single'): string {
  return boxSets[set].h.repeat(Math.max(1, Math.floor(width)));
}

/** A flat field of one glyph — the base for ambient texture. */
export function asciiField(width: number, height: number, glyph = '░'): string {
  return Array.from({ length: Math.max(1, height) }, () => glyph.repeat(Math.max(1, width))).join('\n');
}

/**
 * A deterministic dither field. Density 0 → empty, 1 → solid.
 * Deterministic so that a composition renders identically on every pass.
 */
export function asciiDither(
  width: number,
  height: number,
  density = 0.35,
  ramp: RampName = 'block',
): string {
  const glyphs = ramps[ramp];
  const rows: string[] = [];
  for (let y = 0; y < Math.max(1, height); y += 1) {
    let row = '';
    for (let x = 0; x < Math.max(1, width); x += 1) {
      // Ordered 4x4 Bayer-style threshold: stable, evenly spread, no RNG.
      const threshold = (((x * 5 + y * 3) % 4) * 4 + ((x * 3 + y * 7) % 4)) / 16;
      const index = threshold < density ? 0 : glyphs.length - 1;
      row += glyphs[Math.min(index, glyphs.length - 1)] ?? ' ';
    }
    rows.push(row);
  }
  return rows.join('\n');
}

/** Maps a 0–1 value onto a glyph from a density ramp. */
export function rampGlyph(value: number, ramp: RampName = 'block'): string {
  const glyphs = ramps[ramp];
  const clamped = Math.min(1, Math.max(0, value));
  // Ramps run dark → light, so invert: a high value should be dense.
  const index = Math.round((1 - clamped) * (glyphs.length - 1));
  return glyphs[index] ?? ' ';
}

/** A horizontal bar built from ramp glyphs — an ASCII progress/meter figure. */
export function asciiBar(value: number, width = 20, ramp: RampName = 'block'): string {
  const filledCount = Math.round(Math.min(1, Math.max(0, value)) * width);
  const glyphs = ramps[ramp];
  const dense = glyphs[0] ?? '█';
  const empty = glyphs[glyphs.length - 1] ?? ' ';
  return dense.repeat(filledCount) + empty.repeat(Math.max(0, width - filledCount));
}

/** Splits a multi-line figure into rows, for per-line staggering. */
export function asciiLines(figure: string): string[] {
  return figure.replace(/\r\n/g, '\n').split('\n');
}

/** Longest line length — the character-cell width of a figure. */
export function asciiWidth(figure: string): number {
  return asciiLines(figure).reduce((max, line) => Math.max(max, line.length), 0);
}
