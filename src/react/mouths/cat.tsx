import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const catMouth: MouthStrategy = {
  widthScale: 0.8,
  isClosed: (geometry) => (geometry.mouthCurve ?? 0) > 0,
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
        cheeks: true,
      };
    }
    const path = `M${left} 68 Q${50 - quarter} ${68 + curve - depth} 50 68 Q${50 + quarter} ${68 + curve - depth} ${right} 68 Q${50 + quarter} ${68 + curve + depth} 50 ${68 + depth} Q${50 - quarter} ${68 + curve + depth} ${left} 68Z`;
    return { ...standardShape(geometry), path };
  },
};
