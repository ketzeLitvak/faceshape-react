import { useId } from 'react';
import { useFace } from './FaceContext';
import { MOUTH_STRATEGIES } from './mouths/registry';
import type { MouthVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';
import { resolveMouthGeometry } from './utils/mouthGeometry';

export function Mouth({ variant }: { variant: MouthVariant }) {
  const { geometry, talk, color, eyeVariant, look } = useFace();
  const gaze = getFaceGaze(eyeVariant, look, geometry.eyeOpen);
  const mouthId = `fs-mouth-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const styleVariant = variant;
  const strategy = MOUTH_STRATEGIES[styleVariant];
  const mouthGeometry = resolveMouthGeometry(
    geometry,
    strategy.widthScale,
    strategy.lineOnly || strategy.supportsTalking === false ? 0 : talk,
  );
  const { path, bottom, tongueHeight, closed, cheeks } = strategy.shape(mouthGeometry);
  const opened =
    !closed &&
    !strategy.lineOnly &&
    !strategy.solidFill &&
    mouthGeometry.mouthOpen > 0.015;

  return (
    <g transform={gaze.mouth} data-faceshape-mouth="" data-mouth-variant={styleVariant}>
      {cheeks && (
        <g data-faceshape-mouth-cheeks="" fill="#f69bad">
          <ellipse cx={16} cy={57} rx={8} ry={4.5} />
          <ellipse cx={84} cy={57} rx={8} ry={4.5} />
        </g>
      )}
      <defs>
        <clipPath id={mouthId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path
        d={path}
        fill={strategy.solidFill ?? (opened ? color : 'none')}
        stroke={strategy.solidFill ?? color}
        strokeWidth={2.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {opened && (
        <g clipPath={`url(#${mouthId})`}>
          <ellipse
            cx={50}
            cy={bottom - 1}
            rx={mouthGeometry.mouthWidth * 0.28}
            ry={Math.max(1, tongueHeight)}
            fill="#f18da3"
          />
          {strategy.decoration?.(mouthGeometry)}
        </g>
      )}
    </g>
  );
}
