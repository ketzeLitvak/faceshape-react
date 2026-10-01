import type { FaceGeometry } from '../../core/types';

export interface AnimationFrame {
  geometry: FaceGeometry;
  blink: number;
  talk: number;
  gaze: { x: number; y: number };
}
