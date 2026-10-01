import { build } from 'esbuild';

await build({
  entryPoints: ['tests/helpers.tsx'],
  outfile: '.test-dist/helpers.mjs',
  bundle: true,
  platform: 'node',
  format: 'esm',
  external: ['react', 'react/jsx-runtime', 'react-dom/server'],
});
