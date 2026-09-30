import { getFaceGaze } from './utils/faceGaze';
import { getEyeDimensions, getSlyEyePaths } from './utils/eyeGeometry';
import { useId } from 'react';
import { FACE_PRESETS } from './facePresets';
import { useFace } from './FaceContext';
import type { EyeVariant } from './types';
export function Eyes({ variant }: {
  variant?: EyeVariant;
}) {
  const { geometry: g, blink, look, color, faceStyle } = useFace();
  variant ??= FACE_PRESETS[faceStyle].eyes;
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const eye = getEyeDimensions(variant, faceStyle);
  const gaze = getFaceGaze(variant, faceStyle, look, g.eyeOpen);
  const open = g.eyeOpen * blink, { rx, ry } = eye;
  const closed = variant === 'closed' || variant === 'happy' || variant === 'joyful';
  return <g data-faceshape-eyes="" data-eye-variant={variant} data-face-style={faceStyle} fill={color}>{[-1, 1].map((side, index) => {
    const x = 50 + side * g.eyeSpacing, angle = -side * g.eyeAngle;
    if (closed && g.eyeOpen <= 1.05)
      return <path key={side} d={`M${x - (variant === 'closed' ? 8 : 10) * (.5 + g.eyeOpen * .5)} 36 Q${x} ${36 - g.eyeCurve * (variant === 'closed' ? 7 : 13)} ${x + (variant === 'closed' ? 8 : 10) * (.5 + g.eyeOpen * .5)} 36`} fill="none" stroke={color} strokeWidth={3.6} strokeLinecap="round" transform={`rotate(${angle} ${x} 36) scale(1 1)`} />;
    if (variant === 'sly') {
      const paths = getSlyEyePaths(x, open, blink);
      return <g key={side} data-eye-gaze="" transform={`${gaze.eyes} rotate(${angle} ${x} 36)`}>
        <path d={paths.eye} />
        <path d={paths.lid} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      </g>;
    }
    if (open < .065)
      return <g key={side} data-eye-gaze="" transform={`${gaze.eyes} rotate(${angle} ${x} 36)`}>
        <path d={`M${x - 8} 36 Q${x} ${36 + g.eyeCurve * 6} ${x + 8} 36`} fill="none" stroke={color} strokeWidth={3.6} strokeLinecap="round" />
      </g>;
    if (!eye.whites)
      return <g key={side} data-eye-gaze="" transform={`${gaze.eyes} rotate(${angle} ${x} 36)`}>
        <g data-eye-lid="" transform={`translate(${x} 36) scale(1 ${open})`}>
          <ellipse cx={0} cy={0} rx={rx} ry={ry} />
          {eye.highlight && <ellipse data-eye-highlight="" cx={-1.4} cy={-ry * .42} rx={1.65} ry={1.65} fill="white" opacity={Math.min(1, open * 3)} />}
        </g>
      </g>;
    const clip = `fs-eye-${id}-${index}`;
    return <g key={side} transform={`rotate(${angle} ${x} 36)`}>
      <defs>
        <clipPath id={clip}>
          <ellipse cx={x} cy={36} rx={rx} ry={ry * open} />
        </clipPath>
      </defs>
      <ellipse cx={x} cy={36} rx={rx} ry={ry * open} fill="white" />
      <g clipPath={`url(#${clip})`}>
        <circle cx={x + look.x * 3} cy={36 + look.y * 3} r={g.pupilSize * 1.85} />
        <circle cx={x + look.x * 3 - 1.4} cy={32.4 + look.y * 3} r={2} fill="white" />
      </g>
    </g>;
  })}
  </g>;
}
