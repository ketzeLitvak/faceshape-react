import { mouthPath } from '../../core/geometry';
import type { FaceGeometry } from '../../core/types';

export function standardShape(g: FaceGeometry) {
  return {
    path: mouthPath(g),
    bottom: 68 + (g.mouthCurve * 13 + g.mouthOpen * 14) / 2,
    tongueHeight: g.mouthOpen * 4.2,
  };
}

export function openSmileShape(g: FaceGeometry) {
  if (g.mouthCurve <= 0 || g.mouthOpen <= 0.015) {
    return standardShape(g);
  }
  return {
    path: `M${50 - g.mouthWidth / 2} 64 Q50 64 ${50 + g.mouthWidth / 2} 64 Q50 ${64 + g.mouthOpen * 44} ${50 - g.mouthWidth / 2} 64Z`,
    bottom: 64 + g.mouthOpen * 22,
    tongueHeight: g.mouthOpen * 5,
  };
}
