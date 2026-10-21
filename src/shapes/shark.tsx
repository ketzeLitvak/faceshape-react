import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { classic } from './shark/classic';
import { sharkProfiles } from './shark/profiles';
import { scaledFaceBox, shapeVariation } from './variation';

function sharkFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'shark-profile');
  const profile = sharkProfiles[Math.floor(random() * sharkProfiles.length)];
  const { width, height } = shapeVariation(name, 'shark');
  return {
    faceBox: scaledFaceBox(profile.faceBox, width, height),
    render: ({ color }) => (
      <g transform={`translate(50 50) scale(${width} ${height}) translate(-50 -50)`}>
        {profile.render?.({ color })}
      </g>
    ),
  };
}
export const shark: CustomShape = /* @__PURE__ */ createNamedShape(
  sharkFromName,
  classic,
);
