import type { EyeRenderProps, EyeStrategy } from './types';

function SpiralEye({ face: { geometry, blink, color }, x, angle, gaze }: EyeRenderProps) {
  const open = geometry.eyeOpen * blink;
  if (open < 0.065) {
    return (
      <path
        d={`M${x - 9} 36 Q${x} ${36 + geometry.eyeCurve * 5} ${x + 9} 36`}
        transform={`${gaze} rotate(${angle} ${x} 36)`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  }
  const radius = 10 + geometry.eyeCurve;
  const points = Array.from({ length: 65 }, (_, index) => {
    const t = index / 64;
    const a = t * Math.PI * 4.4;
    const r = 1 + t * radius;
    return `${index === 0 ? 'M' : 'L'}${Math.cos(a) * r} ${Math.sin(a) * r}`;
  }).join(' ');
  return (
    <g transform={`${gaze} rotate(${angle} ${x} 36)`}>
      <path
        data-eye-spiral=""
        d={points}
        transform={`translate(${x} 36) scale(1 ${open})`}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export const spiralEyes: EyeStrategy = {
  render: SpiralEye,
  dimensions: { rx: 11, ry: 12, whites: false, highlight: false },
  isClosed: () => false,
  gazeDistance: 2,
  browBaseline: 19,
  idleGlance: false,
};
