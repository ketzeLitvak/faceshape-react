import { getSlyEyePaths } from '../utils/eyeGeometry';
import type { EyeRenderProps } from './types';

export function SlyEye({
  face: { geometry, blink, color },
  x,
  angle,
  gaze,
}: EyeRenderProps) {
  const paths = getSlyEyePaths(x, geometry.eyeOpen * blink, blink);

  return (
    <g data-eye-gaze="" transform={`${gaze} rotate(${angle} ${x} 36)`}>
      <path d={paths.eye} />
      <path
        d={paths.lid}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </g>
  );
}
