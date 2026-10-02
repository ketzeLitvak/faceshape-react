import { BROW_STRATEGIES } from './eyebrows/registry';
import { eyeAnchors } from './eyes/anchors';
import { EYE_STRATEGIES } from './eyes/registry';
import { useFace } from './FaceContext';
import type { EyebrowVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';

export function Eyebrows({ variant }: { variant: EyebrowVariant }) {
  const { geometry, color, eyeVariant, look } = useFace();
  const gaze = getFaceGaze(eyeVariant, look, geometry.eyeOpen);
  const { angle, lift, opacity, hidden } = BROW_STRATEGIES[variant](geometry);

  if (hidden) {
    return null;
  }

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
      {eyeAnchors(EYE_STRATEGIES[eyeVariant], geometry).map(({ x, side }) => {
        const y = EYE_STRATEGIES[eyeVariant].browBaseline + lift;
        return (
          <path
            key={side}
            d={`M${x - 8} ${y} Q${x} ${y - 3} ${x + 8} ${y}`}
            transform={`rotate(${-(side || 1) * angle} ${x} ${y})`}
          />
        );
      })}
    </g>
  );
}
