import type { BrowStrategy } from './types';

export const angryBrows: BrowStrategy = (geometry) => ({
  angle: 20,
  lift: geometry.browLift,
  opacity: 1,
});
