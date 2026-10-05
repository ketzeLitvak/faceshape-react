import { type ReactNode, useEffect, useId, useRef } from 'react';
import { IconButton } from '../components/IconButton';

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    (
      element?.querySelector<HTMLElement>('input, textarea') ??
      element?.querySelector<HTMLElement>('button')
    )?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (previous?.isConnected) {
        previous.focus();
      }
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="character-modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          dialog.current?.close();
        } else if (event.key === 'Tab') {
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]',
            ),
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialog.current?.close();
        }
      }}
    >
      <div className="modal-content">
        <div className="modal-heading">
          <h2 id={titleId}>{title}</h2>
          <IconButton
            icon="close"
            label="Cerrar modal"
            onClick={() => dialog.current?.close()}
          />
        </div>
        {children}
      </div>
    </dialog>
  );
}
