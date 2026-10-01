import { ArcEye } from './ArcEye';
import type { EyeStrategy } from './types';

export const joyfulEyes: EyeStrategy = {
  render: (props) => <ArcEye {...props} halfWidth={10} curveHeight={13} />,
  dimensions: { rx: 6.5, ry: 13, whites: false, highlight: true },
  isClosed: (openness) => openness <= 1.05,
  gazeDistance: 3,
  idleGlance: false,
  browBaseline: 16,
};
