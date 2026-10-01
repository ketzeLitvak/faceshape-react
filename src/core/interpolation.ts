import { clamp } from './math';
import type { FaceGeometry } from './types';

export function interpolateFace(
  from: FaceGeometry,
  to: FaceGeometry,
  progress: number,
): FaceGeometry {
  const t = clamp(progress, 0, 1);
  const result = { ...from };
  if (t === 0) {
    return { ...from };
  }
  if (t === 1) {
    return { ...to };
  }
  for (const key of Object.keys(result) as (keyof FaceGeometry)[]) {
    result[key] = from[key] + (to[key] - from[key]) * t;
  }
  return result;
}
