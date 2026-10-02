import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CUSTOM_SHAPES, renderPose } from '../.test-dist/helpers.mjs';
import { Character, EXPRESSIONS, getMotionCapabilities } from '../dist/index.js';

const newShapes = ['cloud', 'ghost', 'cat', 'robot', 'planet', 'flower', 'drop', 'toast'];
const newEyes = ['eyelashes', 'heart', 'star', 'softLids', 'cyclops', 'spiral'];
const face = { eyes: 'bright', mouth: 'cat', eyebrows: 'expression' };
const normalizeIds = (svg) => svg.replace(/_R[^_]+_/g, 'stable');

test('each new silhouette has deterministic geometry variation and respects fixed color', () => {
  for (const name of newShapes) {
    const shape = CUSTOM_SHAPES[name];
    const body = (identity) =>
      renderToStaticMarkup(
        React.createElement(Character, {
          shape,
          name: identity,
          color: '#123456',
          face: { eyes: 'none', mouth: 'none', eyebrows: 'none' },
        }),
      );
    assert.equal(body('Ana'), body('Ana'), name);
    assert.notEqual(body('Ana'), body('Bruno'), name);
    for (let index = 0; index < 50; index++) {
      const identity = `Personaje ${index}`;
      const box = shape.fromName(identity).faceBox;
      assert.ok(
        box.x > 0 && box.y > 0 && box.x + box.width < 1 && box.y + box.height < 1,
        name,
      );
      assert.doesNotMatch(body(identity), /NaN|Infinity|undefined/);
      assert.match(body(identity), /#123456/);
    }
  }
});

test('all new shapes and eyes support every expression and independent face parts', () => {
  for (const shape of newShapes) {
    for (const eyes of newEyes) {
      for (const expression of Object.keys(EXPRESSIONS)) {
        const svg = renderToStaticMarkup(
          React.createElement(Character, {
            shape: CUSTOM_SHAPES[shape],
            name: 'Ana',
            face: { ...face, eyes },
            expression,
          }),
        );
        assert.match(svg, new RegExp(`data-eye-variant="${eyes}"`));
        assert.doesNotMatch(svg, /NaN|Infinity|undefined/);
      }
    }
  }
});

test('cyclops renders one eye and one centered brow, other new styles render two', () => {
  for (const eyes of newEyes) {
    const svg = renderToStaticMarkup(
      React.createElement(Character, {
        face: { eyes, mouth: 'none', eyebrows: 'soft' },
      }),
    );
    const brows = svg.slice(
      svg.indexOf('data-faceshape-eyebrows'),
      svg.indexOf('data-faceshape-eyes'),
    );
    assert.equal((brows.match(/<path/g) || []).length, eyes === 'cyclops' ? 1 : 2);
    if (eyes !== 'spiral') {
      assert.equal(
        (svg.match(/data-eye-frame/g) || []).length,
        eyes === 'cyclops' ? 1 : 2,
      );
    }
    if (eyes === 'cyclops') {
      assert.match(brows, /rotate\(0 50 /);
    }
  }
});

test('new eyes blink and support gaze without dragging faces for pupil-only movement', () => {
  for (const eyes of newEyes) {
    const config = { ...face, eyes };
    const state = {
      geometry: EXPRESSIONS.neutral,
      blink: 1,
      talk: 0,
      look: { x: 0, y: 0 },
      color: '#182b35',
      eyeVariant: eyes,
    };
    const open = normalizeIds(renderPose(config, state));
    const closed = normalizeIds(renderPose(config, { ...state, blink: 0 }));
    const wink = normalizeIds(renderPose(config, state, true));
    assert.notEqual(open, closed, eyes);
    assert.notEqual(open, wink, eyes);
    const looking = renderPose(config, { ...state, look: { x: 1, y: -1 } });
    assert.notEqual(normalizeIds(looking), open);
    assert.deepEqual(getMotionCapabilities(eyes, 'cat', EXPRESSIONS.neutral), {
      blink: true,
      lookAt: true,
      talking: true,
    });
    if (eyes !== 'spiral') {
      const mouth = looking.slice(looking.indexOf('data-faceshape-mouth'));
      assert.match(looking, /transform="translate\(0 0\)" data-faceshape-mouth/);
      assert.ok(mouth.length > 0);
    }
  }
});

test('new eye styles compose with every mouth, brow style and hidden parts', () => {
  const mouths = [
    'none',
    'beak',
    'standard',
    'wide',
    'small',
    'gentle',
    'tongue',
    'joyful',
    'toothy',
    'shark',
    'smirk',
    'cat',
  ];
  const brows = ['expression', 'none', 'soft', 'raised', 'angry', 'sad'];
  for (const eyes of newEyes) {
    for (const mouth of mouths) {
      for (const eyebrows of brows) {
        for (const expression of Object.keys(EXPRESSIONS)) {
          const svg = renderToStaticMarkup(
            React.createElement(Character, {
              face: { eyes, mouth, eyebrows },
              expression,
              name: 'Ana',
            }),
          );
          assert.doesNotMatch(svg, /NaN|Infinity|undefined/);
          assert.equal(svg.includes('data-faceshape-mouth=""'), mouth !== 'none');
          assert.equal(svg.includes('data-faceshape-eyebrows=""'), eyebrows !== 'none');
        }
      }
    }
  }
});

test('new eye clips remain unique across multiple characters', () => {
  const svg = renderToStaticMarkup(
    React.createElement(
      'div',
      null,
      newEyes.map((eyes) =>
        React.createElement(Character, { key: eyes, face: { ...face, eyes } }),
      ),
    ),
  );
  const ids = [...svg.matchAll(/<clipPath id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
});
