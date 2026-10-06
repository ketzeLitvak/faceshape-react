import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { DocsLanguage } from '../docs/language';
import { IconButton } from './IconButton';

export function LanguagePopover({
  language,
  onSelect,
}: {
  language: DocsLanguage;
  onSelect: (language: DocsLanguage) => void;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const trigger = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  const label =
    language === 'en' ? 'Documentation language' : 'Idioma de la documentación';
  const restoreFocus = useCallback(
    () => trigger.current?.querySelector('button')?.focus(),
    [],
  );
  useEffect(() => {
    if (!open) {
      return;
    }
    const reposition = () => {
      const box = trigger.current?.getBoundingClientRect();
      if (box) {
        setPosition({
          top: box.bottom + 8,
          left: Math.max(8, Math.min(box.right - 200, window.innerWidth - 208)),
        });
      }
    };
    reposition();
    panel.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
    const outside = (event: Event) => {
      if (
        event.target instanceof Node &&
        !trigger.current?.contains(event.target) &&
        !panel.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        restoreFocus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    document.addEventListener('keydown', onEscape);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      document.removeEventListener('keydown', onEscape);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open, restoreFocus]);
  return (
    <span className="language-picker" ref={trigger}>
      <IconButton
        icon="language"
        label={label}
        popup={{ expanded: open, controls: id }}
        onClick={() => setOpen((value) => !value)}
      />
      {open &&
        createPortal(
          <div
            className="language-popover language-options"
            id={id}
            ref={panel}
            role="dialog"
            aria-label={label}
            style={position}
          >
            {(
              [
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
              ] as const
            ).map((option) => (
              <button
                type="button"
                key={option.value}
                lang={option.value}
                aria-pressed={language === option.value}
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                  restoreFocus();
                }}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </span>
  );
}
