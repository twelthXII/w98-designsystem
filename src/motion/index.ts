import { activeMotion } from './active';
import { passiveMotion } from './passive';
import { motionRules } from './rules';
import type { MotionSpec } from './types';

export { activeMotion, passiveMotion, motionRules };
export type { MotionSpec, MotionRule, MotionClass, MotionLayer } from './types';

/** Every motion in the system, active first. */
export const motionSpecs: MotionSpec[] = [...activeMotion, ...passiveMotion];

export function getMotion(id: string): MotionSpec | undefined {
  return motionSpecs.find((spec) => spec.id === id);
}

export function motionByClass(motionClass: MotionSpec['class']): MotionSpec[] {
  return motionSpecs.filter((spec) => spec.class === motionClass);
}

export function motionByLayer(layer: MotionSpec['layer']): MotionSpec[] {
  return motionSpecs.filter((spec) => spec.layer === layer);
}
