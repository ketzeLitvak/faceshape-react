import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const dotsEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: { rx: 5.5, ry: 8, whites: false, highlight: false },
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
