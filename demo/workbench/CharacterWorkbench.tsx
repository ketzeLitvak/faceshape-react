import { useState } from 'react';
import { Character } from '../../src';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import {
  configurationURL,
  type PlaygroundConfiguration,
  readSavedCharacters,
  type SavedCharacter,
} from './configuration';

function Preview({ config }: { config: PlaygroundConfiguration }) {
  const shape = resolveDemoShape(config.shape);
  return (
    <Character
      shape={shape}
      face={config.face}
      name={config.name}
      color={config.color}
      expression={config.expression}
      size={180}
      reducedMotion
      label={config.name}
    />
  );
}

export function CharacterWorkbench({
  configuration,
  loadConfiguration,
}: {
  configuration: PlaygroundConfiguration;
  loadConfiguration: (config: PlaygroundConfiguration) => void;
}) {
  const [saved, setSaved] = useState(readSavedCharacters);
  const [reference, setReference] = useState<PlaygroundConfiguration>();
  const [status, setStatus] = useState('');
  const [shareURL, setShareURL] = useState('');
  const persist = (items: SavedCharacter[]) => {
    try {
      localStorage.setItem('faceshape:characters:v1', JSON.stringify(items));
      setSaved(items);
      setStatus('Guardado en este navegador.');
    } catch {
      setStatus(
        'No se pudo guardar: el almacenamiento del navegador no está disponible.',
      );
    }
  };
  const save = () => {
    if (saved.length >= 20) {
      setStatus('Podés guardar hasta 20 personajes. Eliminá uno para agregar otro.');
      return;
    }
    persist([
      ...saved,
      { id: crypto.randomUUID(), configuration: structuredClone(configuration) },
    ]);
  };
  const share = async () => {
    const url = configurationURL(configuration, window.location.href);
    setShareURL(url);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Enlace copiado.');
    } catch {
      setStatus('Copiá el enlace del campo de abajo.');
    }
  };
  return (
    <section className="character-workbench">
      <h2>Guardá y compará</h2>
      <p>
        Fijá una referencia y seguí editando tu personaje. Los guardados permanecen en
        este navegador.
      </p>
      <div className="workbench-actions">
        <button type="button" onClick={save}>
          Guardar personaje
        </button>
        <button
          type="button"
          onClick={() => setReference(structuredClone(configuration))}
        >
          Fijar como referencia
        </button>
        <button type="button" onClick={share}>
          Copiar enlace
        </button>
        {reference && (
          <button type="button" onClick={() => setReference(undefined)}>
            Cerrar comparación
          </button>
        )}
      </div>
      <p role="status" className="workbench-status">
        {status}
      </p>
      {shareURL && (
        <label>
          Enlace para compartir{' '}
          <input
            className="share-url"
            value={shareURL}
            readOnly
            onFocus={(e) => e.target.select()}
          />
        </label>
      )}
      {reference && (
        <div className="comparison-grid">
          <article>
            <h3>Referencia · {reference.name}</h3>
            <Preview config={reference} />
            <button type="button" onClick={() => loadConfiguration(reference)}>
              Cargar referencia
            </button>
          </article>
          <article>
            <h3>Actual · {configuration.name}</h3>
            <Preview config={configuration} />
          </article>
        </div>
      )}
      {saved.length > 0 && (
        <div className="saved-characters">
          {saved.map((item) => (
            <article key={item.id}>
              <Preview config={item.configuration} />
              <h3>{item.configuration.name || 'Sin nombre'}</h3>
              <div className="workbench-actions">
                <button
                  type="button"
                  onClick={() => loadConfiguration(item.configuration)}
                >
                  Cargar
                </button>
                <button type="button" onClick={() => setReference(item.configuration)}>
                  Comparar
                </button>
                <button
                  type="button"
                  onClick={() => persist(saved.filter((value) => value.id !== item.id))}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
