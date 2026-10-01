import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import { computer, penguin, shark } from '../.test-dist/helpers.mjs';
import { Character } from '../dist/index.js';

const face = { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' };

test('custom silhouettes vary reproducibly with identity and preserve fixed colors', async () => {
  for (const shape of [penguin, computer, shark]) {
    const render = (name) =>
      renderToStaticMarkup(
        React.createElement(Character, {
          shape,
          name,
          face,
          color: '#388697',
          expression: 'happy',
          size: 240,
        }),
      );
    const clean = (svg) => svg.replace(/_R[^_]+_/g, 'stable');
    assert.equal(clean(render('Ana')), clean(render('Ana')));
    assert.notEqual(clean(render('Ana')), clean(render('Bruno')));
    const colors = await sharp(Buffer.from(render('Ana')))
      .ensureAlpha()
      .raw()
      .toBuffer();
    assert.ok(colors.some((value) => value !== 0));
    for (const name of [
      'Ana',
      'Bruno',
      'Tiburoncito',
      'Pingu',
      ...Array.from({ length: 50 }, (_, i) => `Personaje ${i}`),
    ]) {
      const definition = shape.fromName(name);
      const box = definition.faceBox;
      assert.ok(
        box.x > 0 && box.y > 0 && box.x + box.width < 1 && box.y + box.height < 1,
      );
      assert.doesNotMatch(render(name), /NaN|undefined/);
      assert.match(render(name), /fill="#388697"/);
    }
  }
});

test('basic shapes and heart change size reproducibly, square and triangle also rotate', async () => {
  const { heart, resolveCharacterAppearance } = await import('../.test-dist/helpers.mjs');
  for (const shape of ['circle', 'square', 'star', 'triangle', heart]) {
    const options = { shape, identity: 'Ana', color: '#123456' };
    const first = resolveCharacterAppearance(options);
    assert.deepEqual(first, resolveCharacterAppearance(options));
    const other = resolveCharacterAppearance({ ...options, identity: 'Bruno' });
    assert.notEqual(first.definition.transform, other.definition.transform);
    assert.notDeepEqual(first.definition.faceBox, other.definition.faceBox);
    const angle = Number(first.definition.transform.match(/rotate\(([^)]+)\)/)[1]);
    if (shape === 'square' || shape === 'triangle') {
      assert.notEqual(angle, 0);
      assert.ok(Math.abs(angle) <= 15);
    } else {
      assert.equal(angle, 0);
    }
    assert.equal(first.color, '#123456');
  }
});

test('penguin keeps its beak and never renders a separate mouth in any expression', async () => {
  const { EXPRESSIONS, getMotionCapabilities } = await import('../dist/index.js');
  let beak;
  for (const expression of Object.keys(EXPRESSIONS)) {
    for (const mouth of ['standard', 'tongue', 'shark', 'cat']) {
      const svg = renderToStaticMarkup(
        React.createElement(Character, {
          shape: penguin,
          name: 'Pingu',
          face: { ...face, mouth },
          expression,
          motion: { talking: true },
        }),
      );
      assert.doesNotMatch(svg, /data-faceshape-mouth|data-faceshape-shark-teeth/);
      const path = svg.match(/data-faceshape-beak="" d="([^"]+)"/)[1];
      beak ??= path;
      assert.equal(path, beak);
      assert.equal(
        getMotionCapabilities('bright', mouth, EXPRESSIONS[expression], true).talking,
        false,
      );
    }
  }
});
