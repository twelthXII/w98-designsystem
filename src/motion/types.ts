/**
 * Motion is specified here, not implemented here.
 *
 * This package ships motion *tokens*, *specifications* and a small set of CSS
 * utility classes. It deliberately contains no timeline runtime, no sequencer
 * and no player: composition tooling consumes these specs and drives them.
 */

/**
 * ACTIVE motion explains. It is functional interface movement that carries the
 * thought: a pointer travels, a control is pressed, a window opens.
 *
 * PASSIVE motion lives. It is atmosphere: an ASCII loop, a cycling glyph, a
 * blinking status light. It never carries meaning and never asks for attention.
 */
export type MotionClass = 'active' | 'passive';

/** Which layer of the visual hierarchy a motion belongs to. */
export type MotionLayer = 'cursor' | 'window' | 'control' | 'text' | 'ascii' | 'system';

export interface MotionSpec {
  /** Stable id, used by composition tooling to request a motion. */
  id: string;
  label: string;
  class: MotionClass;
  layer: MotionLayer;
  /** What this motion communicates. For passive motion: what it adds. */
  intent: string;
  /** What starts it. */
  trigger: string;
  /** Token reference, e.g. `motion.duration-base`. */
  duration: string;
  /** Token reference, e.g. `motion.ease-ui`. */
  easing: string;
  /** Properties the motion is allowed to touch. Nothing else may move. */
  properties: string[];
  loop: boolean;
  /** Ships as a CSS utility class in `styles/motion.css`. */
  utilityClass?: string;
  notes?: string;
}

export interface MotionRule {
  id: string;
  rule: string;
  rationale: string;
}
