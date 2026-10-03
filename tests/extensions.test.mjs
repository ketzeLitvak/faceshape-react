import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  configurationURL,
  parseConfiguration,
  ValidationGallery,
} from '../.test-dist/helpers.mjs';
import {
  Character,
  createPerspectivePlane,
  EXPRESSIONS,
  getMotionCapabilities,
  polygonPath,
  quadraticDerivative,
  quadraticValue,
  registerEyeStyle,
  registerMouthStyle,
} from '../dist/index.js';

const eye = {
  supportsBlink: true,
  supportsLookAt: false,
  dimensions: { rx: 8, ry: 10, whites: false, highlight: false },
  gazeDistance: 0,
  browBaseline: 10,
  idleGlance: false,
  isClosed: (open) => open < 0.05,
  render: ({ face, x, dimensions }) =>
    React.createElement('ellipse', {
      cx: x,
      cy: 36,
      rx: dimensions.rx,
      ry: Math.max(0.1, dimensions.ry * face.geometry.eyeOpen * face.blink),
    }),
};

test('custom registered eyes and mouths compose in SSR and declare capabilities', () => {
  const eyes = registerEyeStyle('custom:test-eye', eye);
  const mouth = registerMouthStyle('custom:test-mouth', {
    widthScale: 1,
    supportsTalking: false,
    lineOnly: true,
    shape: (g) => ({
      path: `M${50 - g.mouthWidth / 2} 68 Q50 ${68 + g.mouthCurve * 10} ${50 + g.mouthWidth / 2} 68`,
      bottom: 68,
      tongueHeight: 0,
      closed: true,
    }),
  });
  assert.deepEqual(getMotionCapabilities(eyes, mouth, EXPRESSIONS.neutral), {
    blink: true,
    lookAt: false,
    talking: false,
  });
  for (const expression of Object.keys(EXPRESSIONS)) {
    const svg = renderToStaticMarkup(
      React.createElement(Character, {
        name: 'Ana',
        expression,
        face: { eyes, mouth, eyebrows: 'expression' },
      }),
    );
    assert.match(svg, /data-eye-variant="custom:test-eye"/);
    assert.match(svg, /data-mouth-variant="custom:test-mouth"/);
    assert.doesNotMatch(svg, /NaN|Infinity/);
  }
  assert.throws(() => registerEyeStyle('custom:test-eye', eye), /already registered/);
  assert.throws(() => registerEyeStyle('bright', eye), /Custom styles/);
  assert.throws(
    () => registerEyeStyle('custom:invalid', { ...eye, supportsBlink: undefined }),
    /Invalid eye/,
  );
  assert.throws(() => getMotionCapabilities('custom:missing'), /Unknown/);
});

test('shared geometry preserves curves and perspective boundaries', () => {
  assert.equal(quadraticValue(10, 20, 30, 0), 10);
  assert.equal(quadraticValue(10, 20, 30, 1), 30);
  assert.equal(quadraticValue(10, 20, 30, 0.5), 20);
  assert.equal(quadraticDerivative(10, 20, 30, 0.5), 20);
  const project = createPerspectivePlane(60, 90, 60, 90);
  assert.deepEqual(project(0, 0), { x: 20, y: 60 });
  assert.deepEqual(project(1, 1), { x: 95, y: 90 });
  assert.throws(() => project(0, 2), /depth/);
  assert.throws(() => createPerspectivePlane(0, 10, 0, 5), /positive/);
  assert.equal(
    polygonPath([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]),
    'M0 0 L1 0 L0 1Z',
  );
});

const config = {
  shape: 'penguin',
  name: 'Pingüino & amigos',
  expression: 'surprised',
  face: { eyes: 'cyclops', mouth: 'none', eyebrows: 'none' },
  color: '#388697',
  motion: { blink: true, lookAt: 'cursor', talking: false },
  reduced: true,
};
test('shared character configurations round-trip complete settings and reject invalid input', () => {
  const url = configurationURL(config, 'https://example.com/demo/?other=1#docs');
  const parsed = new URL(url);
  assert.equal(parsed.hash, '#demo');
  assert.equal(parsed.searchParams.get('other'), '1');
  assert.deepEqual(
    parseConfiguration(JSON.parse(parsed.searchParams.get('character'))),
    config,
  );
  for (const value of [
    null,
    {},
    { ...config, shape: 'missing' },
    { ...config, face: { eyes: 'bright' } },
    { ...config, color: 'url(evil)' },
    { ...config, motion: { blink: 'yes' } },
    { ...config, name: 'x'.repeat(121) },
  ]) {
    assert.equal(parseConfiguration(value), undefined);
  }
});
test('validation gallery includes all expressions, names, sizes and hidden parts', () => {
  const html = renderToStaticMarkup(
    React.createElement(ValidationGallery, {
      face: { eyes: 'bright', mouth: 'cat', eyebrows: 'expression' },
    }),
  );
  for (const name of ['Ana', 'Bruno', 'Cielo']) {
    for (const expression of Object.keys(EXPRESSIONS)) {
      assert.ok(html.includes(`${name} · ${expression}`));
    }
  }
  for (const size of [32, 48, 160]) {
    assert.ok(html.includes(`width="${size}"`));
  }
  for (const part of ['eyes', 'mouth', 'eyebrows']) {
    assert.ok(html.includes(`Sin ${part}`));
  }
});
