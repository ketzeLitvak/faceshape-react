import type { ShapeDefinition } from '../types';

export const squareShape: Readonly<ShapeDefinition> = Object.freeze({
  rotationRange: 180,
  path: 'M24 8 H76 Q92 8 92 24 V76 Q92 92 76 92 H24 Q8 92 8 76 V24 Q8 8 24 8Z',
  faceBox: Object.freeze({ x: 0.2, y: 0.27, width: 0.6, height: 0.5 }),
});
