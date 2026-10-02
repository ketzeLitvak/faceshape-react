import type { EyeRenderProps, EyeStrategy } from './types';
import { WhiteEyeFrame } from './WhiteEyeFrame';

function StarEye(props: EyeRenderProps) {
  const radius = props.face.geometry.pupilSize * 1.7;
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? radius : radius * 0.45;
    return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
  }).join(' ');
  return <WhiteEyeFrame {...props} pupil={<polygon points={points} />} />;
}

export const starEyes: EyeStrategy = {
  render: StarEye,
  dimensions: { rx: 11, ry: 15, whites: true, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  browBaseline: 16,
  idleGlance: false,
};
