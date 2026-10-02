import type { BrowStrategy } from './types';

export const noneBrows: BrowStrategy = (geometry) => ({
  angle: geometry.browAngle,
  lift: geometry.browLift,
  opacity: 0,
  hidden: true,
});
