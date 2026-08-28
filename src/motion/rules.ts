import type { MotionRule } from './types';

/**
 * The motion constitution. These rules outrank any individual spec.
 */
export const motionRules: MotionRule[] = [
  {
    id: 'one-active-focus',
    rule: 'Exactly one active motion carries a moment. Others wait their turn.',
    rationale:
      'Active motion explains. Two explanations at once cancel each other out and the composition reads as busy rather than as designed.',
  },
  {
    id: 'active-in-sequence',
    rule: 'Chain active motions causally: cursor travels → clicks → the window opens.',
    rationale:
      'The desktop metaphor only works if cause precedes effect. A window that opens without a trigger reads as a transition, not as an interface.',
  },
  {
    id: 'passive-budget',
    rule: 'At most two passive loops on screen, never inside the same optical area as the active motion.',
    rationale: 'Atmosphere should be noticed on the second watch, not the first.',
  },
  {
    id: 'never-over-headline',
    rule: 'No ASCII animation, flicker or texture crosses a headline block.',
    rationale: 'The message outranks every other layer. Legibility is not negotiable.',
  },
  {
    id: 'stepped-by-default',
    rule: 'Quantise text-mode and progress motion with steps(); reserve smooth easing for pointer travel and window geometry.',
    rationale:
      'Late-90s interfaces were frame-limited. Stepped timing is the single cheapest signal that this is not modern product motion.',
  },
  {
    id: 'instant-feedback',
    rule: 'Control feedback (press, check, select) is instant — one frame, no easing.',
    rationale: 'Windows 98 controls had no transitions. Easing a bevel flip is the fastest way to break the illusion.',
  },
  {
    id: 'first-frame-motion',
    rule: 'The opening composition of a sequence must carry motion, and it should be active motion.',
    rationale:
      'A first frame has to declare that this is a running system. Passive motion alone is not enough to hold the first two seconds.',
  },
  {
    id: 'stillness-before-payoff',
    rule: 'Stop all motion for a beat before the moment the composition is actually about.',
    rationale: 'Contrast is what makes a movement legible. Continuous motion has no accent.',
  },
  {
    id: 'motion-serves-message',
    rule: 'If a motion cannot be described in one sentence of intent, cut it.',
    rationale: 'Decoration that moves stops being decoration and starts being a distraction.',
  },
  {
    id: 'reduced-motion',
    rule: 'Every utility class must resolve to a legible static state under `prefers-reduced-motion: reduce`.',
    rationale: 'The composition must still say what it means when nothing moves.',
  },
];
