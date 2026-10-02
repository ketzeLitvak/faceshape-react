import type { EyeRenderProps, EyeStrategy } from './types';
import { WhiteEyeFrame } from './WhiteEyeFrame';

function HeartEye(props: EyeRenderProps) {
  const scale = props.face.geometry.pupilSize / 4.2;
  return (
    <WhiteEyeFrame
      {...props}
      pupil={
        <path
          transform={`scale(${scale})`}
          d="M0 6 C-2 4 -7 1 -7 -3 C-7 -7 -2 -8 0 -4 C2 -8 7 -7 7 -3 C7 1 2 4 0 6Z"
        />
      }
    />
  );
}

export const heartEyes: EyeStrategy = {
  render: HeartEye,
  dimensions: { rx: 11, ry: 15, whites: true, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  browBaseline: 16,
  idleGlance: false,
};
