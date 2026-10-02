import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function flowerFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'flower');
  const count = 5 + Math.floor(random() * 5);
  const length = 16 + random() * 7;
  const width = 10 + random() * 8;
  const orbit = 19 + random() * 3;
  const phase = random() * 360;
  const center = 22 + random() * 3;
  const angles = Array.from(
    { length: count },
    (_, index) => phase + (index * 360) / count,
  );
  return {
    faceBox: centeredFaceBox(center * 1.4, center * 1.3),
    render: ({ color }) => (
      <g data-faceshape-flower="" fill={color}>
        {angles.map((angle) => (
          <ellipse
            key={angle}
            cx={50}
            cy={50 - orbit}
            rx={width}
            ry={length}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx={50} cy={50} r={center} />
      </g>
    ),
  };
}

export const flower: CustomShape = {
  ...flowerFromName('default'),
  fromName: flowerFromName,
};
