import { parseConfiguration, type SavedCharacter } from './configuration';

export function collectionJSON(items: SavedCharacter[]): string {
  return JSON.stringify(
    { format: 'faceshape-characters', version: 1, characters: items },
    null,
    2,
  );
}

/** Validate the whole backup before writing anything. Existing characters are preserved. */
export function parseCollection(raw: string): SavedCharacter[] {
  if (raw.length > 250000) {
    throw new Error('El archivo es demasiado grande.');
  }
  const data = JSON.parse(raw);
  if (
    data?.format !== 'faceshape-characters' ||
    data.version !== 1 ||
    !Array.isArray(data.characters) ||
    data.characters.length > 20
  ) {
    throw new Error('Este archivo no es una colección de FaceShape compatible.');
  }
  return data.characters.map((item: SavedCharacter) => {
    const configuration = parseConfiguration(item?.configuration);
    if (!configuration || (item.title !== undefined && typeof item.title !== 'string')) {
      throw new Error(
        'La colección contiene un personaje inválido. No se importó ninguno.',
      );
    }
    return {
      id: '',
      title: (item.title ?? configuration.name).slice(0, 80) || 'Sin nombre',
      configuration,
    };
  });
}
