import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import { Window } from '../components/window/Window';
import type { WindowControl } from '../components/types';

export interface EditorialWindowProps {
  /** Title bar text. */
  title?: ReactNode;
  /** Small line above the headline — a category, a status, a counter. */
  eyebrow?: ReactNode;
  /** The message. This is the top of the hierarchy; everything else supports it. */
  headline: ReactNode;
  /** Supporting sentence beneath the headline. */
  standfirst?: ReactNode;
  /** Free body content. */
  children?: ReactNode;
  /** Right or lower slot — usually an ASCII figure or an isolated control. */
  aside?: ReactNode;
  /** Bottom row: actions, a status bar, a source line. */
  footer?: ReactNode;
  /** Display size of the headline. */
  headlineSize?: 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Layout
   *  - `stacked` — headline over aside. Safest for vertical formats.
   *  - `split`   — headline beside aside.
   *  - `bare`    — headline only, maximum whitespace.
   */
  layout?: 'stacked' | 'split' | 'bare';
  controls?: WindowControl[];
  elevated?: boolean;
  active?: boolean;
  className?: string;
}

/**
 * EditorialWindow — a window used as a page, not as an interface.
 *
 * This is the primitive that keeps the system from being a screenshot
 * generator: real Windows 98 chrome wrapped around editorial typography and
 * real whitespace. The window is the grammar; the headline is the sentence.
 */
export function EditorialWindow({
  title,
  eyebrow,
  headline,
  standfirst,
  children,
  aside,
  footer,
  headlineSize = 'lg',
  layout = 'stacked',
  controls = ['minimize', 'maximize', 'close'],
  elevated = false,
  active = true,
  className,
}: EditorialWindowProps) {
  return (
    <Window
      title={title}
      controls={controls}
      scale="lg"
      elevated={elevated}
      active={active}
      className={cx('w98-editorial-window', `w98-editorial-window--${layout}`, className)}
    >
      <div className="w98-editorial-window__grid">
        <div className="w98-editorial-window__lead">
          {eyebrow ? <p className="w98-editorial-window__eyebrow">{eyebrow}</p> : null}
          <h1 className={cx('w98-editorial-window__headline', `w98-editorial-window__headline--${headlineSize}`)}>
            {headline}
          </h1>
          {standfirst ? <p className="w98-editorial-window__standfirst">{standfirst}</p> : null}
          {children ? <div className="w98-editorial-window__body">{children}</div> : null}
        </div>
        {aside && layout !== 'bare' ? <div className="w98-editorial-window__aside">{aside}</div> : null}
      </div>
      {footer ? <div className="w98-editorial-window__footer">{footer}</div> : null}
    </Window>
  );
}
