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
