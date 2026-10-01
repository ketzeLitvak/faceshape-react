import type { MouthStrategy } from './types';

export const standardMouth: MouthStrategy = {
  widthScale: 1,
  lineOnly: true,
  shape: (geometry) => ({
    path: `M${50 - geometry.mouthWidth / 2} 68 Q50 ${68 + geometry.mouthCurve * 13} ${50 + geometry.mouthWidth / 2} 68`,
    bottom: 68,
    tongueHeight: 0,
  }),
};
