import type { ShapeName, ExpressionName, FaceConfig, MotionConfig } from '../src';
export type DemoShape = ShapeName | 'heart' | 'shark';
export interface SnippetOptions {
  shape: DemoShape;
  expression: ExpressionName;
  face: FaceConfig;
  color?: string;
  name: string;
  motion: MotionConfig;
}
