import type { ShapeName, ShapeDefinition } from './types';
import { parseViewBox, validateFaceBox } from './geometry';
export const SHAPES: Readonly<Record<ShapeName, Readonly<ShapeDefinition>>> = Object.freeze({
  circle: Object.freeze({ path: 'M50 6 A44 44 0 1 1 50 94 A44 44 0 1 1 50 6Z', faceBox: Object.freeze({ x: .2, y: .28, width: .6, height: .48 }) }),
  blob: Object.freeze({ path: 'M50 7 C69 -1 94 18 92 43 C103 67 81 95 58 93 C34 103 6 87 9 62 C-1 37 22 4 50 7Z', faceBox: Object.freeze({ x: .2, y: .28, width: .6, height: .48 }) }),
  square: Object.freeze({ path: 'M24 8 H76 Q92 8 92 24 V76 Q92 92 76 92 H24 Q8 92 8 76 V24 Q8 8 24 8Z', faceBox: Object.freeze({ x: .2, y: .27, width: .6, height: .5 }) }),
  star: Object.freeze({ path: 'M50 4 L63 33 L95 36 L71 58 L78 91 L50 74 L22 91 L29 58 L5 36 L37 33Z', faceBox: Object.freeze({ x: .32, y: .34, width: .36, height: .3 }) }),
});
export function defineShape<T extends ShapeDefinition>(shape: T): T {
  parseViewBox(shape.viewBox);
  validateFaceBox(shape.faceBox);
  if (!shape.path.trim())
    throw new Error('Shape path must not be empty');
  return shape;
}
