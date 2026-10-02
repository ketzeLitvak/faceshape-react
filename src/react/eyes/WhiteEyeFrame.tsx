import type { ReactNode } from 'react';
import type { EyeRenderProps } from './types';

export function WhiteEyeFrame({
  face: { geometry, blink, look, color },
  x,
  angle,
  index,
  id,
  dimensions,
  pupil,
  lashes = false,
  softLids = false,
}: EyeRenderProps & { pupil: ReactNode; lashes?: boolean; softLids?: boolean }) {
  const open = Math.min(1.4, geometry.eyeOpen) * blink;
  const { rx, ry } = dimensions;
  const clip = `fs-eye-${id}-${index}`;
  if (open < 0.065) {
    return (
      <g transform={`rotate(${angle} ${x} 36)`}>
        <path
          d={`M${x - rx} 36 Q${x} ${36 + geometry.eyeCurve * 5} ${x + rx} 36`}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {lashes && (
          <path
            d={`M${x - rx} 36 l-3 -3 M${x + rx} 36 l3 -3`}
            stroke={color}
            strokeWidth={2.3}
            strokeLinecap="round"
          />
        )}
      </g>
    );
  }
  const height = ry * open;
  const lid = softLids ? 0.45 + Math.max(0, -geometry.eyeCurve) * 0.22 : 1;
  const top = 36 - height * lid;
  const path = `M${x - rx} 36 C${x - rx} ${top} ${x + rx} ${top} ${x + rx} 36 C${x + rx} ${36 + height * 1.33} ${x - rx} ${36 + height * 1.33} ${x - rx} 36Z`;
  return (
    <g data-eye-frame="" transform={`rotate(${angle} ${x} 36)`}>
      <defs>
        <clipPath id={clip}>
          {softLids ? <path d={path} /> : <ellipse cx={x} cy={36} rx={rx} ry={height} />}
        </clipPath>
      </defs>
      {softLids ? (
        <path d={path} fill="white" />
      ) : (
        <ellipse cx={x} cy={36} rx={rx} ry={height} fill="white" />
      )}
      <g clipPath={`url(#${clip})`}>
        <g
          data-eye-pupil=""
          transform={`translate(${x + look.x * 3} ${36 + look.y * 3})`}
          fill={color}
        >
          {pupil}
        </g>
      </g>
      {lashes && (
        <path
          d={`M${x - rx * 0.85} ${36 - height * 0.5} l-4 -4 M${x + rx * 0.85} ${36 - height * 0.5} l4 -4 M${x - rx} ${36 - height * 0.12} l-4 -2 M${x + rx} ${36 - height * 0.12} l4 -2`}
          fill="none"
          stroke={color}
          strokeWidth={2.3}
          strokeLinecap="round"
        />
      )}
      {softLids && (
        <path
          d={`M${x - rx} 36 C${x - rx} ${top} ${x + rx} ${top} ${x + rx} 36`}
          fill="none"
          stroke={color}
          strokeWidth={1.4}
          opacity={0.5}
        />
      )}
    </g>
  );
}
