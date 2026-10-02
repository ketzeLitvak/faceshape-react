import type { EyeRenderProps, EyeStrategy } from './types';
import { WhiteEyeFrame } from './WhiteEyeFrame';

function CyclopsEye(props: EyeRenderProps) {
  return (
    <WhiteEyeFrame
      {...props}
      pupil={
        <>
          <circle r={props.face.geometry.pupilSize * 1.9} />
          <circle cx={-2} cy={-3} r={1.6} fill="white" />
        </>
      }
    />
  );
}

export const cyclopsEyes: EyeStrategy = {
  anchors: (geometry) => [{ x: 50, angle: geometry.eyeAngle, side: 0 }],
  render: CyclopsEye,
  dimensions: { rx: 17, ry: 19, whites: true, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  browBaseline: 11,
  idleGlance: false,
};
