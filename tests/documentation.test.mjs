import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  DOC_SECTIONS,
  Documentation,
  useDocumentationLanguage,
} from '../.test-dist/helpers.mjs';

test('documentation provides every navigation target, examples, and the complete face contract', () => {
  const html = renderToStaticMarkup(React.createElement(Documentation));
  for (const { id } of DOC_SECTIONS) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
  assert.equal((html.match(/>Copy<\/button>/g) || []).length, 14);
  for (const topic of [
    'faceBox',
    'fromName',
    'createNameRandom',
    'rotationRange',
    'getMotionCapabilities',
    'reducedMotion',
    'beak',
    'cat',
    'registerEyeStyle',
    'registerMouthStyle',
  ]) {
    assert.ok(html.includes(topic), topic);
  }
  assert.match(html, /not published on npm yet/);
  assert.match(html, /faceStyle/);
  assert.doesNotMatch(html, /NaN|undefined/);
});

test('chat use case shows a conversation with consistent author identities', () => {
  const html = renderToStaticMarkup(React.createElement(Documentation));
  const preview = html.slice(
    html.indexOf('aria-label="Example conversation with avatars"'),
    html.indexOf('React chat'),
  );
  assert.equal((preview.match(/class="chat-message"/g) || []).length, 3);
  assert.equal((preview.match(/data-mouth-variant="cat"/g) || []).length, 3);
  assert.equal((preview.match(/<strong>Eze<\/strong>/g) || []).length, 2);
  assert.match(preview, /<strong>Sofi<\/strong>/);
  assert.match(html, /user ID/);
});

test('language selector switches every section and preserves the preference', async () => {
  const { JSDOM } = await import('jsdom');
  const { act } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://example.com/' });
  const keys = ['window', 'document', 'localStorage', 'IS_REACT_ACT_ENVIRONMENT'];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    localStorage: dom.window.localStorage,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  });
  function LanguageProbe() {
    const { language, selectLanguage } = useDocumentationLanguage();
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'select',
        { value: language, onChange: (event) => selectLanguage(event.target.value) },
        React.createElement('option', { value: 'en' }, 'English'),
        React.createElement('option', { value: 'es' }, 'Español'),
      ),
      React.createElement(Documentation, { language }),
    );
  }
  const root = createRoot(document.getElementById('root'));
  try {
    await act(() => root.render(React.createElement(LanguageProbe)));
    assert.equal(document.querySelector('.documentation').lang, 'en');
    assert.match(document.body.textContent, /Getting started/);
    const select = document.querySelector('select');
    await act(() => {
      select.value = 'es';
      select.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
    assert.equal(document.querySelector('.documentation').lang, 'es');
    for (const { id, label } of DOC_SECTIONS) {
      assert(document.querySelector(`#${id}`), id);
      assert.equal(document.querySelector(`a[href="#${id}"]`).textContent, label);
    }
    assert.match(document.body.textContent, /Primeros pasos/);
    assert.match(document.body.textContent, /Copiar/);
    assert.equal(localStorage.getItem('faceshape-docs-language'), 'es');
    await act(() => root.render(null));
    await act(() => root.render(React.createElement(LanguageProbe)));
    assert.equal(document.querySelector('.documentation').lang, 'es');
    await act(() => root.unmount());
  } finally {
    dom.window.close();
    Object.assign(globalThis, previous);
  }
});
