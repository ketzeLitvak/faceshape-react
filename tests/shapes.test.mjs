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
