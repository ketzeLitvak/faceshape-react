import { defaultDimensions } from './defaultDimensions';
import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const roundEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: defaultDimensions,
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
