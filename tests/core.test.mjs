import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  defineShape,
  EXPRESSIONS,
  faceTransform,
  interpolateFace,
  mouthPath,
  parseViewBox,
  resolveExpression,
  SHAPES,
  seededTraits,
} from '../dist/core/index.js';

test('seed is deterministic and differentiates identities', () => {
  assert.deepEqual(seededTraits('same'), seededTraits('same'));
  assert.notDeepEqual(seededTraits('same'), seededTraits('other'));
  assert.deepEqual(seededTraits(0), seededTraits('0'));
});
test('every expression stays finite through interpolation', () => {
  for (const from of Object.values(EXPRESSIONS)) {
    for (const to of Object.values(EXPRESSIONS)) {
      for (const t of [0, 0.2, 0.5, 0.8, 1]) {
        const face = interpolateFace(from, to, t);
        assert.ok(Object.values(face).every(Number.isFinite));
        assert.equal(mouthPath(face).replace(/[-.\d\s]+/g, ''), 'MQQZ');
      }
    }
  }
  assert.deepEqual(
    interpolateFace(EXPRESSIONS.sad, EXPRESSIONS.happy, 0),
    EXPRESSIONS.sad,
  );
  assert.deepEqual(
    interpolateFace(EXPRESSIONS.sad, EXPRESSIONS.happy, 1),
    EXPRESSIONS.happy,
  );
});
test('custom geometry is validated and clamped', () => {
  assert.equal(resolveExpression({ eyeOpen: 99 }).eyeOpen, 1.5);
  assert.throws(() => resolveExpression({ mouthOpen: NaN }), /Invalid/);
  assert.throws(() => resolveExpression('missing'), /Unknown expression/);
});
test('faceBox respects arbitrary viewBox origins and dimensions', () => {
  assert.equal(
    faceTransform({ x: 0.25, y: 0.2, width: 0.5, height: 0.4 }, '10 20 200 100'),
    'translate(60 40) scale(1 0.4)',
  );
  for (const shape of Object.values(SHAPES)) {
    assert.doesNotThrow(() => defineShape(shape));
  }
  assert.throws(
    () =>
      defineShape({ path: 'M0 0', faceBox: { x: 0.8, y: 0, width: 0.4, height: 0.5 } }),
    /faceBox/,
  );
  assert.throws(() => parseViewBox('0 0 0 10'), /viewBox/);
  assert.throws(() => parseViewBox('0 0 10'), /viewBox/);
});

test('names produce reproducible colors and distinct bounded blob contours', async () => {
  const { colorFromName, blobFromName } = await import('../dist/core/index.js');
  const paths = new Set();
  const colors = new Set();
  for (const name of [
    '',
    'Ana',
    'Ezequiel',
    'Tiburoncito',
    '猫',
    '🌙',
    ...Array.from({ length: 100 }, (_, i) => `friend-${i}`),
  ]) {
    const blob = blobFromName(name);
    assert.deepEqual(blob, blobFromName(name));
    assert.equal(colorFromName(name), colorFromName(name));
    assert.match(colorFromName(name), /^#[a-f0-9]{6}$/);
    assert.doesNotThrow(() => defineShape(blob));
    const coordinates = blob.path.match(/[-\d.]+/g).map(Number);
    assert.ok(
      coordinates.every((value) => Number.isFinite(value) && value >= 0 && value <= 100),
    );
    paths.add(blob.path);
    colors.add(colorFromName(name));
  }
  assert.equal(paths.size, 106);
  assert.ok(colors.size > 100);
});
