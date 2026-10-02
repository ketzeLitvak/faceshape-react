import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import { device, penguin, shark } from '../.test-dist/helpers.mjs';
import { Character, SHAPES } from '../dist/index.js';

const face = { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' };

test('custom silhouettes vary reproducibly with identity and preserve fixed colors', async () => {
  for (const shape of [penguin, device, shark]) {
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
      assert.ok(Math.abs(angle) <= 180);
    } else {
      assert.equal(angle, 0);
    }
    assert.equal(first.color, '#123456');
  }
});

test('penguin mouths are interchangeable and beaks follow whole-eye gaze', () => {
  const render = (mouth) =>
    renderToStaticMarkup(
      React.createElement(Character, {
        shape: penguin,
        name: 'Pingu',
        face: { ...face, mouth },
        motion: { lookAt: { x: 1, y: 0 } },
        expression: 'happy',
      }),
    );
  assert.match(render('tongue'), /data-mouth-variant="tongue"/);
  assert.doesNotMatch(render('tongue'), /data-faceshape-beak/);
  const beak = render('beak');
  assert.match(beak, /data-mouth-variant="beak"/);
  assert.match(beak, /fill="#efa64f"/);
  assert.match(
    beak,
    /transform="translate\(1.2000000000000002 -1.2000000000000002\)" data-faceshape-mouth/,
  );
});

test('square and triangle names cover a full turn reproducibly', async () => {
  const { resolveCharacterAppearance } = await import('../.test-dist/helpers.mjs');
  for (const shape of ['square', 'triangle']) {
    const quadrants = new Set();
    for (let i = 0; i < 100; i++) {
      const options = { shape, identity: `Rotation ${i}` };
      const definition = resolveCharacterAppearance(options).definition;
      assert.deepEqual(definition, resolveCharacterAppearance(options).definition);
      const angle = Number(definition.transform.match(/rotate\(([^)]+)\)/)[1]);
      assert.ok(angle >= -180 && angle <= 180);
      quadrants.add(Math.floor((angle + 180) / 90));
    }
    assert.equal(quadrants.size, 4);
  }
});

test('triangle is equilateral with its centroid at the rotation origin', () => {
  const numbers = SHAPES.triangle.path.match(/-?[0-9]+(?:\.[0-9]+)?/g).map(Number);
  const vertices = [
    [numbers[0], numbers[1]],
    [numbers[2], numbers[3]],
    [numbers[4], numbers[5]],
  ];
  const sides = vertices.map((point, index) => {
    const next = vertices[(index + 1) % 3];
    return Math.hypot(point[0] - next[0], point[1] - next[1]);
  });
  assert.ok(Math.max(...sides) - Math.min(...sides) < 1e-10);
  for (const axis of [0, 1]) {
    assert.ok(
      Math.abs(vertices.reduce((sum, point) => sum + point[axis], 0) / 3 - 50) < 1e-10,
    );
  }
});

test('rotating shapes keep face centers fixed and fit the viewBox at every orientation', async () => {
  const { resolveCharacterAppearance } = await import('../.test-dist/helpers.mjs');
  for (const shape of ['square', 'triangle']) {
    for (let index = 0; index < 100; index++) {
      const definition = resolveCharacterAppearance({
        shape,
        identity: `Centered ${index}`,
      }).definition;
      const box = definition.faceBox;
      assert.ok(Math.abs(box.x + box.width / 2 - 0.5) < 1e-10);
      assert.ok(Math.abs(box.y + box.height / 2 - 0.5) < 1e-10);
      const angle =
        (Number(definition.transform.match(/rotate\(([^)]+)\)/)[1]) * Math.PI) / 180;
      const scale = Number(definition.transform.match(/scale\(([^)]+)\)/)[1]);
      assert.ok(
        scale * (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle))) <= 0.97 + 1e-10,
      );
    }
  }
});
