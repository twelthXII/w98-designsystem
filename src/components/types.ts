import type { ReactNode } from 'react';

/**
 * Shared vocabulary. Every component in the system speaks these words so that a
 * composition can be described in one consistent language.
 */

/**
 * Chrome scale.
 *  - `sm` — dense, authentic 98 metrics.
 *  - `md` — default; readable at social-media size.
 *  - `lg` — editorial. Oversized chrome used as a compositional element.
 *
 * `lg` is what makes this system a design language rather than a screenshot
 * generator: real proportions, larger pixels.
 */
export type W98Scale = 'sm' | 'md' | 'lg';

/** System message tone. Maps to the status colour ramp and the pixel icon set. */
export type W98Tone = 'info' | 'ok' | 'warning' | 'error' | 'question';

/**
 * The four legitimate jobs of the ASCII layer.
 *  - `semantic`     — depicts the subject or process being discussed.
 *  - `illustrative` — helps explain a thought, without being the subject.
 *  - `decorative`   — carries character only.
 *  - `ambient`      — passive texture; must stay behind everything else.
 *
 * The role drives optical weight, so it is a required prop wherever ASCII
 * appears. ASCII is never required on a composition — but when it is used, it
 * must declare which of these it is.
 */
export type AsciiRole = 'semantic' | 'illustrative' | 'decorative' | 'ambient';

/** Window chrome buttons, in the order Windows 98 draws them. */
export type WindowControl = 'minimize' | 'maximize' | 'restore' | 'help' | 'close';

export interface WithChildren {
  children?: ReactNode;
}
