import { EllipseEye } from './EllipseEye';
import type { EyeRenderProps } from './types';

export function ArcEye(
  props: EyeRenderProps & { halfWidth: number; curveHeight: number },
) {
  const {
    face: { geometry, color },
    x,
    angle,
    halfWidth,
    curveHeight,
  } = props;

  if (geometry.eyeOpen > 1.05) {
    return <EllipseEye {...props} />;
  }
  const width = halfWidth * (0.5 + geometry.eyeOpen * 0.5);

  return (
    <path
      d={`M${x - width} 36 Q${x} ${36 - geometry.eyeCurve * curveHeight} ${x + width} 36`}
      fill="none"
      stroke={color}
      strokeWidth={3.6}
      strokeLinecap="round"
      transform={`rotate(${angle} ${x} 36) scale(1 1)`}
    />
  );
}
