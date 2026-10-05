import { useRef, useState } from 'react';
import { Character } from '../../src';
import { Modal } from '../modals/Modal';
import { SHAPE_LABELS } from '../options';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import { configurationDetails } from './ConfigurationSummary';
import type { SavedCharacter } from './configuration';
import type { useSavedCharacters } from './useSavedCharacters';

export function SavedCharacters({
  collection,
}: {
  collection: ReturnType<typeof useSavedCharacters>;
}) {
  const {
    items,
    selectedId,
    status,
    deleted,
    load,
    remove,
    rename,
    undo,
    exportCollection,
    importCollection,
  } = collection;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [renaming, setRenaming] = useState<SavedCharacter>();
  const [newTitle, setNewTitle] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const normalizedSearch = search
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
  const filtered = items
    .filter((item) =>
      `${item.title} ${item.configuration.name} ${item.configuration.shape} ${SHAPE_LABELS[item.configuration.shape]}`
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(normalizedSearch),
    )
    .sort((a, b) =>
      sort === 'name'
        ? (a.title ?? a.configuration.name).localeCompare(
            b.title ?? b.configuration.name,
            'es',
          )
        : (Date.parse(b.updatedAt ?? '') || 0) - (Date.parse(a.updatedAt ?? '') || 0),
    );
  return (
    <section className="saved-library" aria-label="Colección de personajes">
      <h1>
        Tu colección <span className="collection-count">{items.length}/20</span>
      </h1>
      <p>
        Guardá una combinación completa. Cargá un personaje para editarlo y actualizarlo,
        o guardá una copia para probar otra variante. Los datos permanecen en este
        navegador.
      </p>
      <div className="collection-toolbar">
        <label className="collection-search">
          Buscar guardados{' '}
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Etiqueta, nombre o forma"
          />
        </label>
        <div className="collection-tools">
          <label className="collection-order">
            Ordenar
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recent">Última modificación</option>
              <option value="name">Nombre</option>
            </select>
          </label>
          <button type="button" disabled={!items.length} onClick={exportCollection}>
            Exportar colección
          </button>
          <button type="button" onClick={() => fileInput.current?.click()}>
            Importar colección
          </button>
          <input
            type="file"
            accept="application/json,.json"
            ref={fileInput}
            hidden
            aria-label="Archivo de colección"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void importCollection(file);
              }
              event.target.value = '';
            }}
          />
          {deleted && (
            <button type="button" onClick={undo}>
              Deshacer eliminación
            </button>
          )}
        </div>
      </div>
      <p role="status" className="workbench-status">
        {status}
      </p>
      {!items.length && (
        <div className="workbench-guide">
          Tu colección está vacía. Elegí una combinación en el playground y guardá tu
          primer personaje.
        </div>
      )}
      {!!items.length && !filtered.length && (
        <p>No hay guardados que coincidan con la búsqueda.</p>
      )}
      <div className="saved-characters">
        {filtered.map((item) => (
          <article
            key={item.id}
            className={selectedId === item.id ? 'saved-selected' : undefined}
          >
            <Character
              shape={resolveDemoShape(item.configuration.shape)}
              face={item.configuration.face}
              name={item.configuration.name}
              color={item.configuration.color}
              expression={item.configuration.expression}
              size={110}
              reducedMotion
            />
            <h3>{item.title ?? item.configuration.name}</h3>
            <p>
              {configurationDetails(item.configuration).Forma} ·{' '}
              {item.configuration.expression}
            </p>
            {item.updatedAt && (
              <time dateTime={item.updatedAt}>
                Actualizado{' '}
                {new Date(item.updatedAt).toLocaleString('es-AR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </time>
            )}
            <div className="workbench-actions">
              <button type="button" onClick={() => load(item)}>
                Cargar para editar
              </button>
              <button
                type="button"
                onClick={() => {
                  setRenaming(item);
                  setNewTitle(item.title ?? item.configuration.name);
                }}
              >
                Renombrar
              </button>
              <button type="button" onClick={() => remove(item)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
      {renaming && (
        <Modal title="Renombrar guardado" onClose={() => setRenaming(undefined)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (rename(renaming, newTitle)) {
                setRenaming(undefined);
              }
            }}
          >
            <label className="modal-field">
              Etiqueta
              <input
                value={newTitle}
                required
                maxLength={80}
                onChange={(event) => setNewTitle(event.target.value)}
              />
            </label>
            <p className="save-hint">
              El nombre que define el personaje conserva su valor.
            </p>
            <div className="workbench-actions">
              <button type="submit" disabled={!newTitle.trim()}>
                Guardar etiqueta
              </button>
            </div>
            <p role="status">{status}</p>
          </form>
        </Modal>
      )}
    </section>
  );
}
