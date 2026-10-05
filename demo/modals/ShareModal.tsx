import { useState } from 'react';
import {
  configurationURL,
  type PlaygroundConfiguration,
} from '../workbench/configuration';
import { Modal } from './Modal';

export function ShareModal({
  configuration,
  onClose,
}: {
  configuration: PlaygroundConfiguration;
  onClose: () => void;
}) {
  const [url] = useState(() => configurationURL(configuration, window.location.href));
  const [status, setStatus] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Enlace copiado.');
    } catch {
      setStatus('Seleccioná y copiá el enlace del campo.');
    }
  };
  return (
    <Modal title="Compartir personaje" onClose={onClose}>
      <p>
        El enlace abre esta combinación de nombre, forma, rasgos, expresión, color y
        movimiento. No hace falta guardar el personaje para compartirlo.
      </p>
      <label className="modal-field">
        Enlace del personaje
        <input value={url} readOnly onFocus={(event) => event.target.select()} />
      </label>
      <div className="workbench-actions">
        <button type="button" onClick={copy}>
          Copiar enlace
        </button>
      </div>
      <p role="status" className="workbench-status">
        {status}
      </p>
    </Modal>
  );
}
