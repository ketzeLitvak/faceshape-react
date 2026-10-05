import { type ReactNode, useEffect, useId, useRef } from 'react';

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
    dialog.current?.showModal();
    return () => previous?.focus();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="character-modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          dialog.current?.close();
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
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
