import { BROW_STRATEGIES } from './eyebrows/registry';
import { EYE_STRATEGIES } from './eyes/registry';
import { useFace } from './FaceContext';
import type { EyebrowVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';

export function Eyebrows({ variant }: { variant: EyebrowVariant }) {
  const { geometry, color, eyeVariant, look } = useFace();
  const gaze = getFaceGaze(eyeVariant, look, geometry.eyeOpen);
  const { angle, lift, opacity } = BROW_STRATEGIES[variant](geometry);

  return (
    <g
      transform={gaze.eyebrows}
      data-faceshape-eyebrows=""
      opacity={opacity}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    >
      {[-1, 1].map((side) => {
        const x = 50 + side * geometry.eyeSpacing;
        const y = EYE_STRATEGIES[eyeVariant].browBaseline + lift;
        return (
          <path
            key={side}
            d={`M${x - 8} ${y} Q${x} ${y - 3} ${x + 8} ${y}`}
            transform={`rotate(${-side * angle} ${x} ${y})`}
          />
        );
      })}
    </g>
  );
}
