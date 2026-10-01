import { EllipseEye } from './EllipseEye';
import type { EyeStrategy } from './types';

export const ovalEyes: EyeStrategy = {
  render: EllipseEye,
  dimensions: { rx: 7.5, ry: 13, whites: false, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
