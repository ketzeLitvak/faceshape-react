import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ControlTabs,
  initialPlaygroundConfiguration,
  usePlayground,
} from '../.test-dist/helpers.mjs';

test('reset restores every setting and random discovery changes only the name', async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://example.com/' });
  const keys = ['window', 'document', 'IS_REACT_ACT_ENVIRONMENT'];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  });
  let playground;
  function Probe() {
    playground = usePlayground();
    return null;
  }
  const root = createRoot(document.getElementById('root'));
  try {
    await act(() => root.render(React.createElement(Probe)));
    const changed = {
      name: 'Otro',
      shape: 'planet',
      face: { eyes: 'none', mouth: 'cat', eyebrows: 'none' },
      expression: 'sleepy',
      color: '#abcdef',
      motion: { bounce: true },
      reduced: true,
    };
    await act(() => playground.loadConfiguration(changed));
    await act(() => playground.randomizeName());
    assert.notEqual(playground.name, changed.name);
    assert.deepEqual({ ...playground.configuration, name: changed.name }, changed);
    await act(() => playground.reset());
    assert.deepEqual(
      JSON.parse(JSON.stringify(playground.configuration)),
      initialPlaygroundConfiguration(),
    );
    await act(() => root.unmount());
  } finally {
    dom.window.close();
    Object.assign(globalThis, previous);
  }
});

test('control tabs expose one panel and support keyboard selection', async () => {
  const dom = new JSDOM('<div id="root"></div>');
  const keys = ['window', 'document', 'IS_REACT_ACT_ENVIRONMENT'];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  const root = createRoot(document.getElementById('root'));
  try {
    await act(() =>
      root.render(
        React.createElement(ControlTabs, { appearance: 'Formas', movement: 'Animación' }),
      ),
    );
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const panels = [...document.querySelectorAll('[role="tabpanel"]')];
    assert(!panels[0].hidden);
    assert(panels[1].hidden);
    await act(() =>
      tabs[0].dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      ),
    );
    assert(panels[0].hidden);
    assert(!panels[1].hidden);
    assert.equal(document.activeElement, tabs[1]);
    await act(() => root.unmount());
  } finally {
    dom.window.close();
    Object.assign(globalThis, previous);
  }
});
