import { relaxation, relaxedMouth } from './relaxed';
import { standardShape } from './shared';
import type { MouthStrategy } from './types';

export const gentleMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0, mouthCurve: 0.22, widthScale: 1 }),
  widthScale: 0.7,
  isClosed: (geometry) => relaxation(geometry) > 0.99,
  shape: standardShape,
};
