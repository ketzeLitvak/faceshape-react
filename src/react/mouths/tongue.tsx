import { relaxation, relaxedMouth } from './relaxed';
import { openSmileShape } from './shared';
import type { MouthStrategy } from './types';

export const tongueMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0.55, mouthCurve: 0, widthScale: 0.65 }),
  widthScale: 0.9,
  shape: (geometry) => {
    const amount = relaxation(geometry);
    const shape = openSmileShape(geometry);
    if (amount === 0) {
      return shape;
    }
    const left = 50 - geometry.mouthWidth / 2;
    const right = 50 + geometry.mouthWidth / 2;
    const inset = (geometry.mouthWidth / 3) * (1 - amount);
    const depth = geometry.mouthOpen * 14;
    const height = depth * (2 / 3 + (2 / 3) * amount);
    return {
      ...shape,
      path: `M${left} 68 C${left + inset} ${68 - height} ${right - inset} ${68 - height} ${right} 68 C${right - inset} ${68 + height} ${left + inset} ${68 + height} ${left} 68Z`,
      bottom: 68 + depth * (0.5 + 0.5 * amount),
    };
  },
};
