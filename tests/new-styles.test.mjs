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

test('cat keeps a fixed circular head and face box while its ears vary and stay attached', () => {
  const shape = CUSTOM_SHAPES.cat;
  const heads = new Set();
  const ears = new Set();
  const expectedBox = shape.fromName('Ana').faceBox;
  for (let index = 0; index < 100; index++) {
    const name = `Gato ${index}`;
    const definition = shape.fromName(name);
    assert.deepEqual(definition.faceBox, expectedBox);
    const svg = renderToStaticMarkup(definition.render({ color: '#123456' }));
    heads.add(svg.match(/<circle data-cat-head=""[^>]+>/)[0]);
    for (const match of svg.matchAll(
      /data-cat-ear="" transform="translate\(([^ ]+) ([^)]+)\) rotate\(([^)]+)\)"[\s\S]*?<path d="([^"]+)"/g,
    )) {
      const [, x, y, angle, path] = match;
      ears.add(`${angle}:${path}`);
      const numbers = path.match(/-?[0-9]+(?:\.[0-9]+)?/g).map(Number);
      const radians = (Number(angle) * Math.PI) / 180;
      for (const localX of [numbers[0], numbers.at(-2)]) {
        const localY = 3;
        const worldX =
          Number(x) + localX * Math.cos(radians) - localY * Math.sin(radians);
        const worldY =
          Number(y) + localX * Math.sin(radians) + localY * Math.cos(radians);
        assert.ok(
          Math.hypot(worldX - 50, worldY - 58) < 32,
          'ear base must overlap the head',
        );
      }
    }
  }
  assert.equal(heads.size, 1);
  assert.ok(ears.size > 100);
});

test('robot names select zero, one or two antennas and optional modules and vents', () => {
  const counts = new Set();
  const modules = new Set();
  const vents = new Set();
  for (let index = 0; index < 100; index++) {
    const definition = CUSTOM_SHAPES.robot.fromName(`Robot ${index}`);
    const svg = renderToStaticMarkup(definition.render({ color: '#123456' }));
    counts.add((svg.match(/data-robot-antenna/g) || []).length);
    modules.add(svg.includes('data-robot-side-modules'));
    vents.add(svg.includes('data-robot-vent'));
  }
  assert.deepEqual([...counts].sort(), [0, 1, 2]);
  assert.equal(modules.size, 2);
  assert.equal(vents.size, 2);
});

test('planet names independently select rings and zero, one or two moons outside the body', () => {
  const combinations = new Set();
  for (let index = 0; index < 100; index++) {
    const definition = CUSTOM_SHAPES.planet.fromName(`Planeta ${index}`);
    const svg = renderToStaticMarkup(definition.render({ color: '#123456' }));
    const count = (svg.match(/data-planet-moon/g) || []).length;
    combinations.add(`${svg.includes('data-planet-ring')}:${count}`);
    const body = svg.match(/<circle cx="50" cy="50" r="([^"]+)"/);
    for (const moon of svg.matchAll(
      /data-planet-moon=""><circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g,
    )) {
      const [, x, y, radius] = moon.map(Number);
      assert.ok(Math.hypot(x - 50, y - 50) - radius > Number(body[1]));
      assert.ok(
        x - radius > -6 && x + radius < 106 && y - radius > -6 && y + radius < 106,
      );
    }
  }
  assert.equal(combinations.size, 6);
});

test('eyelashes have two curved strokes only on each outer edge throughout blink', () => {
  const config = { eyes: 'eyelashes', mouth: 'none', eyebrows: 'none' };
  for (const blink of [1, 0.5, 0]) {
    const svg = renderPose(config, {
      geometry: EXPRESSIONS.neutral,
      blink,
      talk: 0,
      look: { x: 0, y: 0 },
      color: '#182b35',
      eyeVariant: 'eyelashes',
    });
    const lashes = [...svg.matchAll(/data-eye-lashes="" d="([^"]+)"/g)];
    assert.equal(lashes.length, 2);
    for (const [index, match] of lashes.entries()) {
      assert.equal((match[1].match(/M/g) || []).length, 2);
      assert.equal((match[1].match(/Q/g) || []).length, 2);
      const coordinates = [...match[1].matchAll(/[MQ](-?[0-9.]+)/g)].map((point) =>
        Number(point[1]),
      );
      assert.ok(coordinates.every((x) => (index === 0 ? x < 26 : x > 74)));
    }
  }
});
