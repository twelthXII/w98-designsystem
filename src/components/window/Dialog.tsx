import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TitleBar } from './TitleBar';
import { PixelIconContainer } from '../desktop/PixelIconContainer';
import type { W98Scale, W98Tone } from '../types';

export interface DialogProps {
  title?: ReactNode;
  /**
   * Tone drives the pixel icon and the accent used by the message.
   * `none` renders a plain dialog with no icon column.
   */
  tone?: W98Tone | 'none';
  /** Icon override. By default the tone supplies a system pixel glyph. */
  icon?: ReactNode;
  /** The dialog's sentence. Keep it to one or two lines — this is a system voice. */
  message?: ReactNode;
  /** Secondary detail line, drawn smaller beneath the message. */
  detail?: ReactNode;
  /** Buttons row. Pass `Button` elements; the primary action goes first. */
  actions?: ReactNode;
  /** Arbitrary body content, drawn between message and actions. */
  children?: ReactNode;
  scale?: W98Scale;
  /** Fixed width in px, or `auto` to size to content. */
  width?: number | 'auto';
  active?: boolean;
  elevated?: boolean;
  onClose?: () => void;
  className?: string;
}

const toneGlyph: Record<W98Tone, string> = {
  info: 'i',
  ok: '✓',
  warning: '!',
  error: '✕',
  question: '?',
};

/**
 * Dialog — a modal system statement.
 *
 * In composition terms a dialog is the *turn* in an argument: it interrupts,
 * it states one thing, and it offers a decision. Use it sparingly; a slide
 * with three dialogs has three arguments and reads as none.
 *
 * Variants: tone info | ok | warning | error | question | none.
 */
export function Dialog({
  title,
  tone = 'info',
  icon,
  message,
  detail,
  actions,
  children,
  scale = 'md',
  width = 'auto',
  active = true,
  elevated = true,
  onClose,
  className,
}: DialogProps) {
  const showIcon = tone !== 'none';

  return (
    <div
      className={cx(
        'w98-dialog',
        `w98-dialog--${scale}`,
        tone !== 'none' && `w98-dialog--${tone}`,
        elevated && 'w98-dialog--elevated',
        className,
      )}
      role="dialog"
      aria-modal="true"
      style={width === 'auto' ? undefined : { width }}
    >
      <TitleBar
        title={title}
        active={active}
        controls={onClose ? ['close'] : []}
        scale={scale}
        onClose={onClose}
      />
      <div className="w98-dialog__body">
        {showIcon ? (
          <div className="w98-dialog__icon">
            {icon ?? (
              <PixelIconContainer size="md" tone={tone as W98Tone} shape="round">
                {toneGlyph[tone as W98Tone]}
              </PixelIconContainer>
            )}
          </div>
        ) : null}
        <div className="w98-dialog__content">
          {message ? <p className="w98-dialog__message">{message}</p> : null}
          {detail ? <p className="w98-dialog__detail">{detail}</p> : null}
          {children}
        </div>
      </div>
      {actions ? <div className="w98-dialog__actions">{actions}</div> : null}
    </div>
  );
}
