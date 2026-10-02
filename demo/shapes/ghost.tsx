import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';
import { ghostProfiles } from './ghostHems';

function ghostFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'ghost');
  const width = 52 + random() * 22;
  const top = 8 + random() * 10;
  const bottom = 75 + random() * 9;
  const profile = ghostProfiles[Math.floor(random() * ghostProfiles.length)];
  const lean = -6 + random() * 12;
  const shoulder = top + 30 + random() * 5;
  const left = 50 - width / 2;
  const right = 50 + width / 2;
  const lowerLeft = 50 - (width * profile.flare) / 2;
  const lowerRight = 50 + (width * profile.flare) / 2;
  const depth = 5 + random() * 6;
  const hem = profile.hem({
    left: lowerLeft,
    right: lowerRight,
    bottom,
    depth,
    lobes: 3 + Math.floor(random() * 3),
  });
  const path = `M${lowerLeft} ${bottom} C${left + lean} ${bottom - 16} ${left + lean} ${shoulder + 12} ${left + lean} ${shoulder} C${left + lean} ${top} ${right + lean} ${top} ${right + lean} ${shoulder} C${right + lean} ${shoulder + 12} ${right - lean} ${bottom - 16} ${lowerRight} ${bottom} ${hem}Z`;
  return {
    faceBox: centeredFaceBox(
      width * 0.58,
      (bottom - top) * 0.45,
      50 + lean * 0.5,
      (top + bottom) / 2,
    ),
    render: ({ color }) => (
      <path
        data-faceshape-ghost=""
        data-ghost-kind={profile.kind}
        d={path}
        fill={color}
      />
    ),
  };
}

export const ghost: CustomShape = {
  ...ghostFromName('default'),
  fromName: ghostFromName,
};
