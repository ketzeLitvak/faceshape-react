import { SlyEye } from './SlyEye';
import type { EyeStrategy } from './types';

export const slyEyes: EyeStrategy = {
  render: SlyEye,
  dimensions: { rx: 6.5, ry: 13, whites: false, highlight: true },
  isClosed: () => false,
  gazeDistance: 1.8,
  idleGlance: false,
  browBaseline: 28,
};
