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
      <pre>
        <code>{code}</code>
      </pre>
      <span className="docs-copy-status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
