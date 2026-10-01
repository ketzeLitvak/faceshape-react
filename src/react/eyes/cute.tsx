import { defaultDimensions } from './defaultDimensions';
import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const cuteEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: (style) => ({ ...defaultDimensions(style), ry: 14 }),
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
