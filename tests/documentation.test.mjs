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
  assert.equal((html.match(/>Copiar<\/button>/g) || []).length, 10);
  for (const topic of [
    'faceBox',
    'fromName',
    'createNameRandom',
    'rotationRange',
    'getMotionCapabilities',
    'reducedMotion',
    'beak',
    'cat',
  ]) {
    assert.ok(html.includes(topic), topic);
  }
  assert.match(html, /todavía no está publicado/);
  assert.match(html, /faceStyle/);
  assert.doesNotMatch(html, /NaN|undefined/);
});
