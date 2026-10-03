import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  collectionJSON,
  parseCollection,
  readSavedCharacters,
} from '../.test-dist/helpers.mjs';

const configuration = {
  color: undefined,
  shape: 'cloud',
  name: 'Ana',
  expression: 'happy',
  face: { eyes: 'bright', mouth: 'cat', eyebrows: 'none' },
  motion: { blink: true },
  reduced: false,
};
test('collection backups preserve labels and complete character settings', () => {
  const parsed = parseCollection(
    collectionJSON([
      {
        id: 'old',
        title: 'Nube feliz',
        configuration,
        updatedAt: '2026-10-03T10:00:00Z',
      },
    ]),
  );
  assert.equal(parsed[0].title, 'Nube feliz');
  assert.deepEqual(parsed[0].configuration, configuration);
  assert.equal(parsed[0].id, '');
  assert.equal(parseCollection(collectionJSON([])).length, 0);
});
test('invalid backup is rejected as a whole and unsupported versions are rejected', () => {
  for (const data of [
    { format: 'other', version: 1, characters: [] },
    { format: 'faceshape-characters', version: 2, characters: [] },
    {
      format: 'faceshape-characters',
      version: 1,
      characters: [{ configuration }, { configuration: {} }],
    },
  ]) {
    assert.throws(() => parseCollection(JSON.stringify(data)));
  }
  assert.throws(() => parseCollection('x'.repeat(250001)), /grande/);
});
test('existing saved characters migrate without changing their identity or configuration', () => {
  const original = globalThis.localStorage;
  try {
    globalThis.localStorage = {
      getItem: () =>
        JSON.stringify([
          { id: 'old', configuration },
          {
            id: 'new',
            title: 'Variante',
            configuration,
            updatedAt: '2026-10-03T10:00:00Z',
          },
          { id: 'old', configuration },
          { id: 'invalid', configuration: {} },
        ]),
    };
    const items = readSavedCharacters();
    assert.equal(items.length, 2);
    assert.equal(items[0].id, 'old');
    assert.equal(items[0].title, 'Ana');
    assert.deepEqual(items[0].configuration, configuration);
    assert.equal(items[1].title, 'Variante');
    assert.equal(items[1].updatedAt, '2026-10-03T10:00:00Z');
    globalThis.localStorage = { getItem: () => '{bad' };
    assert.deepEqual(readSavedCharacters(), []);
  } finally {
    globalThis.localStorage = original;
  }
});
