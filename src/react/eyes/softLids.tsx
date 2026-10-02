import type { EyeRenderProps, EyeStrategy } from './types';
import { WhiteEyeFrame } from './WhiteEyeFrame';

function SoftLidEye(props: EyeRenderProps) {
  return (
    <WhiteEyeFrame
      {...props}
      softLids
      pupil={
        <>
          <circle r={props.face.geometry.pupilSize * 1.3} />
          <circle cx={-1.5} cy={-2} r={1.2} fill="white" />
        </>
      }
    />
  );
}

export const softLidsEyes: EyeStrategy = {
  render: SoftLidEye,
  dimensions: { rx: 11, ry: 15, whites: true, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  browBaseline: 16,
  idleGlance: false,
};
