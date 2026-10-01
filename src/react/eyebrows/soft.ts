import type { BrowStrategy } from './types';

export const softBrows: BrowStrategy = (geometry) => ({
  angle: 0,
  lift: geometry.browLift,
  opacity: 1,
});
