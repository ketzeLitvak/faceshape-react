import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { centeredFaceBox } from './faceBox';

function cloudFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'cloud');
  const width = 66 + random() * 20;
  const height = 38 + random() * 12;
  const bottom = 69 + random() * 5;
  const left = 50 - width / 2;
  const right = 50 + width / 2;
  const top = bottom - height;
  const crown = 47 + random() * 6;
  const leftShoulder = top + height * (0.32 + random() * 0.12);
  const rightShoulder = top + height * (0.35 + random() * 0.12);
  const sideY = bottom - height * 0.38;
  // One continuous outline keeps the puffs connected and the underside calm.
  const path = [
    `M${left + width * 0.17} ${bottom}`,
    `C${left - width * 0.07} ${bottom} ${left - width * 0.07} ${sideY} ${left + width * 0.13} ${sideY}`,
    `C${left + width * 0.1} ${leftShoulder - height * 0.18} ${left + width * 0.3} ${leftShoulder - height * 0.2} ${left + width * 0.34} ${leftShoulder}`,
    `C${crown - width * 0.17} ${top - height * 0.13} ${crown + width * 0.18} ${top - height * 0.13} ${left + width * 0.68} ${rightShoulder}`,
    `C${right - width * 0.12} ${rightShoulder - height * 0.15} ${right - width * 0.07} ${sideY - height * 0.08} ${right - width * 0.11} ${sideY}`,
    `C${right + width * 0.08} ${sideY} ${right + width * 0.08} ${bottom} ${right - width * 0.15} ${bottom}`,
    'Z',
  ].join(' ');
  return {
    faceBox: centeredFaceBox(width * 0.55, height * 0.6, 50, bottom - height * 0.36),
    render: ({ color }) => <path data-faceshape-cloud="" d={path} fill={color} />,
  };
}

export const cloud: CustomShape = /* @__PURE__ */ createNamedShape(cloudFromName);
