import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  Character,
  EXPRESSIONS,
  Eyebrows,
  Eyes,
  getMotionCapabilities,
  Mouth,
  SHAPES,
} from '../dist/index.js';

const completeFace = { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' };
const render = (props = {}) =>
  renderToString(React.createElement(Character, { face: completeFace, ...props }));
const eyes = [
  'round',
  'oval',
  'cute',
  'happy',
  'closed',
  'dots',
  'bright',
  'joyful',
  'cartoon',
  'sly',
  'capsule',
];
const mouths = [
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

test('complete face is mandatory at runtime, including composition', () => {
  for (const face of [
    undefined,
    {},
    { eyes: 'bright' },
    { eyes: 'bright', mouth: 'tongue' },
    { ...completeFace, eyes: 'unknown' },
    { ...completeFace, eyebrows: 'unknown' },
  ]) {
    assert.throws(
      () => render({ face }),
      /explicitly include valid eyes, mouth and eyebrows/,
    );
  }
});

test('every explicit eye/mouth combination renders all expressions without browser APIs', () => {
  for (const eye of eyes) {
    for (const mouth of mouths) {
      for (const expression of Object.keys(EXPRESSIONS)) {
        const svg = render({
          expression,
          face: { eyes: eye, mouth, eyebrows: 'expression' },
        });
        assert.match(svg, new RegExp(`data-eye-variant="${eye}"`));
        assert.match(svg, new RegExp(`data-mouth-variant="${mouth}"`));
        assert.doesNotMatch(svg, /NaN|undefined|face-style/);
      }
    }
  }
  for (const shape of Object.keys(SHAPES)) {
    assert.match(render({ shape }), /data-faceshape-shape/);
  }
});

test('SVG is decorative by default and can be labeled', () => {
  assert.match(render(), /aria-hidden="true"/);
  assert.match(render({ label: 'Friend' }), /aria-label="Friend"/);
  assert.match(render({ label: 'Friend' }), /role="img"/);
});

test('multiple characters have unique pupil clip IDs', () => {
  const svg = renderToString(
    React.createElement(
      'div',
      null,
      ...Array.from({ length: 8 }, () =>
        React.createElement(Character, { face: { ...completeFace, eyes: 'cartoon' } }),
      ),
    ),
  );
  const ids = [...svg.matchAll(/id="(fs-eye-[^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, 16);
  assert.equal(new Set(ids).size, 16);
});

test('custom shape and explicitly configured composition are supported', () => {
  const shape = {
    viewBox: '10 20 200 100',
    faceBox: { x: 0.2, y: 0.2, width: 0.5, height: 0.4 },
    render: ({ color }) =>
      React.createElement('rect', { x: 10, y: 20, width: 200, height: 100, fill: color }),
  };
  const svg = renderToString(
    React.createElement(
      Character,
      {
        shape,
        color: 'tomato',
        face: { eyes: 'cute', mouth: 'wide', eyebrows: 'raised' },
      },
      React.createElement(Eyes, { variant: 'cute' }),
      React.createElement(Mouth, { variant: 'wide' }),
      React.createElement(Eyebrows, { variant: 'raised' }),
    ),
  );
  assert.match(svg, /fill="tomato"/);
  assert.match(svg, /translate\(50 40\) scale\(1 0.4\)/);
});

test('reduced motion disables CSS movement', () => {
  assert.doesNotMatch(
    render({ reducedMotion: true, motion: { idle: true, bounce: true, shake: true } }),
    /class="fs-(idle|bounce|shake)"/,
  );
});

test('name changes body and color deterministically while fixed color wins', () => {
  const body = (props) =>
    render({ name: 'Ana', ...props })
      .match(/data-faceshape-shape="" d="([^"]+)" fill="([^"]+)"/)
      .slice(1);
  assert.deepEqual(body({}), body({}));
  assert.notDeepEqual(body({}), body({ name: 'Bruno' }));
  assert.equal(body({ color: '#123456' })[1], '#123456');
});

test('every eye and mouth variant responds to every expression', () => {
  for (const eye of eyes) {
    const svgs = Object.keys(EXPRESSIONS).map(
      (expression) =>
        render({ expression, face: { ...completeFace, eyes: eye } }).match(
          /<g data-faceshape-eyes[\s\S]*?<\/g>/,
        )[0],
    );
    assert.equal(new Set(svgs).size, 6, eye);
  }
  for (const mouth of mouths) {
    const paths = Object.keys(EXPRESSIONS).map(
      (expression) =>
        render({ expression, face: { ...completeFace, mouth } }).match(
          /data-faceshape-mouth[\s\S]*?<path d="([^"]+)"/,
        )[1],
    );
    assert.equal(new Set(paths).size, 6, mouth);
  }
});

test('shark decoration belongs only to the shark mouth', () => {
  for (const eye of eyes) {
    assert.match(
      render({
        expression: 'happy',
        face: { ...completeFace, eyes: eye, mouth: 'shark' },
      }),
      /data-faceshape-shark-teeth/,
    );
  }
  assert.doesNotMatch(
    render({ expression: 'happy', face: { ...completeFace, mouth: 'toothy' } }),
    /data-faceshape-shark-teeth/,
  );
});

test('motion capabilities follow eye expression', () => {
  for (const eye of ['closed', 'happy', 'joyful']) {
    assert.equal(getMotionCapabilities(eye, 'tongue', { eyeOpen: 0.95 }).blink, false);
    assert.equal(getMotionCapabilities(eye, 'tongue', { eyeOpen: 1.2 }).blink, true);
  }
  assert.equal(getMotionCapabilities('capsule', 'cat').talking, true);
});

test('mouth and eyebrows follow whole-eye gaze, never pupil-only gaze', () => {
  const transform = (svg, part) =>
    svg.match(new RegExp(`<g transform="([^"]+)" data-faceshape-${part}`))[1];
  for (const eye of ['bright', 'capsule', 'sly', 'cartoon']) {
    const svg = render({
      face: { ...completeFace, eyes: eye, eyebrows: 'soft' },
      motion: { lookAt: { x: 1, y: 0 } },
    });
    const distance = eye === 'cartoon' ? 0 : eye === 'sly' ? 1.8 : 3;
    assert.equal(transform(svg, 'eyebrows'), `translate(${distance} ${-distance})`);
    assert.equal(
      transform(svg, 'mouth'),
      `translate(${distance * 0.4} ${-distance * 0.4})`,
    );
  }
});

test('CommonJS exposes the public API without legacy presets', async () => {
  const { createRequire } = await import('node:module');
  const library = createRequire(import.meta.url)('../dist/index.cjs');
  assert.equal(typeof library.Character.render, 'function');
  assert.equal(library.FACE_PRESETS, undefined);
});

test('simple line mouth remains a single unfilled curve for every expression', () => {
  const paths = [];
  for (const expression of Object.keys(EXPRESSIONS)) {
    const svg = render({
      expression,
      face: { ...completeFace, mouth: 'standard' },
      motion: { talking: true },
    });
    const mouth = svg.slice(svg.indexOf('data-faceshape-mouth'));
    const path = mouth.match(/<path d="([^"]+)" fill="([^"]+)" stroke=/);
    assert.equal(path[2], 'none');
    assert.doesNotMatch(path[1], /[ZzLl]/);
    assert.equal((path[1].match(/Q/g) || []).length, 1);
    assert.doesNotMatch(mouth, /<ellipse|data-faceshape-shark-teeth/);
    paths.push(path[1]);
  }
  assert.equal(new Set(paths).size, 6);
  assert.equal(getMotionCapabilities('bright', 'standard').talking, false);
});

test('happy cat mouth is closed with rosy cheeks and cannot talk', () => {
  const svg = render({ expression: 'happy', face: { ...completeFace, mouth: 'cat' } });
  assert.match(svg, /data-faceshape-mouth-cheeks/);
  const mouth = svg.slice(svg.indexOf('data-mouth-variant="cat"'));
  const path = mouth.match(/<path d="([^"]+)" fill="([^"]+)" stroke=/);
  assert.equal(path[2], 'none');
  assert.doesNotMatch(path[1], /Z/);
  assert.equal((path[1].match(/Q/g) || []).length, 2);
  assert.equal(getMotionCapabilities('bright', 'cat', EXPRESSIONS.happy).talking, false);
  assert.equal(
    getMotionCapabilities('bright', 'cat', EXPRESSIONS.surprised).talking,
    true,
  );
});
