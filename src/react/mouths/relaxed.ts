import { clamp } from '../../core/math';
import type { FaceGeometry } from '../../core/types';

export function relaxation(geometry: Partial<FaceGeometry>): number {
  const eyes = clamp((0.35 - (geometry.eyeOpen ?? 1)) / 0.23, 0, 1);
  const curve = 1 - clamp(Math.abs(geometry.mouthCurve ?? 0) / 0.25, 0, 1);
  return eyes * curve;
}

/** Blend each style's resting pose smoothly as the expression becomes sleepy. */
export function relaxedMouth(
  pose: Pick<FaceGeometry, 'mouthOpen' | 'mouthCurve'> & {
    widthScale?: number;
  },
): (geometry: FaceGeometry) => FaceGeometry {
  return (geometry) => {
    const amount = relaxation(geometry);
    return {
      ...geometry,
      mouthOpen: geometry.mouthOpen + (pose.mouthOpen - geometry.mouthOpen) * amount,
      mouthCurve: geometry.mouthCurve + (pose.mouthCurve - geometry.mouthCurve) * amount,
      mouthWidth: geometry.mouthWidth * (1 + ((pose.widthScale ?? 1) - 1) * amount),
    };
  };
}
