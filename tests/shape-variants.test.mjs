import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DEMO_SHAPES, ShapeVariants, VARIANT_EXAMPLES } from '../.test-dist/helpers.mjs';
import { Character } from '../dist/index.js';

const expected = { planet: 6, robot: 20, device: 4, ghost: 5, flower: 5 };
test('variant names cover structural categories using production renderers', () => {
  for (const [shape, count] of Object.entries(expected)) {
    const signatures = new Set();
    for (const { name, label } of VARIANT_EXAMPLES[shape]) {
      const html = renderToStaticMarkup(
        React.createElement(Character, {
          shape: DEMO_SHAPES[shape],
          name,
          face: { eyes: 'none', mouth: 'none', eyebrows: 'none' },
          reducedMotion: true,
        }),
      );
      const dom = new JSDOM(html);
      const doc = dom.window.document;
      let signature;
      if (shape === 'planet') {
        const ring = !!doc.querySelector('[data-planet-ring]');
        const moons = doc.querySelectorAll('[data-planet-moon]').length;
        signature = `${ring}:${moons}`;
        assert.equal(
          label,
          `${ring ? 'Con' : 'Sin'} anillo · ${moons} ${moons === 1 ? 'luna' : 'lunas'}`,
        );
      } else if (shape === 'robot') {
        const antennas = doc.querySelectorAll('[data-robot-antenna]');
        const square = antennas.length ? !!antennas[0].querySelector('rect') : false;
        signature = `${antennas.length}:${square}:${!!doc.querySelector('[data-robot-side-modules]')}:${!!doc.querySelector('[data-faceshape-robot] > circle[fill="white"]')}`;
        assert.equal(label.includes('cuadradas'), square);
      } else if (shape === 'flower') {
        signature = doc.querySelectorAll('[data-faceshape-flower] > ellipse').length;
      } else {
        signature = doc
          .querySelector(`[data-${shape}-kind]`)
          .getAttribute(`data-${shape}-kind`);
      }
      signatures.add(signature);
      dom.window.close();
    }
    assert.equal(signatures.size, count, shape);
    assert.equal(VARIANT_EXAMPLES[shape].length, count, shape);
  }
});
test('variant inspection shows all planet categories and labels other shapes as samples', () => {
  const props = { face: { eyes: 'bright', mouth: 'cat', eyebrows: 'none' }, dark: false };
  const planet = renderToStaticMarkup(
    React.createElement(ShapeVariants, { ...props, shape: 'planet' }),
  );
  assert.equal((planet.match(/class="inspection-pose"/g) || []).length, 6);
  assert.match(planet, /no enumera todos/);
  const cloud = renderToStaticMarkup(
    React.createElement(ShapeVariants, { ...props, shape: 'cloud' }),
  );
  assert.equal((cloud.match(/class="inspection-pose"/g) || []).length, 8);
  assert.match(cloud, /muestra de nombres/);
});
