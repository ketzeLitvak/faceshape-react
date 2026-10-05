import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import {
  configurationURL,
  PUBLIC_PAGES,
  renderPage,
  renderSocialImage,
} from '../.test-dist/helpers.mjs';

test('public pages render meaningful HTML without browser APIs and have distinct metadata', () => {
  const demo = new JSDOM(renderPage('demo')).window.document;
  const docs = new JSDOM(renderPage('docs')).window.document;
  assert(demo.querySelector('h1').textContent.includes('Dale vida'));
  assert(demo.body.textContent.includes('librería de avatares SVG animados para React'));
  assert(demo.querySelector('a[href="/faceshape-react/docs/"]'));
  assert(docs.querySelector('#docs-start'));
  assert(docs.querySelector('#docs-api'));
  assert(docs.querySelector('#docs-cases'));
  assert.notEqual(PUBLIC_PAGES.demo.title, PUBLIC_PAGES.docs.title);
  assert.equal(PUBLIC_PAGES.docs.canonical, `${PUBLIC_PAGES.demo.canonical}docs/`);
});

test('shared configuration from documentation opens the playground', () => {
  const value = {
    name: 'Luna',
    shape: 'planet',
    face: { eyes: 'bright', mouth: 'cat', eyebrows: 'none' },
    expression: 'happy',
    motion: {},
    reduced: false,
  };
  const link = new URL(
    configurationURL(
      value,
      'https://ketzelitvak.github.io/faceshape-react/docs/#docs-api',
    ),
  );
  assert.equal(link.pathname, '/faceshape-react/');
  assert.equal(link.hash, '#demo');
  assert.deepEqual(JSON.parse(link.searchParams.get('character')), value);
});

test('sharing image uses real SVG characters at social-card dimensions', () => {
  const image = renderSocialImage();
  assert(image.includes('width="1200" height="630"'));
  for (const name of ['planet', 'cat', 'robot', 'shark']) {
    assert(image.includes(`data-faceshape-${name}`));
  }
});
