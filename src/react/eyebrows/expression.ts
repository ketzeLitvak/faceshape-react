import type { BrowStrategy } from './types';

export const expressionBrows: BrowStrategy = (geometry) => ({
  angle: geometry.browAngle,
  lift: geometry.browLift,
  opacity: geometry.browOpacity,
});
