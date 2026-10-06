import type { DocsLanguage } from '../docs/language';
import { Modal } from './Modal';

export function LanguageModal({
  language,
  onSelect,
  onClose,
}: {
  language: DocsLanguage;
  onSelect: (language: DocsLanguage) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title={language === 'en' ? 'Documentation language' : 'Idioma de la documentación'}
      onClose={onClose}
    >
      <div className="language-options">
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
              onClose();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Modal>
  );
}
