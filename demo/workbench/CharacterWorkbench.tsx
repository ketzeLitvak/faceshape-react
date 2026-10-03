import { useState } from 'react';
import { Character } from '../../src';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import { ConfigurationSummary, configurationDetails } from './ConfigurationSummary';
import { configurationURL, type PlaygroundConfiguration } from './configuration';
import { SavedCharacters } from './SavedCharacters';

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
  const [reference, setReference] = useState<PlaygroundConfiguration>();
  const [status, setStatus] = useState('');
  const [shareURL, setShareURL] = useState('');
  const changes = reference
    ? Object.keys(configurationDetails(configuration)).filter((key) => {
        const current = configurationDetails(configuration);
        const original = configurationDetails(reference);
        return (
          current[key as keyof typeof current] !== original[key as keyof typeof original]
        );
      })
    : [];
  const takeReference = (config: PlaygroundConfiguration) => {
    setReference(structuredClone(config));
    setStatus('Referencia fijada. Cambiá los controles del playground para comparar.');
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
      <h2>Compará tus cambios</h2>
      <p>
        La referencia es una copia de tu configuración en este momento. Queda fija
        mientras cambiás la forma, los rasgos o la expresión en el playground.
      </p>
      <div className="workbench-actions">
        <button type="button" onClick={() => takeReference(configuration)}>
          {reference ? 'Reemplazar referencia con el actual' : 'Fijar como referencia'}
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
      {!reference && (
        <div className="workbench-guide">
          <strong>Cómo comparar</strong>
          <ol>
            <li>Elegí un personaje en los controles de arriba.</li>
            <li>Fijalo como referencia.</li>
            <li>Seguí editando: la columna Actual mostrará tus cambios.</li>
          </ol>
          <p>
            La referencia dura mientras seguís en esta vista. Se pierde al cerrar la
            comparación, salir o recargar la página. Para conservar un personaje, usá
            Guardar personaje.
          </p>
        </div>
      )}
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
        <>
          <p className="comparison-description">
            {changes.length
              ? `Cambios frente a la referencia: ${changes.join(', ')}.`
              : 'Todavía no hay diferencias. Cambiá los controles de arriba para probar otra combinación.'}{' '}
            Las dos vistas están detenidas para comparar sus formas.
          </p>
          <div className="comparison-grid">
            <article>
              <h3>Referencia · {reference.name}</h3>
              <p className="comparison-caption">
                Copia fija · conserva la configuración que elegiste
              </p>
              <Preview config={reference} />
              <ConfigurationSummary configuration={reference} />
              <button type="button" onClick={() => loadConfiguration(reference)}>
                Restaurar en el playground
              </button>
            </article>
            <article>
              <h3>Actual · {configuration.name}</h3>
              <p className="comparison-caption">
                Se actualiza mientras editás el playground
              </p>
              <Preview config={configuration} />
              <ConfigurationSummary configuration={configuration} reference={reference} />
            </article>
          </div>
        </>
      )}
      <SavedCharacters
        configuration={configuration}
        loadConfiguration={loadConfiguration}
        compare={takeReference}
      />
    </section>
  );
}
