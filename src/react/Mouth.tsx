import { useId } from 'react';
import { useFace } from './FaceContext';
import { FACE_PRESETS } from './facePresets';
import { MOUTH_STRATEGIES } from './mouths/registry';
import type { MouthVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';
import { resolveMouthGeometry } from './utils/mouthGeometry';

export function Mouth({ variant }: { variant?: MouthVariant }) {
  const { geometry, talk, color, faceStyle, eyeVariant, look } = useFace();
  const gaze = getFaceGaze(eyeVariant, faceStyle, look, geometry.eyeOpen);
  const mouthId = `fs-mouth-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const styleVariant = variant ?? FACE_PRESETS[faceStyle].mouth;
  const strategy = MOUTH_STRATEGIES[styleVariant];
  const mouthGeometry = resolveMouthGeometry(geometry, strategy.widthScale, talk);
  const { path, bottom, tongueHeight } = strategy.shape(mouthGeometry);
  const opened = mouthGeometry.mouthOpen > 0.015;

  return (
    <g
      transform={gaze.mouth}
      data-faceshape-mouth=""
      data-mouth-variant={styleVariant}
      data-face-style={faceStyle}
    >
      <defs>
        <clipPath id={mouthId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path
        d={path}
        fill={opened ? color : 'none'}
        stroke={color}
        strokeWidth={faceStyle === 'soft' ? 2.8 : 3.4}
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
