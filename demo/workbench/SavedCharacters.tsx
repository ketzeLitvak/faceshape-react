import { useRef, useState } from 'react';
import { Character } from '../../src';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import { configurationDetails } from './ConfigurationSummary';
import { collectionJSON, parseCollection } from './collection';
import {
  type PlaygroundConfiguration,
  readSavedCharacters,
  type SavedCharacter,
} from './configuration';

export function SavedCharacters({
  configuration,
  loadConfiguration,
  compare,
}: {
  configuration: PlaygroundConfiguration;
  loadConfiguration: (value: PlaygroundConfiguration) => void;
  compare: (value: PlaygroundConfiguration) => void;
}) {
  const [items, setItems] = useState(readSavedCharacters);
  const [selectedId, setSelectedId] = useState<string>();
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [deleted, setDeleted] = useState<SavedCharacter>();
  const fileInput = useRef<HTMLInputElement>(null);
  const selected = items.find((item) => item.id === selectedId);
  const displayTitle = title.trim() || configuration.name || 'Sin nombre';
  const changed =
    !!selected &&
    (JSON.stringify(selected.configuration) !== JSON.stringify(configuration) ||
      selected.title !== displayTitle);
  const persist = (next: SavedCharacter[], message: string) => {
    try {
      localStorage.setItem('faceshape:characters:v1', JSON.stringify(next));
      setItems(next);
      setStatus(message);
      return true;
    } catch {
      setStatus(
        'No se pudo guardar en este navegador. Exportá la colección para conservarla.',
      );
      return false;
    }
  };
  const save = (copy: boolean) => {
    if (copy && items.length >= 20) {
      setStatus('Llegaste al límite de 20 personajes. Podés actualizar uno existente.');
      return;
    }
    let copyTitle = displayTitle;
    if (copy && selected && displayTitle === selected.title) {
      let number = 1;
      do {
        copyTitle = `${displayTitle.slice(0, 64)} · copia ${number++}`;
      } while (items.some((item) => item.title === copyTitle));
    }
    const item = {
      id: !copy && selected ? selected.id : crypto.randomUUID(),
      title: copyTitle,
      configuration: structuredClone(configuration),
      updatedAt: new Date().toISOString(),
    };
    const next =
      !copy && selected
        ? items.map((value) => (value.id === selected.id ? item : value))
        : [item, ...items];
    if (
      persist(next, !copy && selected ? 'Personaje actualizado.' : 'Personaje guardado.')
    ) {
      setSelectedId(item.id);
      setTitle(item.title);
    }
  };
  const load = (item: SavedCharacter) => {
    setSelectedId(item.id);
    setTitle(item.title ?? item.configuration.name);
    loadConfiguration(structuredClone(item.configuration));
    setStatus('Personaje cargado. Podés actualizarlo o guardar una copia.');
  };
  const remove = (item: SavedCharacter) => {
    if (
      persist(
        items.filter((value) => value.id !== item.id),
        'Personaje eliminado. Podés deshacerlo.',
      )
    ) {
      setDeleted(item);
      if (selectedId === item.id) {
        setSelectedId(undefined);
      }
    }
  };
  const undo = () => {
    if (!deleted) {
      return;
    }
    if (items.length >= 20) {
      setStatus('No hay espacio para restaurarlo. Eliminá otro personaje primero.');
      return;
    }
    if (persist([deleted, ...items], 'Personaje restaurado.')) {
      setDeleted(undefined);
    }
  };
  const exportCollection = () => {
    const url = URL.createObjectURL(
      new Blob([collectionJSON(items)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'faceshape-personajes.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Colección exportada. Podés importarla en otro navegador.');
  };
  const importCollection = async (file: File) => {
    try {
      if (file.size > 250000) {
        throw new Error('El archivo es demasiado grande.');
      }
      const incoming = parseCollection(await file.text());
      const additions = incoming.filter(
        (item) =>
          !items.some(
            (existing) =>
              JSON.stringify(existing.configuration) ===
                JSON.stringify(item.configuration) && existing.title === item.title,
          ),
      );
      if (items.length + additions.length > 20) {
        throw new Error(
          'La importación supera el límite de 20 personajes. No se modificó la colección.',
        );
      }
      if (!additions.length) {
        setStatus('No hay personajes nuevos para importar.');
        return;
      }
      persist(
        [
          ...additions.map((item) => ({
            ...item,
            id: crypto.randomUUID(),
            updatedAt: new Date().toISOString(),
          })),
          ...items,
        ],
        `Se importaron ${additions.length} personajes. Los anteriores se conservaron.`,
      );
    } catch (error) {
      setStatus(
        error instanceof SyntaxError
          ? 'El archivo no contiene JSON válido.'
          : error instanceof Error
            ? error.message
            : 'No se pudo importar la colección.',
      );
    }
  };
  const filtered = items.filter((item) =>
    `${item.title} ${item.configuration.name} ${item.configuration.shape}`
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()),
  );
  return (
    <section className="saved-library" aria-label="Guardar personajes">
      <h2>
        Tu colección <span className="collection-count">{items.length}/20</span>
      </h2>
      <p>
        Guardá una combinación completa. Cargá un personaje para editarlo y actualizarlo,
        o guardá una copia para probar otra variante. Los datos permanecen en este
        navegador.
      </p>
      <div className="save-editor">
        <label>
          Etiqueta del guardado
          <input
            value={title}
            maxLength={80}
            placeholder={configuration.name || 'Sin nombre'}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <p>
          La etiqueta organiza tu colección; no cambia el nombre que define la forma y el
          color.
        </p>
        <div className="workbench-actions">
          <button
            type="button"
            disabled={selected && !changed}
            onClick={() => save(!selected)}
          >
            {selected ? 'Actualizar personaje' : 'Guardar personaje'}
          </button>
          {selected && (
            <button type="button" onClick={() => save(true)}>
              Guardar como copia
            </button>
          )}
        </div>
        <p className="comparison-caption">
          {selected
            ? `Editando «${selected.title}» · ${changed ? 'Cambios sin guardar' : 'Guardado al día'}`
            : 'Nuevo guardado · no reemplaza ningún personaje'}
        </p>
      </div>
      <div className="workbench-actions">
        <label>
          Buscar guardados{' '}
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Etiqueta, nombre o forma"
          />
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
              <button type="button" onClick={() => compare(item.configuration)}>
                Usar de referencia
              </button>
              <button type="button" onClick={() => remove(item)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
