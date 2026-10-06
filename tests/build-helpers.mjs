import { build } from 'esbuild';

await build({
  entryPoints: ['tests/helpers.tsx'],
  outfile: '.test-dist/helpers.mjs',
  bundle: true,
  loader: { '.css': 'empty' },
  platform: 'node',
  format: 'esm',
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/server'],
});
