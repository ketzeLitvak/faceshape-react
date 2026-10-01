import { defaultDimensions } from './defaultDimensions';
import { SlyEye } from './SlyEye';
import type { EyeStrategy } from './types';

export const slyEyes: EyeStrategy = {
  render: SlyEye,
  dimensions: (style) => ({ ...defaultDimensions(style), whites: false }),
  isClosed: () => false,
  gazeDistance: 1.8,
  cheeks: false,
  idleGlance: false,
  restingBrows: 'soft',
  browBaseline: 28,
};
