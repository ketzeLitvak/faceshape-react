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
    const body = () => renderToStaticMarkup(resolve().render({ color: '#123456' }));
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
