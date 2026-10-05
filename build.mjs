import { rm } from 'node:fs/promises';
import { build } from 'esbuild';

await rm('dist', { recursive: true, force: true });
for (const format of ['esm', 'cjs']) {
  for (const [name, entry] of Object.entries({
    index: 'src/index.ts',
    'core/index': 'src/core/index.ts',
    'shapes/index': 'src/shapes/index.ts',
  })) {
    await build({
      entryPoints: { [name]: entry },
      outdir: 'dist',
      bundle: true,
      format,
      platform: 'neutral',
      target: 'es2020',
      external: ['react', 'react/jsx-runtime'],
      outExtension: { '.js': format === 'cjs' ? '.cjs' : '.js' },
      banner: name === 'index' ? { js: '"use client";' } : undefined,
      sourcemap: true,
    });
  }
}
