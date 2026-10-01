import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const capsuleEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: { rx: 6, ry: 15, whites: false, highlight: false },
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: true,
  browBaseline: 16,
};
