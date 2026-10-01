import type { EyeRenderProps } from './types';

export function EllipseEye({
  face: { geometry, blink, look, color },
  x,
  angle,
  index,
  id,
  dimensions: eye,
  gaze,
}: EyeRenderProps) {
  const open = geometry.eyeOpen * blink;
  const { rx, ry } = eye;

  if (open < 0.065) {
    return (
      <g data-eye-gaze="" transform={`${gaze} rotate(${angle} ${x} 36)`}>
        <path
          d={`M${x - 8} 36 Q${x} ${36 + geometry.eyeCurve * 6} ${x + 8} 36`}
          fill="none"
          stroke={color}
          strokeWidth={3.6}
          strokeLinecap="round"
        />
      </g>
    );
  }

  if (!eye.whites) {
    return (
      <g data-eye-gaze="" transform={`${gaze} rotate(${angle} ${x} 36)`}>
        <g data-eye-lid="" transform={`translate(${x} 36) scale(1 ${open})`}>
          <ellipse cx={0} cy={0} rx={rx} ry={ry} />
          {eye.highlight && (
            <ellipse
              data-eye-highlight=""
              cx={-1.4}
              cy={-ry * 0.42}
              rx={1.65}
              ry={1.65}
              fill="white"
              opacity={Math.min(1, open * 3)}
            />
          )}
        </g>
      </g>
    );
  }

  const clip = `fs-eye-${id}-${index}`;

  return (
    <g transform={`rotate(${angle} ${x} 36)`}>
      <defs>
        <clipPath id={clip}>
          <ellipse cx={x} cy={36} rx={rx} ry={ry * open} />
        </clipPath>
      </defs>
      <ellipse cx={x} cy={36} rx={rx} ry={ry * open} fill="white" />
      <g clipPath={`url(#${clip})`}>
        <circle cx={x + look.x * 3} cy={36 + look.y * 3} r={geometry.pupilSize * 1.85} />
        <circle cx={x + look.x * 3 - 1.4} cy={32.4 + look.y * 3} r={2} fill="white" />
      </g>
    </g>
  );
}
