import {
  contrastRatio,
  mixColor,
  parseHexColor,
  type RGB,
  toHexColor,
} from './colors/contrast';
import { colorFromName } from './identity';

const MINIMUM_TEXT_CONTRAST = 4.5;

function adjustToward(color: RGB, background: RGB, target: number) {
  if (contrastRatio([target, target, target], background) < MINIMUM_TEXT_CONTRAST) {
    return;
  }
  let low = 0;
  let high = 1;
  for (let step = 0; step < 24; step++) {
    const amount = (low + high) / 2;
    if (
      contrastRatio(mixColor(color, target, amount), background) >= MINIMUM_TEXT_CONTRAST
    ) {
      high = amount;
    } else {
      low = amount;
    }
  }
  return { color: mixColor(color, target, high), amount: high };
}

/** Preserve the name color when readable, otherwise adjust it to 4.5:1 contrast.
 * Background accepts opaque #RGB or #RRGGBB colors.
 */
export function textColorFromName(name: string | number, background: string): string {
  const base = colorFromName(name);
  const color = parseHexColor(base);
  const backdrop = parseHexColor(background);
  if (contrastRatio(color, backdrop) >= MINIMUM_TEXT_CONTRAST) {
    return base;
  }
  const candidates = [
    adjustToward(color, backdrop, 0),
    adjustToward(color, backdrop, 255),
  ]
    .filter((candidate) => candidate !== undefined)
    .sort((a, b) => a.amount - b.amount);
  return toHexColor(candidates[0].color);
}
