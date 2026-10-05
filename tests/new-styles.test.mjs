import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DEMO_SHAPES, renderPose } from '../.test-dist/helpers.mjs';
import { Character, EXPRESSIONS, getMotionCapabilities } from '../dist/index.js';

const newShapes = [
  'device',
  'cloud',
  'ghost',
  'cat',
  'robot',
  'planet',
  'flower',
  'drop',
  'toast',
];
const newEyes = ['eyelashes', 'heart', 'star', 'softLids', 'cyclops', 'spiral'];
const face = { eyes: 'bright', mouth: 'cat', eyebrows: 'expression' };
const normalizeIds = (svg) => svg.replace(/_R[^_]+_/g, 'stable');

test('each new silhouette has deterministic geometry variation and respects fixed color', () => {
  for (const name of newShapes) {
    const shape = DEMO_SHAPES[name];
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
    if (name === 'cat') {
      assert.equal(body('Ana'), body('Bruno'));
    } else {
      assert.notEqual(body('Ana'), body('Bruno'), name);
    }
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
            shape: DEMO_SHAPES[shape],
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

test('cat has fixed circular geometry and symmetric attached ears; only its color changes', () => {
  const render = (name, color) =>
    renderToStaticMarkup(
      React.createElement(Character, {
        shape: DEMO_SHAPES.cat,
        name,
        color,
        face: { eyes: 'none', mouth: 'none', eyebrows: 'none' },
      }),
    );
  assert.equal(render('Ana', '#123456'), render('Bruno', '#123456'));
  assert.notEqual(render('Ana'), render('Bruno'));
  const svg = render('Ana', '#123456');
  assert.match(svg, /data-cat-head="" cx="50" cy="58" r="32"/);
  assert.equal((svg.match(/data-cat-ear/g) || []).length, 2);
  for (const [x, y] of [
    [22, 43],
    [42, 36],
    [78, 43],
    [58, 36],
  ]) {
    assert.ok(Math.hypot(x - 50, y - 58) < 32);
  }
});

test('robot names select zero, one or two antennas and optional modules', () => {
  const counts = new Set();
  const modules = new Set();
  for (let index = 0; index < 100; index++) {
    const definition = DEMO_SHAPES.robot.fromName(`Robot ${index}`);
    const svg = renderToStaticMarkup(definition.render({ color: '#123456' }));
    counts.add((svg.match(/data-robot-antenna/g) || []).length);
    modules.add(svg.includes('data-robot-side-modules'));
    assert.doesNotMatch(svg, /data-robot-vent/);
  }
  assert.deepEqual([...counts].sort(), [0, 1, 2]);
  assert.equal(modules.size, 2);
});

test('planet names independently select rings and zero, one or two moons outside the body', () => {
  const combinations = new Set();
  for (let index = 0; index < 100; index++) {
    const definition = DEMO_SHAPES.planet.fromName(`Planeta ${index}`);
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

test('flower petals overlap their neighbors including five-petal flowers', () => {
  let fivePetals = 0;
  for (let index = 0; index < 100; index++) {
    const svg = renderToStaticMarkup(
      DEMO_SHAPES.flower.fromName(`Flor ${index}`).render({ color: '#123456' }),
    );
    const petals = [
      ...svg.matchAll(/<ellipse[^>]*cy="([^"]+)" rx="([^"]+)" ry="([^"]+)"/g),
    ];
    if (petals.length === 5) {
      fivePetals++;
    }
    const orbit = 50 - Number(petals[0][1]);
    const halfWidth = Number(petals[0][2]);
    assert.ok(halfWidth > orbit * Math.sin(Math.PI / petals.length));
  }
  assert.ok(fivePetals > 0);
});

test('planet surfaces have no decorative line paths', () => {
  for (let index = 0; index < 50; index++) {
    const svg = renderToStaticMarkup(
      DEMO_SHAPES.planet.fromName(`Planeta ${index}`).render({ color: '#123456' }),
    );
    assert.doesNotMatch(svg, /<path/);
  }
});

test('device identities cover all four form factors and ghost identities change contour topology', () => {
  for (const [shape, expected] of [
    ['device', ['desktop', 'notebook', 'phone', 'tablet']],
    ['ghost', ['classic', 'drips', 'sheet', 'tail', 'wide']],
  ]) {
    const variants = new Map();
    for (let index = 0; index < 100; index++) {
      const name = `Modelo ${index}`;
      const definition = DEMO_SHAPES[shape].fromName(name);
      const svg = renderToStaticMarkup(definition.render({ color: '#123456' }));
      assert.equal(
        svg,
        renderToStaticMarkup(
          DEMO_SHAPES[shape].fromName(name).render({ color: '#123456' }),
        ),
      );
      const kind = svg.match(new RegExp(`data-${shape}-kind="([^" ]+)"`))[1];
      variants.set(kind, name);
    }
    assert.deepEqual([...variants.keys()].sort(), expected);
    for (const name of variants.values()) {
      for (const expression of Object.keys(EXPRESSIONS)) {
        const svg = renderToStaticMarkup(
          React.createElement(Character, {
            shape: DEMO_SHAPES[shape],
            name,
            expression,
            face,
            color: '#123456',
          }),
        );
        assert.doesNotMatch(svg, /NaN|Infinity|undefined/);
        assert.match(svg, /#123456/);
      }
    }
    if (shape === 'ghost') {
      const commands = [...variants.values()].map((name) => {
        const svg = renderToStaticMarkup(
          DEMO_SHAPES.ghost.fromName(name).render({ color: '#123456' }),
        );
        return svg.match(/ d="([^"]+)"/)[1].replace(/[^A-Za-z]/g, '');
      });
      assert.equal(new Set(commands).size, 5, 'profiles vary their outline beyond scale');
    }
  }
});

test('notebook keys and touchpad widen toward the front of the same perspective plane', () => {
  let checked = 0;
  for (let index = 0; index < 100; index++) {
    const svg = renderToStaticMarkup(
      DEMO_SHAPES.device.fromName(`Modelo ${index}`).render({ color: '#123456' }),
    );
    if (!svg.includes('data-device-kind="notebook"')) {
      continue;
    }
    const keyboard = svg.slice(svg.indexOf('data-device-keyboard'));
    const panels = [...keyboard.matchAll(/ d="([^"]+)"/g)].map((match) =>
      [...match[1].matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((point) => [
        Number(point[1]),
        Number(point[2]),
      ]),
    );
    const deck = [
      ...svg
        .match(/data-device-deck="" d="([^"]+)"/)[1]
        .matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g),
    ].map((point) => [Number(point[1]), Number(point[2])]);
    const backWidth = deck[1][0] - deck[0][0];
    const frontWidth = deck[2][0] - deck[3][0];
    const vanishingY =
      deck[0][1] - ((deck[3][1] - deck[0][1]) * backWidth) / (frontWidth - backWidth);
    assert.equal(panels.length, 25);
    for (const [backLeft, backRight, frontRight, frontLeft] of panels) {
      assert.ok(backLeft[1] === backRight[1] && frontLeft[1] === frontRight[1]);
      assert.ok(frontLeft[1] > backLeft[1]);
      for (const [back, front] of [
        [backLeft, frontLeft],
        [backRight, frontRight],
      ]) {
        const xAtVanishingPoint =
          back[0] +
          ((front[0] - back[0]) * (vanishingY - back[1])) / (front[1] - back[1]);
        assert.ok(
          Math.abs(xAtVanishingPoint - 50) < 1e-8,
          'key edges share the deck vanishing point',
        );
      }
      assert.ok(frontRight[0] - frontLeft[0] > backRight[0] - backLeft[0]);
    }
    const rearKey = panels[0];
    const frontKey = panels[16];
    assert.ok(frontKey[1][0] - frontKey[0][0] > rearKey[1][0] - rearKey[0][0]);
    checked++;
  }
  assert.ok(checked > 0);
});
