import { ArcEye } from './ArcEye';
import type { EyeStrategy } from './types';

export const closedEyes: EyeStrategy = {
  render: (props) => <ArcEye {...props} halfWidth={8} curveHeight={7} />,
  dimensions: { rx: 6.5, ry: 13, whites: false, highlight: true },
  isClosed: (openness) => openness <= 1.05,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
