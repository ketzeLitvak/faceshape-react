import { useState } from 'react';
import { collectionJSON, parseCollection } from './collection';
import {
  type PlaygroundConfiguration,
  readSavedCharacters,
  type SavedCharacter,
} from './configuration';

export function useSavedCharacters(
  configuration: PlaygroundConfiguration,
  loadConfiguration: (value: PlaygroundConfiguration) => void,
) {
  const [items, setItems] = useState(readSavedCharacters);
  const [selectedId, setSelectedId] = useState<string>();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [deleted, setDeleted] = useState<SavedCharacter>();
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
      return true;
    }
    return false;
  };
  const load = (item: SavedCharacter) => {
    setSelectedId(item.id);
    setTitle(item.title ?? item.configuration.name);
    loadConfiguration(structuredClone(item.configuration));
    window.location.hash = 'demo';
    setStatus('Personaje cargado. Podés actualizarlo o guardar una copia.');
  };
  const rename = (item: SavedCharacter, value: string) => {
    const nextTitle = value.trim().slice(0, 80);
    if (!nextTitle) {
      setStatus('Ingresá una etiqueta para el personaje.');
      return false;
    }
    const renamed = { ...item, title: nextTitle, updatedAt: new Date().toISOString() };
    if (
      !persist(
        items.map((entry) => (entry.id === item.id ? renamed : entry)),
        'Personaje renombrado.',
      )
    ) {
      return false;
    }
    if (selectedId === item.id) {
      setTitle(nextTitle);
    }
    return true;
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
  return {
    items,
    selected,
    selectedId,
    title,
    setTitle,
    status,
    deleted,
    changed,
    save,
    load,
    remove,
    rename,
    undo,
    exportCollection,
    importCollection,
  };
}
