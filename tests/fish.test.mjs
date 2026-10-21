import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { VARIANT_EXAMPLES } from '../.test-dist/helpers.mjs';
import { Character } from '../dist/index.js';
import { fish } from '../dist/shapes/index.js';

test('all nine fish silhouettes are deterministic, support expressions and respect fixed colors', () => {
  for (const { name } of VARIANT_EXAMPLES.fish) {
    const resolve = () => fish.fromName(name);
    const body = () =>
      renderToStaticMarkup(
        React.createElement('svg', null, resolve().render({ color: '#123456' })),
      );
    assert.equal(body(), body());
    assert.match(body(), /fill="#123456"/);
    const box = resolve().faceBox;
    assert.ok(box.x > 0 && box.y > 0 && box.x + box.width < 1 && box.y + box.height < 1);
    for (const expression of [
      'neutral',
      'happy',
      'sad',
      'angry',
      'surprised',
      'sleepy',
    ]) {
      for (const face of [
        { eyes: 'bright', mouth: 'cat', eyebrows: 'expression' },
        { eyes: 'none', mouth: 'none', eyebrows: 'none' },
      ]) {
        const svg = renderToStaticMarkup(
          React.createElement(Character, {
            name,
            shape: fish,
            expression,
            face,
            color: '#123456',
            reducedMotion: true,
          }),
        );
        assert.doesNotMatch(svg, /NaN|undefined/);
        assert.match(svg, /data-faceshape-fish/);
      }
    }
  }
});

test('fish markings use body clips with unique IDs across sizes and instances', () => {
  const markedNames = [
    'Variante 1',
    'Variante 2',
    'Variante 3',
    'Variante 13',
    'Variante 22',
  ];
  const render = (size) =>
    renderToStaticMarkup(
      React.createElement(
        'div',
        null,
        markedNames.flatMap((name) =>
          [0, 1].map((copy) =>
            React.createElement(Character, {
              key: `${name}-${copy}`,
              name,
              shape: fish,
              size,
              face: { eyes: 'none', mouth: 'none', eyebrows: 'none' },
              reducedMotion: true,
            }),
          ),
        ),
      ),
    );
  for (const size of [32, 48, 240]) {
    const svg = render(size);
    const ids = [...svg.matchAll(/<clipPath id="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, 10);
    assert.equal(new Set(ids).size, 10);
    for (const id of ids) {
      assert.ok(svg.includes(`clip-path="url(#${id})"`));
    }
    assert.equal((svg.match(/data-fish-marking=""/g) ?? []).length, 10);
  }
});

test('reference facial slots put hammerhead eyes on its head and keep mouth independent', () => {
  const hammerhead = fish.fromName('Variante 8');
  const { eyes, mouth } = hammerhead.faceLayout;
  assert.ok(eyes.spacing >= 40, 'hammerhead eyes belong near the outer head tips');
  assert.ok(
    eyes.y < mouth.y && mouth.y < 40,
    'mouth belongs below head, not halfway down body',
  );
  const classic = fish.fromName('Variante 7').faceLayout;
  assert.ok(classic.eyes.spacing < eyes.spacing / 2);
  for (const { name } of VARIANT_EXAMPLES.fish) {
    const shape = fish.fromName(name);
    assert.deepEqual(shape.faceLayout, fish.fromName(name).faceLayout);
    const { eyes, mouth } = shape.faceLayout;
    assert.ok(eyes.y < mouth.y);
    assert.ok(eyes.scale > 0 && mouth.scale > 0);
    for (const expression of ['happy', 'sad', 'surprised', 'sleepy']) {
      const html = renderToStaticMarkup(
        React.createElement(Character, {
          name,
          shape: fish,
          expression,
          reducedMotion: true,
          face: { eyes: 'dots', mouth: 'standard', eyebrows: 'none' },
        }),
      );
      assert.match(html, /data-mouth-variant="standard"/);
      assert.doesNotMatch(html, /data-eye-highlight|data-faceshape-eyebrows/);
      assert.match(html, /fill="none"/);
    }
  }
});

test('invalid shape facial placement is rejected before drawing', () => {
  const base = fish.fromName('Variante 8');
  for (const eyes of [
    { spacing: NaN, y: 25, scale: 0.5 },
    { spacing: 42, y: 125, scale: 0.5 },
    { spacing: 42, y: 25, scale: 0 },
  ]) {
    assert.throws(
      () =>
        renderToStaticMarkup(
          React.createElement(Character, {
            shape: { ...base, faceLayout: { eyes } },
            face: { eyes: 'dots', mouth: 'standard', eyebrows: 'none' },
          }),
        ),
      /faceLayout/,
    );
  }
});
