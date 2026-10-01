import { SharkTeeth } from './SharkTeeth';
import { openSmileShape } from './shared';
import type { MouthStrategy } from './types';

export const sharkMouth: MouthStrategy = {
  widthScale: 1.1,
  shape: openSmileShape,
  decoration: (geometry) => (
    <SharkTeeth width={geometry.mouthWidth} openness={geometry.mouthOpen} />
  ),
};
