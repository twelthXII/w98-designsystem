import { TokenSpecimen } from './TokenSpecimen';
import { ControlGallery } from './ControlGallery';
import { WindowAnatomy } from './WindowAnatomy';
import { AsciiGallery } from './AsciiGallery';
import { MotionSpecSheet } from './MotionSpecSheet';
import { EditorialComposition } from './EditorialComposition';
import { DesktopComposition } from './DesktopComposition';

export {
  TokenSpecimen,
  ControlGallery,
  WindowAnatomy,
  AsciiGallery,
  MotionSpecSheet,
  EditorialComposition,
  DesktopComposition,
};

export interface ExampleEntry {
  id: string;
  title: string;
  /** What this example is for — read by the playground and by design tooling. */
  summary: string;
  component: () => JSX.Element;
  /** Examples that render a full output frame rather than a documentation sheet. */
  kind: 'reference' | 'composition';
}

/**
 * The example registry. Reference sheets document the system; compositions show
 * it being used as a design language.
 */
export const examples: ExampleEntry[] = [
  {
    id: 'tokens',
    title: 'Design tokens',
    summary: 'Every colour, bevel and type step, rendered for visual calibration.',
    component: TokenSpecimen,
    kind: 'reference',
  },
  {
    id: 'controls',
    title: 'Controls',
    summary: 'All controls in every documented variant.',
    component: ControlGallery,
    kind: 'reference',
  },
  {
    id: 'windows',
    title: 'Window anatomy',
    summary: 'Full chrome, split layout, dialog family, stacked escalation.',
    component: WindowAnatomy,
    kind: 'reference',
  },
  {
    id: 'ascii',
    title: 'ASCII layer',
    summary: 'The four ASCII roles and the text-mode primitives.',
    component: AsciiGallery,
    kind: 'reference',
  },
  {
    id: 'motion',
    title: 'Motion',
    summary: 'Active and passive motion specs, rules, and the shipped CSS utilities.',
    component: MotionSpecSheet,
    kind: 'reference',
  },
  {
    id: 'editorial',
    title: 'Editorial composition',
    summary: '1:1 frame — Windows 98 as grammar for an editorial layout.',
    component: EditorialComposition,
    kind: 'composition',
  },
  {
    id: 'desktop',
    title: 'Desktop composition',
    summary: '4:5 frame — the desktop metaphor, with one active and one passive motion.',
    component: DesktopComposition,
    kind: 'composition',
  },
];
