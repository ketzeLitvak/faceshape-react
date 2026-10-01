import { clamp } from '../../core/math';
import type { FaceGeometry } from '../../core/types';
/** Apply style proportions without replacing expression geometry. */
export function resolveMouthGeometry(
  geometry: FaceGeometry,
  widthScale: number,
  talk: number,
): FaceGeometry {
  const mouthOpen =
    talk > 0
      ? geometry.mouthOpen > 0
        ? geometry.mouthOpen * (1 - talk * 0.8)
        : talk
      : geometry.mouthOpen;
  return {
    ...geometry,
    mouthWidth: clamp(geometry.mouthWidth * widthScale, 8, 50),
    mouthOpen,
  };
}
