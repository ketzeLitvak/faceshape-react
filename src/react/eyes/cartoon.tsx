import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const cartoonEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: () => ({ rx: 12, ry: 15, whites: true, highlight: true }),
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
