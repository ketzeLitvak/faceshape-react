import assert from 'node:assert/strict';
import test from 'node:test';
import { transform } from 'esbuild';
import { buildComponentExport, CUSTOM_SHAPES } from '../.test-dist/helpers.mjs';

test('exported components compile with every shape and names containing JSX characters', async () => {
  for (const shape of [
    'circle',
    'blob',
    'square',
    'triangle',
    'star',
    ...Object.keys(CUSTOM_SHAPES),
  ]) {
    for (const name of ['Mar', 'Luna', 'Nombre "con comillas" & <sí>']) {
      const code = buildComponentExport({
        shape,
        name,
        expression: 'happy',
        face: { eyes: 'oval', mouth: 'line', eyebrows: 'none' },
        motion: { blink: true },
        reduced: true,
        color: '#aabbcc',
      });
      await transform(code, { loader: 'tsx' });
      assert(!code.includes('__FACESHAPE_EXPORT_COLOR__'));
      assert(code.includes('"reducedMotion": true'));
      assert(code.includes('"color": "#aabbcc"'));
      assert(code.includes('"eyebrows": "none"'));
      assert(code.includes('export default function MyCharacter'));
      if (shape in CUSTOM_SHAPES) {
        assert(code.includes('const customShape: CustomShape'));
      }
    }
  }
});
