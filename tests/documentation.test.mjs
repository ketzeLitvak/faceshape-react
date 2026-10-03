import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DOC_SECTIONS, Documentation } from '../.test-dist/helpers.mjs';

test('documentation provides every navigation target, examples, and the complete face contract', () => {
  const html = renderToStaticMarkup(React.createElement(Documentation));
  for (const { id } of DOC_SECTIONS) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
  assert.equal((html.match(/>Copiar<\/button>/g) || []).length, 13);
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
  assert.match(html, /todavía no está publicado/);
  assert.match(html, /faceStyle/);
  assert.doesNotMatch(html, /NaN|undefined/);
});

test('chat use case shows a conversation with consistent author identities', () => {
  const html = renderToStaticMarkup(React.createElement(Documentation));
  const preview = html.slice(
    html.indexOf('aria-label="Ejemplo de conversación con avatares"'),
    html.indexOf('Chat con React'),
  );
  assert.equal((preview.match(/class="chat-message"/g) || []).length, 3);
  assert.equal((preview.match(/data-mouth-variant="cat"/g) || []).length, 3);
  assert.equal((preview.match(/<strong>Eze<\/strong>/g) || []).length, 2);
  assert.match(preview, /<strong>Sofi<\/strong>/);
  assert.match(html, /ID de usuario/);
});
