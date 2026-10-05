import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { centeredFaceBox } from './faceBox';

function dropFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'drop');
  const sx = 0.7 + random() * 0.28;
  const sy = 0.72 + random() * 0.25;
  const bend = -6 + random() * 12;
  return {
    path: `M${50 + bend} 7 C${65 + bend} 28 86 47 86 64 C86 99 14 99 14 64 C14 47 ${35 + bend} 28 ${50 + bend} 7Z`,
    transform: `translate(50 50) scale(${sx} ${sy}) translate(-50 -50)`,
    faceBox: centeredFaceBox(45 * sx, 34 * sy, 50, 50 + 12 * sy),
  };
}

export const drop: CustomShape = /* @__PURE__ */ createNamedShape(dropFromName);
