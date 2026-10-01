import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const kawaiiEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: () => ({ rx: 5, ry: 5.5, whites: false, highlight: false }),
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: true,
  idleGlance: false,
  browBaseline: 16,
};
