import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  calculateBlink,
  calculateFrame,
  calculateGaze,
  calculateTalk,
  resolveCharacterAppearance,
  resolveFaceGeometry,
} from '../.test-dist/helpers.mjs';
import { EXPRESSIONS } from '../dist/index.js';

const options = {
  duration: 300,
  easing: 'linear',
  blink: true,
  talking: true,
  reduced: false,
  seedPhase: 0,
  glance: true,
};

test('blink reaches half closure, full closure and reopens at exact times', () => {
  assert.equal(calculateBlink(0, 0), 1);
  assert.equal(calculateBlink(42.5, 0), 0.5);
  assert.equal(calculateBlink(85, 0), 0);
  assert.equal(calculateBlink(127.5, 0), 0.5);
  assert.equal(calculateBlink(170, 0), 1);
  assert.equal(calculateBlink(4285, 0), 0);
});

test('transition interpolates geometry and reduced motion returns the target immediately', () => {
  const from = EXPRESSIONS.happy;
  const target = EXPRESSIONS.angry;
  const halfway = calculateFrame(from, target, 150, options);
  assert.equal(halfway.geometry.browAngle, 10);
  assert.equal(halfway.geometry.eyeOpen, (from.eyeOpen + target.eyeOpen) / 2);
  assert.deepEqual(calculateFrame(from, target, 300, options).geometry, target);
  const reduced = calculateFrame(from, target, 42, { ...options, reduced: true });
  assert.deepEqual(reduced, {
    geometry: target,
    blink: 1,
    talk: 0,
    gaze: { x: 0, y: 0 },
  });
  const disabled = calculateFrame(from, target, 85, {
    ...options,
    blink: false,
    talking: false,
    glance: false,
  });
  assert.equal(disabled.blink, 1);
  assert.equal(disabled.talk, 0);
  assert.deepEqual(disabled.gaze, { x: 0, y: 0 });
});

test('talk and gaze remain bounded across the animation cycle', () => {
  for (let elapsed = 0; elapsed < 20000; elapsed += 17) {
    const talk = calculateTalk(elapsed);
    const gaze = calculateGaze(elapsed, 193);
    assert.ok(talk >= 0 && talk <= 0.7);
    assert.ok(Math.abs(gaze.x) <= 0.7 && Math.abs(gaze.y) <= 0.35);
  }
});

test('resolvers respect explicit geometry and fixed colors', () => {
  const geometry = resolveFaceGeometry(
    { eyeSpacing: 20, pupilSize: 3, mouthCurve: 0.8 },
    'Ana',
  );
  assert.equal(geometry.eyeSpacing, 20);
  assert.equal(geometry.pupilSize, 3);
  const first = resolveCharacterAppearance({ shape: 'blob', identity: 'Ana' });
  assert.deepEqual(first, resolveCharacterAppearance({ shape: 'blob', identity: 'Ana' }));
  const fixed = resolveCharacterAppearance({
    shape: 'blob',
    identity: 'Ana',
    color: '#123456',
  });
  assert.equal(first.definition.path, fixed.definition.path);
  assert.equal(fixed.color, '#123456');
  assert.throws(
    () =>
      resolveCharacterAppearance({
        shape: { faceBox: { x: 0.2, y: 0.2, width: 0.5, height: 0.5 } },
      }),
    /needs path or render/,
  );
});
