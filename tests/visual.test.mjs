import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { test } from 'node:test';
import sharp from 'sharp';
import { calculateFrame, renderPose } from '../.test-dist/helpers.mjs';
import { EXPRESSIONS } from '../dist/index.js';

const options = {
  duration: 300,
  easing: 'linear',
  blink: true,
  talking: false,
  reduced: false,
  seedPhase: 0,
  glance: false,
};
const configs = [
  { eyes: 'eyelashes', mouth: 'cat', eyebrows: 'soft' },
  { eyes: 'heart', mouth: 'cat', eyebrows: 'soft' },
  { eyes: 'star', mouth: 'cat', eyebrows: 'soft' },
  { eyes: 'softLids', mouth: 'cat', eyebrows: 'soft' },
  { eyes: 'cyclops', mouth: 'cat', eyebrows: 'soft' },
  { eyes: 'spiral', mouth: 'cat', eyebrows: 'soft' },

  { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' },
  { eyes: 'sly', mouth: 'smirk', eyebrows: 'soft' },
  { eyes: 'cartoon', mouth: 'shark', eyebrows: 'expression' },
  { eyes: 'capsule', mouth: 'cat', eyebrows: 'expression' },
];
const poses = [
  ['open', 0, false],
  ['half-blink', 42.5, false],
  ['closed', 85, false],
  ['wink', 0, true],
  ['reopening', 127.5, false],
  ['transition', 150, false],
  ['angry', 300, false],
];

test('visual regression covers blink, wink, brows and expression transitions', async () => {
  const directory = new URL('./visual/', import.meta.url);
  await mkdir(directory, { recursive: true });
  for (const face of configs) {
    const pixels = [];
    for (const [pose, time, wink] of poses) {
      const frame = calculateFrame(EXPRESSIONS.happy, EXPRESSIONS.angry, time, options);
      const state = {
        ...frame,
        color: '#182b35',
        eyeVariant: face.eyes,
        look: { x: 0.4, y: -0.2 },
      };
      const svg = renderPose(face, state, wink);
      const file = new URL(`${face.eyes}-${pose}.svg`, directory);
      if (process.env.UPDATE_VISUALS === '1') {
        await writeFile(file, svg);
      }
      const expected = await readFile(file);
      const actualPixels = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
      const expectedPixels = await sharp(expected).ensureAlpha().raw().toBuffer();
      assert.deepEqual(actualPixels, expectedPixels, `${face.eyes}: ${pose}`);
      pixels.push(actualPixels);
    }
    assert.notDeepEqual(
      pixels[0],
      pixels[1],
      `${face.eyes}: half blink must alter the rendered image`,
    );
    assert.notDeepEqual(
      pixels[1],
      pixels[2],
      `${face.eyes}: fully closed must differ from half blink`,
    );
    assert.notDeepEqual(
      pixels[2],
      pixels[3],
      `${face.eyes}: wink must leave one eye open`,
    );
  }
});
