import type { ExpressionName, FaceConfig, MotionConfig, ShapeName } from '../src';

export type DemoShape =
  | ShapeName
  | 'heart'
  | 'shark'
  | 'penguin'
  | 'device'
  | 'cloud'
  | 'ghost'
  | 'cat'
  | 'robot'
  | 'planet'
  | 'flower'
  | 'drop'
  | 'toast';

export interface SnippetOptions {
  shape: DemoShape;
  expression: ExpressionName;
  face: FaceConfig;
  color?: string;
  name: string;
  motion: MotionConfig;
}
