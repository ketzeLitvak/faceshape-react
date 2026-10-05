import { useState } from 'react';

export function CodeBlock({
  code,
  label = 'Ejemplo TSX',
}: {
  code: string;
  label?: string;
}) {
  const [status, setStatus] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copiado');
    } catch {
      setStatus('Seleccioná el código para copiarlo');
    }
  };

  return (
    <div className="docs-code">
      <div className="docs-code-head">
        <span>{label}</span>
        <button type="button" onClick={copy}>
          Copiar
        </button>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/noNoninteractiveTabindex: Scrollable code needs keyboard focus and an accessible region name. */}
      <pre tabIndex={0} role="region" aria-label={label}>
        <code>{code}</code>
      </pre>
      <span className="docs-copy-status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
