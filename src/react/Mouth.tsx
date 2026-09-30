import { getFaceGaze } from './utils/faceGaze';
import { SharkTeeth } from './SharkTeeth';
import { FACE_PRESETS } from './facePresets';
import { resolveMouthGeometry, stylizedMouthPath } from './utils/mouthGeometry';
import { useId } from 'react';
import { mouthPath } from '../core/geometry';
import { useFace } from './FaceContext';
import type { MouthVariant } from './types';
export function Mouth({ variant }: {
  variant?: MouthVariant;
}) {
  const { geometry, talk, color, faceStyle, eyeVariant, look } = useFace();
  const gaze = getFaceGaze(eyeVariant, faceStyle, look, geometry.eyeOpen);
  const mouthId = 'fs-mouth-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const styleVariant = variant ?? FACE_PRESETS[faceStyle].mouth;
  const g = resolveMouthGeometry(geometry, styleVariant, talk);
  const specialPath = stylizedMouthPath(g, styleVariant);
  const openSmile = (styleVariant === 'tongue' || styleVariant === 'toothy' || styleVariant === 'shark') && g.mouthCurve > 0 && g.mouthOpen > .015;
  const referencePath = openSmile ? `M${50 - g.mouthWidth / 2} 64 Q50 64 ${50 + g.mouthWidth / 2} 64 Q50 ${64 + g.mouthOpen * 44} ${50 - g.mouthWidth / 2} 64Z` : styleVariant === 'joyful' && g.mouthCurve > 0 && g.mouthOpen <= .015 ? `M${50 - g.mouthWidth / 2} 64 Q50 ${64 + g.mouthCurve * 28} ${50 + g.mouthWidth / 2} 64` : undefined;
  const path = referencePath ?? (specialPath ?? mouthPath(g)), opened = g.mouthOpen > .015;
  const curve = g.mouthCurve * 13, depth = g.mouthOpen * 14;
  const bottom = openSmile ? 64 + g.mouthOpen * 22 : 68 + (curve + depth) / 2;
  return <g transform={gaze.mouth} data-faceshape-mouth="" data-mouth-variant={styleVariant} data-face-style={faceStyle}>
    <defs>
      <clipPath id={mouthId}>
        <path d={path} />
      </clipPath>
    </defs>
    <path d={path} fill={opened ? color : 'none'} stroke={color} strokeWidth={faceStyle === 'soft' ? 2.8 : 3.4} strokeLinejoin="round" strokeLinecap="round" />
    {opened && <g clipPath={`url(#${mouthId})`}>
      <ellipse cx={50} cy={bottom - 1} rx={g.mouthWidth * .28} ry={Math.max(1, g.mouthOpen * (openSmile ? 5 : 4.2))} fill="#f18da3" />
      {styleVariant === 'shark' && <SharkTeeth width={g.mouthWidth} openness={g.mouthOpen} />}
      {styleVariant === 'toothy' && g.mouthOpen > .25 && <path d={`M${50 - g.mouthWidth * .36} 65 L${50 + g.mouthWidth * .36} 65 L${50 + g.mouthWidth * .25} 69 Q50 71 ${50 - g.mouthWidth * .25} 69Z`} fill="white" />}
    </g>}
  </g>;
}
