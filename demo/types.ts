import type { ShapeName, ExpressionName, FaceStyle, FaceConfig, MotionConfig } from '../src';
export type DemoShape = ShapeName | 'heart' | 'shark';
export interface SnippetOptions {
  shape: DemoShape;
  expression: ExpressionName;
  faceStyle: FaceStyle;
  face: FaceConfig;
  color: string;
  seed: string;
  motion: MotionConfig;
}
