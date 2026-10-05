import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { build, transform } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { buildComponentExport, DEMO_SHAPES } from '../.test-dist/helpers.mjs';
import { Character } from '../dist/index.js';

test('exported components compile with every shape and names containing JSX characters', async () => {
  for (const shape of [
    'circle',
    'blob',
    'square',
    'triangle',
    'star',
    ...Object.keys(DEMO_SHAPES),
  ]) {
    for (const name of ['Mar', 'Luna', 'Nombre "con comillas" & <sí>']) {
      const code = buildComponentExport({
        shape,
        name,
        expression: 'happy',
        face: { eyes: 'bright', mouth: 'standard', eyebrows: 'none' },
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
      if (shape in DEMO_SHAPES) {
        assert(code.includes(`import { ${shape} } from 'faceshape-react/shapes'`));
      }
    }
  }
});

test('custom exports preserve original geometry for multiple names and fixed colors', async () => {
  const normalize = (markup) => markup.replace(/_R[^_]+_/g, 'stable');
  for (const shape of Object.keys(DEMO_SHAPES)) {
    const configuration = {
      shape,
      name: 'Mar',
      expression: 'happy',
      face: { eyes: 'bright', mouth: 'standard', eyebrows: 'none' },
      motion: {},
      reduced: true,
      color: '#aabbcc',
    };
    const code = buildComponentExport(configuration);
    await writeFile(path.resolve(`.test-dist/export-${shape}.tsx`), code);
    const result = await build({
      stdin: { contents: code, loader: 'tsx', resolveDir: process.cwd() },
      bundle: true,
      jsx: 'automatic',
      write: false,
      platform: 'node',
      format: 'esm',
      alias: {
        'faceshape-react': path.resolve('dist/index.js'),
        'faceshape-react/shapes': path.resolve('dist/shapes/index.js'),
      },
      external: ['react', 'react/jsx-runtime'],
    });
    const modulePath = path.resolve(`.test-dist/export-${shape}.mjs`);
    await writeFile(modulePath, result.outputFiles[0].text);
    const { default: Exported } = await import(modulePath);
    for (const name of ['Mar', 'Luna', 'Estrella']) {
      const actual = normalize(renderToStaticMarkup(createElement(Exported, { name })));
      const expected = normalize(
        renderToStaticMarkup(
          createElement(Character, {
            shape: DEMO_SHAPES[shape],
            name,
            face: configuration.face,
            expression: configuration.expression,
            color: configuration.color,
            size: 280,
            motion: {},
            reducedMotion: true,
          }),
        ),
      );
      assert.equal(actual, expected, `${shape}: ${name}`);
    }
  }
});
