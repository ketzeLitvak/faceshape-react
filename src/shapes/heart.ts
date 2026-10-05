import { defineShape, varyShape } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';

const baseHeart = /* @__PURE__ */ defineShape({
  path: 'M50 88 C40 79 7 57 7 31 C7 9 37 5 50 24 C63 5 93 9 93 31 C93 57 60 79 50 88Z',
  faceBox: { x: 0.23, y: 0.27, width: 0.54, height: 0.4 },
});

export const heart: CustomShape = /* @__PURE__ */ createNamedShape(
  (name) => varyShape(baseHeart, name, 'heart'),
  baseHeart,
);
