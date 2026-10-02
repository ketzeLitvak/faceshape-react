import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function ghostFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'ghost');
  const width = 54 + random() * 28;
  const top = 8 + random() * 12;
  const bottom = 78 + random() * 12;
  const left = 50 - width / 2;
  const right = 50 + width / 2;
  const waves = 3 + Math.floor(random() * 3);
  const depth = 4 + random() * 5;
  const step = width / waves;
  let hem = '';
  for (let index = 0; index < waves; index++) {
    const x = right - step * index;
    hem += ` Q${x - step * 0.25} ${bottom + depth} ${x - step * 0.5} ${bottom} Q${x - step * 0.75} ${bottom - depth} ${x - step} ${bottom}`;
  }
  return {
    path: `M${left} ${bottom} V${top + width / 2} C${left} ${top - 2} ${right} ${top - 2} ${right} ${top + width / 2} V${bottom}${hem}Z`,
    faceBox: centeredFaceBox(width * 0.66, (bottom - top) * 0.5, 50, (top + bottom) / 2),
  };
}

export const ghost: CustomShape = {
  ...ghostFromName('default'),
  fromName: ghostFromName,
};
