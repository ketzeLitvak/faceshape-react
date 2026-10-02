import type { FaceGeometry } from '../../core/types';
import type { EyeAnchor, EyeStrategy } from './types';

export function eyeAnchors(strategy: EyeStrategy, geometry: FaceGeometry): EyeAnchor[] {
  return (
    strategy.anchors?.(geometry) ??
    [-1, 1].map((side) => ({
      x: 50 + side * geometry.eyeSpacing,
      angle: -side * geometry.eyeAngle,
      side: side as -1 | 1,
    }))
  );
}
