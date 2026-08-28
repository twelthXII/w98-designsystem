import type { ReactNode } from 'react';
import { Dialog } from './Dialog';
import type { DialogProps } from './Dialog';

export interface ErrorDialogProps extends Omit<DialogProps, 'tone'> {
  /**
   * A machine-style code line (`0x0000007B`, `ERR_NO_SIGNAL`). Optional, and
   * intentionally content-free here — the composition supplies it.
   */
  code?: ReactNode;
}

/**
 * ErrorDialog — the system's hard stop.
 *
 * Compositionally this is the strongest object in the library: it is the only
 * one that is *allowed* to be the entire slide. Stack two or three, offset by a
 * few pixels, and the slide reads as escalation without a single word of copy.
 */
export function ErrorDialog({ code, detail, children, ...rest }: ErrorDialogProps) {
  return (
    <Dialog tone="error" detail={detail} {...rest}>
      {code ? <p className="w98-dialog__code">{code}</p> : null}
      {children}
    </Dialog>
  );
}
