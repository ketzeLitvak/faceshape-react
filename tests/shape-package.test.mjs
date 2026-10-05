import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { build } from 'esbuild';
import * as shapes from 'faceshape-react/shapes';
import { DEMO_SHAPES } from '../.test-dist/helpers.mjs';

test('public shapes support ESM and CommonJS with the complete demo catalogue', () => {
  const commonJS = createRequire(import.meta.url)('faceshape-react/shapes');
  assert.deepEqual(Object.keys(shapes).sort(), Object.keys(DEMO_SHAPES).sort());
  assert.deepEqual(Object.keys(commonJS).sort(), Object.keys(shapes).sort());
  for (const [name, shape] of Object.entries(shapes)) {
    assert(shape.faceBox, name);
    assert(shape.path || shape.render, name);
    assert.equal(typeof shape.fromName, 'function', name);
    assert.deepEqual(
      shape.fromName('Luna').faceBox,
      commonJS[name].fromName('Luna').faceBox,
    );
  }
});

test('importing planet excludes other shapes and character implementation from the bundle', async () => {
  const result = await build({
    stdin: {
      contents: "import { planet } from 'faceshape-react/shapes'; console.log(planet);",
      resolveDir: process.cwd(),
    },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'neutral',
    external: ['react', 'react/jsx-runtime'],
  });
  const code = result.outputFiles[0].text;
  assert(code.includes('data-faceshape-planet'));
  for (const name of [
    'robot',
    'cat',
    'ghost',
    'device',
    'flower',
    'toast',
    'cloud',
    'penguin',
    'shark',
  ]) {
    assert(!code.includes(`data-faceshape-${name}`), name);
  }
  assert(!code.includes('useLookAt'));
  assert(!code.includes('registerEyeStyle'));
});
