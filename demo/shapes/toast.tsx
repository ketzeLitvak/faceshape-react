import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function toastFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'toast');
  const width = 55 + random() * 24;
  const height = 58 + random() * 22;
  const left = 50 - width / 2;
  const right = 50 + width / 2;
  const top = 50 - height / 2;
  const bottom = 50 + height / 2;
  const crust = 4 + random() * 4;
  const crown = 7 + random() * 7;
  const bread = (inset: number) =>
    `M${left + inset} ${top + 20} C${left - crown + inset} ${top - 7 + inset} ${right + crown - inset} ${top - 7 + inset} ${right - inset} ${top + 20} V${bottom - 7 - inset} Q${right - inset} ${bottom - inset} ${right - 7 - inset} ${bottom - inset} H${left + 7 + inset} Q${left + inset} ${bottom - inset} ${left + inset} ${bottom - 7 - inset}Z`;
  return {
    faceBox: centeredFaceBox(width * 0.62, height * 0.5, 50, 54),
    render: ({ color }) => (
      <g data-faceshape-toast="">
        <path d={bread(0)} fill={color} />
        <path d={bread(crust)} fill="white" opacity={0.32} />
      </g>
    ),
  };
}

export const toast: CustomShape = {
  ...toastFromName('default'),
  fromName: toastFromName,
};
