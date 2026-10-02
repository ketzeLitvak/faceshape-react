import type { ShapeDefinition } from '../types';

export const triangleShape: Readonly<ShapeDefinition> = Object.freeze({
  path: 'M50 7 Q52 7 54 11 L94 85 Q97 92 90 92 H10 Q3 92 6 85 L46 11 Q48 7 50 7Z',
  faceBox: Object.freeze({ x: 0.35, y: 0.47, width: 0.3, height: 0.29 }),
  rotationRange: 180,
});
