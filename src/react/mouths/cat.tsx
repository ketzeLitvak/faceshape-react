import { relaxation, relaxedMouth } from './relaxed';
import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const catMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0, mouthCurve: 0.22, widthScale: 1 }),
  widthScale: 0.8,
  isClosed: (geometry) => (geometry.mouthCurve ?? 0) > 0 || relaxation(geometry) > 0.99,
  shape: (geometry) => {
    const left = 50 - geometry.mouthWidth / 2;
    const right = 50 + geometry.mouthWidth / 2;
    const curve = geometry.mouthCurve * 12;
    const depth = geometry.mouthOpen * 16;
    const quarter = geometry.mouthWidth / 4;
    if (geometry.mouthCurve > 0) {
      return {
        ...standardShape(geometry),
        path: `M${left} 68 Q${50 - quarter} ${68 + curve} 50 68 Q${50 + quarter} ${68 + curve} ${right} 68`,
        closed: true,
        cheeks: geometry.eyeOpen > 0.35,
      };
    }
    const openness = geometry.mouthOpen;
    const top = 68 + curve - depth;
    const topCenter = 68 + (curve - depth) * openness;
    const leftControl = 50 - quarter - quarter * openness;
    const rightControl = 50 + quarter + quarter * openness;
    const bottom = 68 + depth;
    const path = `M${left} 68 Q${leftControl} ${top} 50 ${topCenter} Q${rightControl} ${top} ${right} 68 Q${rightControl} ${68 + curve + depth} 50 ${bottom} Q${leftControl} ${68 + curve + depth} ${left} 68Z`;
    return { ...standardShape(geometry), path, bottom };
  },
};
