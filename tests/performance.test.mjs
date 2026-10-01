import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../dist/index.js';

test('animation frames do not rerender static custom silhouettes', async () => {
  const keys = [
    'window',
    'document',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'IS_REACT_ACT_ENVIRONMENT',
  ];
  const original = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  const dom = new JSDOM('<div id="root"></div>');
  let id = 0;
  let bodyRenders = 0;
  const callbacks = new Map();
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  dom.window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  });
  globalThis.requestAnimationFrame = (callback) => {
    callbacks.set(++id, callback);
    return id;
  };
  globalThis.cancelAnimationFrame = (id) => callbacks.delete(id);
  const shape = {
    faceBox: { x: 0.2, y: 0.2, width: 0.6, height: 0.6 },
    render: ({ color }) => {
      bodyRenders++;
      return React.createElement('path', { d: 'M0 0H100V100H0Z', fill: color });
    },
  };
  const container = dom.window.document.getElementById('root');
  const root = createRoot(container);
  try {
    await act(() =>
      root.render(
        React.createElement(
          'div',
          null,
          ...Array.from({ length: 20 }, (_, index) =>
            React.createElement(Character, {
              key: index,
              shape,
              face: { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' },
              expression: 'happy',
              motion: { talking: true, blink: true },
            }),
          ),
        ),
      ),
    );
    assert.equal(bodyRenders, 20);
    const first = container.innerHTML;
    for (let frame = 0; frame < 60; frame++) {
      await act(() => {
        const batch = [...callbacks.values()];
        callbacks.clear();
        for (const callback of batch) {
          callback(frame * 16);
        }
      });
    }
    assert.notEqual(container.innerHTML, first, 'the face must keep animating');
    assert.equal(
      bodyRenders,
      20,
      'static silhouettes must render once while their faces animate',
    );
    await act(() => root.unmount());
    assert.equal(callbacks.size, 0, 'animation frames must be cancelled when unmounted');
  } finally {
    dom.window.close();
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete globalThis[key];
      } else {
        globalThis[key] = value;
      }
    }
  }
});
