import { useFace } from './FaceContext';
import type { EyebrowVariant } from './types';
export function Eyebrows({ variant }: {
  variant?: EyebrowVariant;
}) {
  const { geometry: g, color } = useFace();
  let angle = g.browAngle, lift = g.browLift, opacity = g.browOpacity;
  if (variant === 'none')
    opacity = 0;
  if (variant === 'raised') {
    opacity = 1;
    lift = -5;
    angle = 0;
  }
  if (variant === 'angry') {
    opacity = 1;
    angle = 20;
  }
  if (variant === 'sad') {
    opacity = 1;
    angle = -15;
  }
  if (variant === 'soft') {
    opacity = 1;
    angle = 0;
  }
  return <g data-faceshape-eyebrows="" opacity={opacity} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">{[-1, 1].map(side => { const x = 50 + side * g.eyeSpacing, y = 16 + lift; return <path key={side} d={`M${x - 8} ${y} Q${x} ${y - 3} ${x + 8} ${y}`} transform={`rotate(${-side * angle} ${x} ${y})`} />; })}
  </g>;
}
