import type { ShapeName } from '../../src';
import type { DemoShape } from '../types';
import { DEMO_SHAPES } from './index';

export function resolveDemoShape(shape: DemoShape) {
  return shape in DEMO_SHAPES
    ? DEMO_SHAPES[shape as keyof typeof DEMO_SHAPES]
    : (shape as ShapeName);
}
