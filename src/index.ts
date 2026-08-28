/**
 * W98 ASCII Design System
 *
 * A code-backed design system built on two languages:
 *   1. Windows 98 desktop UI — the primary compositional grammar.
 *   2. ASCII / text-mode graphics — a secondary, supporting visual layer.
 *
 * The package ships tokens, components, composition primitives and motion
 * *specifications*. It contains no runtime, no pipeline and no content.
 *
 * Stylesheet: import `w98-ascii-design-system/styles.css` once, or
 * `src/styles/index.css` when consuming the source directly.
 */

export * from './tokens/index';
export * from './motion/index';
export * from './ascii/index';
export * from './components/index';
export * from './compositions/index';
export { cx } from './utils/cx';
