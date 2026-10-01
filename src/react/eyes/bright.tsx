import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const brightEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: { rx: 6.5, ry: 14, whites: false, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
