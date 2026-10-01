import type { FaceBox, ShapeName } from '../../core/types';
import type { CustomShape } from '../types';

export interface AppearanceOptions {
  shape: ShapeName | CustomShape;
  faceBox?: FaceBox;
  identity?: string | number;
  color?: string;
}
