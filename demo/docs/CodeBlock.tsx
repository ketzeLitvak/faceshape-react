import { useState } from 'react';
import { useDocsLanguage } from './language';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const language = useDocsLanguage();
  const isEnglish = language === 'en';
  const title = label ?? (isEnglish ? 'TSX example' : 'Ejemplo TSX');
  const [status, setStatus] = useState<'copied' | 'error'>();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="docs-code">
      <div className="docs-code-head">
        <span>{title}</span>
        <button type="button" onClick={copy}>
          {isEnglish ? 'Copy' : 'Copiar'}
        </button>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/noNoninteractiveTabindex: Scrollable code needs keyboard focus and an accessible region name. */}
      <pre tabIndex={0} role="region" aria-label={title}>
        <code>{code}</code>
      </pre>
      <span className="docs-copy-status" aria-live="polite">
        {status === 'copied'
          ? isEnglish
            ? 'Copied'
            : 'Copiado'
          : status === 'error'
            ? isEnglish
              ? 'Select the code to copy it'
              : 'Seleccioná el código para copiarlo'
            : ''}
      </span>
    </div>
  );
}
