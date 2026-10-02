import { relaxedMouth } from './relaxed';
import { SharkTeeth } from './SharkTeeth';
import { openSmileShape } from './shared';
import type { MouthStrategy } from './types';

export const sharkMouth: MouthStrategy = {
  resolveGeometry: relaxedMouth({ mouthOpen: 0.48, mouthCurve: 0.15, widthScale: 0.95 }),
  widthScale: 1.1,
  shape: openSmileShape,
  decoration: (geometry) => <SharkTeeth geometry={geometry} />,
};
