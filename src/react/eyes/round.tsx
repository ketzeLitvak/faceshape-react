import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const roundEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: { rx: 6.5, ry: 13, whites: false, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
