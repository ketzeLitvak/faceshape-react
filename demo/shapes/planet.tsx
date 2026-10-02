import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function planetFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'planet');
  const radius = 25 + random() * 9;
  const ringWidth = 40 + random() * 7;
  const ringHeight = 10 + random() * 7;
  const tilt = -35 + random() * 70;
  const thickness = 4 + random() * 4;
  const stripes = 1 + Math.floor(random() * 3);
  const bands = Array.from(
    { length: stripes },
    (_, index) => 50 - radius + 5 + index * 3,
  );
  return {
    faceBox: centeredFaceBox(radius * 1.3, radius * 1.25),
    render: ({ color }) => (
      <g data-faceshape-planet="">
        <ellipse
          cx={50}
          cy={50}
          rx={ringWidth}
          ry={ringHeight}
          transform={`rotate(${tilt} 50 50)`}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          opacity={0.6}
        />
        <circle cx={50} cy={50} r={radius} fill={color} />
        {bands.map((y) => (
          <path
            key={y}
            d={`M${50 - radius * 0.55} ${y} Q50 ${y + 4} ${50 + radius * 0.55} ${y}`}
            fill="none"
            stroke="white"
            strokeWidth={1.5}
            opacity={0.3}
          />
        ))}
      </g>
    ),
  };
}

export const planet: CustomShape = {
  ...planetFromName('default'),
  fromName: planetFromName,
};
