import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import sharp from 'sharp';

await mkdir('.ssg-dist', { recursive: true });
await build({
  entryPoints: ['demo/prerender.tsx'],
  outfile: '.ssg-dist/prerender.mjs',
  bundle: true,
  platform: 'node',
  format: 'esm',
  loader: { '.css': 'empty' },
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/server'],
});
await build({
  entryPoints: ['demo/seo.ts'],
  outfile: '.ssg-dist/seo.mjs',
  bundle: true,
  platform: 'node',
  format: 'esm',
});
const { renderPage, renderSocialImage } = await import('../.ssg-dist/prerender.mjs');
const { PUBLIC_PAGES, SOCIAL_IMAGE, SITE_URL } = await import('../.ssg-dist/seo.mjs');
const template = await readFile('demo-dist/index.html', 'utf8');
const escapeAttribute = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const [page, metadata] of Object.entries(PUBLIC_PAGES)) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`);
  for (const [attribute, key, value] of [
    ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:url', metadata.canonical],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
  ]) {
    html = html.replace(
      new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`),
      `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`,
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${metadata.canonical}" />`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-page="${page}">${renderPage(page)}</div>`,
  );
  const directory = page === 'docs' ? 'demo-dist/docs' : 'demo-dist';
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
await sharp(Buffer.from(renderSocialImage()))
  .png()
  .toFile('demo-dist/social-preview.png');
await writeFile(
  'demo-dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
    PUBLIC_PAGES,
  )
    .map((page) => `<url><loc>${page.canonical}</loc></url>`)
    .join('')}</urlset>`,
);
console.log(
  `Generated public HTML, sitemap and social image: ${SITE_URL} (${SOCIAL_IMAGE})`,
);
