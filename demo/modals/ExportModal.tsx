import { useState } from 'react';
import { buildComponentExport } from '../componentExport';
import { DEMO_SHAPES } from '../shapes';
import type { PlaygroundConfiguration } from '../workbench/configuration';
import { Modal } from './Modal';

export function ExportModal({
  configuration,
  onClose,
}: {
  configuration: PlaygroundConfiguration;
  onClose: () => void;
}) {
  const [code] = useState(() => buildComponentExport(configuration));
  const [status, setStatus] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Componente copiado.');
    } catch {
      setStatus('Seleccioná el código para copiarlo manualmente.');
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([code], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MyCharacter.tsx';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Componente descargado.');
  };
  return (
    <Modal title="Exportar componente" onClose={onClose}>
      <p>
        Usalo en tu proyecto React con <code>faceshape-react</code> instalado. Incluye la
        cara completa, el color y los movimientos actuales.
      </p>
      {configuration.shape in DEMO_SHAPES && (
        <p className="save-hint">
          La silueta personalizada se incluye con la geometría de este nombre. Los ojos,
          la boca y las animaciones siguen funcionando.
        </p>
      )}
      <label className="modal-field">
        Componente React
        <textarea
          className="export-code"
          value={code}
          readOnly
          spellCheck={false}
          onFocus={(event) => event.target.select()}
        />
      </label>
      <div className="workbench-actions">
        <button type="button" onClick={copy}>
          Copiar componente
        </button>
        <button type="button" onClick={download}>
          Descargar .tsx
        </button>
      </div>
      <p role="status" className="workbench-status">
        {status}
      </p>
    </Modal>
  );
}
