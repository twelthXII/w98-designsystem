/**
 * Token primitives.
 *
 * Every token group is a flat record. The CSS custom property name is derived
 * mechanically as `--w98-<group>-<key>`, so token authoring and the generated
 * stylesheet can never drift.
 *
 * Composite tokens (bevels, shadows) intentionally reference primitive tokens
 * through `var(--w98-…)` so that re-theming a primitive re-themes everything
 * built on top of it.
 */
export type TokenValue = string | number;

export type TokenGroup = Record<string, TokenValue>;

export type TokenGroupName =
  | 'color'
  | 'type'
  | 'space'
  | 'border'
  | 'bevel'
  | 'shadow'
  | 'pattern'
  | 'motion'
  | 'ascii'
  | 'layout'
  | 'z';

export interface TokenGroupDefinition {
  name: TokenGroupName;
  /** Short description, emitted as a comment header in the generated CSS. */
  doc: string;
  tokens: TokenGroup;
}
