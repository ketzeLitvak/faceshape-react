import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function cloudFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'cloud');
  const width = 62 + random() * 24;
  const height = 38 + random() * 16;
  const count = 4 + Math.floor(random() * 4);
  const lobes = Array.from({ length: count }, (_, index) => ({
    x: 50 - width * 0.32 + (width * 0.64 * index) / (count - 1),
    y: 50 - random() * height * 0.28,
    rx: width * (0.16 + random() * 0.06),
    ry: height * (0.36 + random() * 0.12),
  }));
  return {
    faceBox: centeredFaceBox(width * 0.62, height * 0.64, 50, 54),
    render: ({ color }) => (
      <g data-faceshape-cloud="" fill={color}>
        <ellipse cx={50} cy={55} rx={width * 0.48} ry={height * 0.38} />
        {lobes.map((lobe) => (
          <ellipse key={lobe.x} cx={lobe.x} cy={lobe.y} rx={lobe.rx} ry={lobe.ry} />
        ))}
      </g>
    ),
  };
}

export const cloud: CustomShape = {
  ...cloudFromName('default'),
  fromName: cloudFromName,
};
