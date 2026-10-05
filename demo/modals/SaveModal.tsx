import type { PlaygroundConfiguration } from '../workbench/configuration';
import type { useSavedCharacters } from '../workbench/useSavedCharacters';
import { Modal } from './Modal';

export function SaveModal({
  collection,
  configuration,
  onClose,
}: {
  collection: ReturnType<typeof useSavedCharacters>;
  configuration: PlaygroundConfiguration;
  onClose: () => void;
}) {
  const { title, setTitle, selected, changed, save, status, items } = collection;
  const submit = (copy: boolean) => {
    if (save(copy)) {
      onClose();
    }
  };
  return (
    <Modal title="Guardar personaje" onClose={onClose}>
      <p>
        {selected
          ? `Estás editando «${selected.title}». Actualizalo o guardá una copia.`
          : 'Guardá esta combinación en tu colección para recuperarla después.'}
      </p>
      <label className="modal-field">
        Etiqueta del guardado
        <input
          value={title}
          maxLength={80}
          placeholder={configuration.name || 'Sin nombre'}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <p className="save-hint">
        La etiqueta organiza la colección; no cambia el nombre que define la forma y el
        color.
      </p>
      <p>
        {items.length}/20 personajes ·{' '}
        {selected
          ? changed
            ? 'Cambios sin guardar'
            : 'Guardado al día'
          : 'Nuevo guardado'}
      </p>
      <div className="workbench-actions">
        <button
          type="button"
          disabled={!!selected && !changed}
          onClick={() => submit(!selected)}
        >
          {selected ? 'Actualizar personaje' : 'Guardar en colección'}
        </button>
        {selected && (
          <button type="button" onClick={() => submit(true)}>
            Guardar como copia
          </button>
        )}
      </div>
      <p role="status" className="workbench-status">
        {status}
      </p>
    </Modal>
  );
}
