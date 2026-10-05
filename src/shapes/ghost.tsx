import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { classic } from './ghost/classic';
import { drips } from './ghost/drips';
import { sheet } from './ghost/sheet';
import { tail } from './ghost/tail';
import { wide } from './ghost/wide';

const profiles = [classic, wide, tail, sheet, drips];

function ghostFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'ghost');
  const profile = profiles[Math.floor(random() * profiles.length)];
  const scaleX = 0.87 + random() * 0.1;
  const scaleY = 0.87 + random() * 0.1;
  const box = profile.faceBox;
  return {
    faceBox: {
      x: 0.5 + (box.x - 0.5) * scaleX,
      y: 0.5 + (box.y - 0.5) * scaleY,
      width: box.width * scaleX,
      height: box.height * scaleY,
    },
    render: ({ color }) => (
      <path
        data-faceshape-ghost=""
        data-ghost-kind={profile.kind}
        d={profile.path}
        transform={`translate(50 50) scale(${scaleX} ${scaleY}) translate(-50 -50)`}
        fill={color}
      />
    ),
  };
}

export const ghost: CustomShape = /* @__PURE__ */ createNamedShape(ghostFromName);
