import type { ShapeDefinition } from '../types';

export const circleShape: Readonly<ShapeDefinition> = Object.freeze({
  path: 'M50 6 A44 44 0 1 1 50 94 A44 44 0 1 1 50 6Z',
  faceBox: Object.freeze({ x: 0.2, y: 0.28, width: 0.6, height: 0.48 }),
});
