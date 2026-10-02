import { relaxedMouth } from './relaxed';
import { openSmileShape } from './shared';
import type { MouthStrategy } from './types';

export const toothyMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0.4, mouthCurve: 0.2, widthScale: 1 }),
  widthScale: 1.1,
  shape: openSmileShape,
  decoration: (geometry) =>
    geometry.mouthOpen > 0.25 ? (
      <path
        d={`M${50 - geometry.mouthWidth * 0.36} 65 L${50 + geometry.mouthWidth * 0.36} 65 L${50 + geometry.mouthWidth * 0.25} 69 Q50 71 ${50 - geometry.mouthWidth * 0.25} 69Z`}
        fill="white"
      />
    ) : null,
};
