import { parseViewBox, validateFaceBox } from './geometry';
import { blobShape } from './shapes/blob';
import { circleShape } from './shapes/circle';
import { squareShape } from './shapes/square';
import { starShape } from './shapes/star';
import type { ShapeDefinition, ShapeName } from './types';

export const SHAPES: Readonly<Record<ShapeName, Readonly<ShapeDefinition>>> =
  Object.freeze({
    circle: circleShape,
    blob: blobShape,
    square: squareShape,
    star: starShape,
  });

export function defineShape<T extends ShapeDefinition>(shape: T): T {
  parseViewBox(shape.viewBox);
  validateFaceBox(shape.faceBox);
  if (!shape.path.trim()) {
    throw new Error('Shape path must not be empty');
  }
  return shape;
}
