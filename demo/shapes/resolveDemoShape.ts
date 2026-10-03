import type { ShapeName } from '../../src';
import type { DemoShape } from '../types';
import { CUSTOM_SHAPES } from './index';

export function resolveDemoShape(shape: DemoShape) {
  return shape in CUSTOM_SHAPES
    ? CUSTOM_SHAPES[shape as keyof typeof CUSTOM_SHAPES]
    : (shape as ShapeName);
}
