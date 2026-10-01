import { ArcEye } from './ArcEye';
import { defaultDimensions } from './defaultDimensions';
import type { EyeStrategy } from './types';

export const closedEyes: EyeStrategy = {
  render: (props) => <ArcEye {...props} halfWidth={8} curveHeight={7} />,
  dimensions: defaultDimensions,
  isClosed: (openness) => openness <= 1.05,
  gazeDistance: 3,
  cheeks: false,
  idleGlance: false,
  browBaseline: 16,
};
