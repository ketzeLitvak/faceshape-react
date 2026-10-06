import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguagePopover } from '../.test-dist/helpers.mjs';

test('language popover anchors to trigger, selects, dismisses and restores focus', async () => {
  const dom = new JSDOM('<div id="root"></div><button id="outside">Outside</button>');
  const keys = ['window', 'document', 'Node', 'IS_REACT_ACT_ENVIRONMENT'];
  const previous = Object.fromEntries(keys.map((key) => [key, globalThis[key]]));
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    Node: dom.window.Node,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  const root = createRoot(document.getElementById('root'));
  let selected;
  try {
    await act(() =>
      root.render(
        React.createElement(LanguagePopover, {
          language: 'en',
          onSelect: (value) => {
            selected = value;
          },
        }),
      ),
    );
    const trigger = document.querySelector('.icon-button');
    const open = async () => {
      trigger.focus();
      await act(() => trigger.click());
    };
    await open();
    assert.equal(trigger.getAttribute('aria-expanded'), 'true');
    const panel = document.querySelector('.language-popover');
    assert.equal(panel.style.top, '8px');
    assert.equal(document.activeElement.textContent, 'English');
    await act(() => panel.querySelector('[lang="es"]').click());
    assert.equal(selected, 'es');
    assert.equal(document.querySelector('.language-popover'), null);
    assert.equal(document.activeElement, trigger);
    await open();
    await act(() =>
      document.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      ),
    );
    assert.equal(trigger.getAttribute('aria-expanded'), 'false');
    assert.equal(document.activeElement, trigger);
    await open();
    await act(() =>
      document
        .getElementById('outside')
        .dispatchEvent(new window.Event('pointerdown', { bubbles: true })),
    );
    assert.equal(document.querySelector('.language-popover'), null);
    assert.equal(document.body.style.overflow, '');
    await act(() => root.unmount());
  } finally {
    dom.window.close();
    Object.assign(globalThis, previous);
  }
});
