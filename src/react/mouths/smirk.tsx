import { relaxation, relaxedMouth } from './relaxed';
import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const smirkMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0, mouthCurve: 0.4, widthScale: 1 }),
  widthScale: 0.8,
  isClosed: (geometry) => relaxation(geometry) > 0.99,
  shape: (geometry) => {
    const left = 50 - geometry.mouthWidth / 2;
    const right = 50 + geometry.mouthWidth / 2;
    const curve = geometry.mouthCurve * 12;
    const depth = geometry.mouthOpen * 16;
    const corner = 68 - geometry.mouthCurve * 4;
    const path = `M${left} 68 Q50 ${68 + curve - depth} ${right} ${corner} Q50 ${68 + curve + depth} ${left} 68Z`;
    return { ...standardShape(geometry), path };
  },
};
