import type { EyeStrategy } from './types';

export const noneEyes: EyeStrategy = {
  hidden: true,
  render: () => null,
  dimensions: { rx: 0, ry: 0, whites: false, highlight: false },
  isClosed: () => true,
  gazeDistance: 0,
  browBaseline: 16,
  idleGlance: false,
};
