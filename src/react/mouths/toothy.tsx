import { toothyTeethPath } from '../utils/toothyTeethGeometry';
import { relaxedMouth } from './relaxed';
import { openSmileShape } from './shared';
import type { MouthStrategy } from './types';

export const toothyMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0.4, mouthCurve: 0.2, widthScale: 1 }),
  widthScale: 1.1,
  shape: openSmileShape,
  decoration: (geometry) =>
    geometry.mouthOpen > 0.25 ? (
      <path d={toothyTeethPath(geometry)} fill="white" />
    ) : null,
};
