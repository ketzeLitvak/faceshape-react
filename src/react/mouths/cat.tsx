import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const catMouth: MouthStrategy = {
  widthScale: 0.8,
  shape: (geometry) => {
    const left = 50 - geometry.mouthWidth / 2;
    const right = 50 + geometry.mouthWidth / 2;
    const curve = geometry.mouthCurve * 12;
    const depth = geometry.mouthOpen * 16;
    const quarter = geometry.mouthWidth / 4;
    const path = `M${left} 68 Q${50 - quarter} ${68 + curve - depth} 50 68 Q${50 + quarter} ${68 + curve - depth} ${right} 68 Q${50 + quarter} ${68 + curve + depth} 50 ${68 + depth} Q${50 - quarter} ${68 + curve + depth} ${left} 68Z`;
    return { ...standardShape(geometry), path };
  },
};
