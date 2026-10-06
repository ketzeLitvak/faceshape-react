export const SITE_PATH = '/faceshape-react/';
export const SITE_URL = `https://ketzelitvak.github.io${SITE_PATH}`;
export const DOCS_PATH = `${SITE_PATH}docs/`;
export const SOCIAL_IMAGE = `${SITE_URL}social-preview.png`;
export const PUBLIC_PAGES = {
  demo: {
    title: 'faceshape-react — Avatares SVG animados para React',
    description:
      'Creá personajes SVG para React con formas, ojos, bocas y cejas combinables. Probá expresiones y animaciones, personalizá por nombre y exportá tu componente.',
    canonical: SITE_URL,
  },
  docs: {
    title: 'faceshape-react documentation — React API and examples',
    description:
      'Learn to use faceshape-react: installation, SVG shapes, expressions, animations, name-based variation and custom components. Includes examples and use cases.',
    canonical: `${SITE_URL}docs/`,
  },
};

export function updatePageMetadata(page: 'demo' | 'docs') {
  const metadata = PUBLIC_PAGES[page];
  document.title = metadata.title;
  for (const [selector, value] of [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:url"]', metadata.canonical],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
  ]) {
    document.querySelector(selector)?.setAttribute('content', value);
  }
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute('href', metadata.canonical);
}
