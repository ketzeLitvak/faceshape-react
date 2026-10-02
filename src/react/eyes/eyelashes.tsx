import type { EyeRenderProps, EyeStrategy } from './types';
import { WhiteEyeFrame } from './WhiteEyeFrame';

function EyelashEye(props: EyeRenderProps) {
  return (
    <WhiteEyeFrame
      {...props}
      lashes
      pupil={
        <>
          <ellipse rx={props.face.geometry.pupilSize * 1.1} ry={6.2} />
          <circle cx={-1.3} cy={-2} r={1.1} fill="white" />
        </>
      }
    />
  );
}

export const eyelashesEyes: EyeStrategy = {
  render: EyelashEye,
  dimensions: { rx: 11, ry: 15, whites: true, highlight: true },
  isClosed: () => false,
  gazeDistance: 3,
  browBaseline: 16,
  idleGlance: false,
};
