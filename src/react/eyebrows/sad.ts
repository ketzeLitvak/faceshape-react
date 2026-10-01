import type { BrowStrategy } from './types';

export const sadBrows: BrowStrategy = (geometry) => ({
  angle: -15,
  lift: geometry.browLift,
  opacity: 1,
});
