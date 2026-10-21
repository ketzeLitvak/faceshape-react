import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { angelfish } from './fish/angelfish';
import { betta } from './fish/betta';
import { clownfish } from './fish/clownfish';
import { goldfish } from './fish/goldfish';
import { pufferfish } from './fish/pufferfish';
import { baby } from './shark/baby';
import { classic } from './shark/classic';
import { hammerhead } from './shark/hammerhead';
import { rounded } from './shark/rounded';
import { scaledFaceBox, shapeVariation } from './variation';

const profiles = [
  classic,
  rounded,
  hammerhead,
  baby,
  clownfish,
  pufferfish,
  angelfish,
  goldfish,
  betta,
];

function fishFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'fish-profile');
  const profile = profiles[Math.floor(random() * profiles.length)];
  const { width, height } = shapeVariation(name, 'fish');
  return {
    faceBox: scaledFaceBox(profile.faceBox, width, height),
    render: ({ color }) => (
      <g
        data-faceshape-fish=""
        transform={`translate(50 50) scale(${width} ${height}) translate(-50 -50)`}
      >
        {profile.render?.({ color })}
      </g>
    ),
  };
}

export const fish: CustomShape = /* @__PURE__ */ createNamedShape(fishFromName);
