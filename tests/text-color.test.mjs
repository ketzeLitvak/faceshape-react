import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { colorFromName, textColorFromName } from '../dist/core/index.js';
import { textColorFromName as fromRoot } from '../dist/index.js';

function luminance(hex) {
  const expanded =
    hex.length === 4 ? [...hex.slice(1)].map((v) => v + v).join('') : hex.slice(1);
  const [r, g, b] = expanded.match(/../g).map((value) => {
    const c = Number.parseInt(value, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

test('text colors meet 4.5:1 after hex rounding across light, dark and colored backgrounds', () => {
  for (let i = 0; i < 1000; i++) {
    const name = `Persona ${i}`;
    const backgrounds = [
      '#fff',
      '#000',
      '#182b35',
      '#777777',
      '#ffcc00',
      colorFromName(`Fondo ${i}`),
      colorFromName(name),
    ];
    for (const background of backgrounds) {
      const result = textColorFromName(name, background);
      assert.match(result, /^#[a-f0-9]{6}$/);
      assert.ok(
        contrast(result, background) >= 4.5,
        `${name} on ${background}: ${result}`,
      );
      assert.equal(result, textColorFromName(name, background));
      if (contrast(colorFromName(name), background) >= 4.5) {
        assert.equal(result, colorFromName(name));
      }
    }
  }
});

test('existing palette stays unchanged and the helper is public in root, core and CommonJS', () => {
  assert.equal(colorFromName('Ketze'), '#d15d92');
  assert.equal(colorFromName('Ana'), '#c76ad4');
  assert.equal(textColorFromName(0, '#fff'), textColorFromName('0', '#ffffff'));
  assert.equal(textColorFromName('Ana', '#ABC'), textColorFromName('Ana', '#aabbcc'));
  assert.equal(fromRoot('Ketze', '#fff'), textColorFromName('Ketze', '#fff'));
  const common = createRequire(import.meta.url)('../dist/core/index.cjs');
  assert.equal(
    common.textColorFromName('Ketze', '#fff'),
    textColorFromName('Ketze', '#fff'),
  );
  for (const background of [
    'red',
    'transparent',
    '#1234',
    '#12345678',
    'ffffff',
    '#xyz',
    '',
    '#fff\n',
  ]) {
    assert.throws(() => textColorFromName('Ana', background), /opaque hex color/);
  }
});
