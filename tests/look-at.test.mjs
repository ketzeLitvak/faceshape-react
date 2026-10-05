import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import React, { act, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useLookAt } from '../.test-dist/helpers.mjs';

test('touch gaze follows contact, resets on release and cancels pending updates', async () => {
  const keys = [
    'window',
    'document',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'IS_REACT_ACT_ENVIRONMENT',
  ];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  const dom = new JSDOM('<div id="root"></div>');
  const frames = new Map();
  let id = 0;
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
    requestAnimationFrame: (callback) => {
      frames.set(++id, callback);
      return id;
    },
    cancelAnimationFrame: (key) => frames.delete(key),
  });
  let gaze;
  function Probe() {
    const element = useRef({
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
    });
    gaze = useLookAt(element, 'cursor', false);
    return null;
  }
  const root = createRoot(document.getElementById('root'));
  const pointer = (type, pointerType = 'touch') => {
    const event = new window.Event(type);
    Object.assign(event, { clientX: 100, clientY: 100, pointerType });
    window.dispatchEvent(event);
  };
  const flush = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => {
      callback();
    });
  };
  try {
    await act(() => root.render(React.createElement(Probe)));
    await act(() => {
      pointer('pointerdown');
      flush();
    });
    assert(gaze.x > 0 && gaze.y > 0);
    await act(() => pointer('pointerup'));
    assert.deepEqual(gaze, { x: 0, y: 0 });
    await act(() => {
      pointer('pointermove');
      pointer('pointercancel');
      flush();
    });
    assert.deepEqual(gaze, { x: 0, y: 0 });
    await act(() => {
      pointer('pointermove', 'mouse');
      flush();
      pointer('pointerup', 'mouse');
    });
    assert(gaze.x > 0);
    await act(() => root.unmount());
    assert.equal(frames.size, 0);
  } finally {
    dom.window.close();
    Object.assign(globalThis, previous);
  }
});
