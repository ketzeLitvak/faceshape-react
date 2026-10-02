import { relaxedMouth } from './relaxed';
import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const joyfulMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0.28, mouthCurve: 0.35, widthScale: 1.15 }),
  widthScale: 1.15,
  shape: (geometry) => ({
    ...standardShape(geometry),
    path:
      geometry.mouthCurve > 0 && geometry.mouthOpen <= 0.015
        ? `M${50 - geometry.mouthWidth / 2} 64 Q50 ${64 + geometry.mouthCurve * 28} ${50 + geometry.mouthWidth / 2} 64`
        : standardShape(geometry).path,
  }),
};
