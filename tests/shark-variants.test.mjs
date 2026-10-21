import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Character } from '../dist/index.js';
import { shark } from '../dist/shapes/index.js';

test('shark identities cover four silhouettes with species-appropriate fins and stable geometry', () => {
  const kinds = new Set();
  for (let i = 0; i < 100; i++) {
    const name = `Shark ${i}`;
    const definition = shark.fromName(name);
    const render = () => renderToStaticMarkup(definition.render({ color: '#123456' }));
    assert.equal(
      render(),
      renderToStaticMarkup(shark.fromName(name).render({ color: '#123456' })),
    );
    const svg = render();
    kinds.add(svg.match(/data-shark-kind="([^"]+)/)[1]);
    const kind = svg.match(/data-shark-kind="([^"]+)/)[1];
    assert.equal((svg.match(/<path/g) ?? []).length, kind === 'classic' ? 5 : 4);
    assert.ok((svg.match(/fill="#123456"/g) ?? []).length >= 3);
    const box = definition.faceBox;
    assert.equal(box.x + box.width / 2, 0.5);
    assert.ok(box.y > 0.2 && box.y + box.height < 0.75);
    assert.doesNotMatch(svg, /NaN|undefined/);
  }
  assert.deepEqual([...kinds].sort(), ['baby', 'classic', 'hammerhead', 'rounded']);
});

test('each shark silhouette supports every expression and missing facial features', () => {
  for (const name of ['Variante 1', 'Variante 2', 'Variante 3', 'Variante 5']) {
    for (const expression of [
      'neutral',
      'happy',
      'sad',
      'angry',
      'surprised',
      'sleepy',
    ]) {
      const svg = renderToStaticMarkup(
        React.createElement(Character, {
          shape: shark,
          name,
          expression,
          reducedMotion: true,
          color: '#123456',
          face: { eyes: 'none', mouth: 'none', eyebrows: 'none' },
        }),
      );
      assert.match(svg, /fill="#123456"/);
      assert.doesNotMatch(svg, /NaN|undefined|data-eye|data-mouth/);
    }
  }
});
