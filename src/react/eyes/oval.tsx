import { defaultDimensions } from './defaultDimensions';
import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const ovalEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: (style) => ({ ...defaultDimensions(style), rx: 7.5 }),
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
