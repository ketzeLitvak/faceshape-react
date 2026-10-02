import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function robotFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'robot');
  const width = 58 + random() * 20;
  const height = 44 + random() * 18;
  const radius = 6 + random() * 12;
  const left = 50 - width / 2;
  const top = 54 - height / 2;
  const antennaX = 40 + random() * 20;
  const antenna = 9 + random() * 10;
  const ear = 4 + random() * 6;
  const bolts = random() > 0.5;
  return {
    faceBox: centeredFaceBox(width * 0.64, height * 0.72, 50, 54),
    render: ({ color }) => (
      <g data-faceshape-robot="" fill={color}>
        <path
          d={`M${antennaX} ${top} V${top - antenna}`}
          stroke={color}
          strokeWidth={3}
        />
        <circle cx={antennaX} cy={top - antenna} r={4 + radius * 0.08} />
        <rect
          x={left - ear}
          y={45}
          width={ear + 2}
          height={18}
          rx={ear * 0.4}
          opacity={0.75}
        />
        <rect
          x={left + width - 2}
          y={45}
          width={ear + 2}
          height={18}
          rx={ear * 0.4}
          opacity={0.75}
        />
        <rect x={left} y={top} width={width} height={height} rx={radius} />
        {bolts &&
          [left + 7, left + width - 7].map((x) => (
            <circle
              key={x}
              cx={x}
              cy={top + height - 6}
              r={2}
              fill="white"
              opacity={0.45}
            />
          ))}
      </g>
    ),
  };
}

export const robot: CustomShape = {
  ...robotFromName('default'),
  fromName: robotFromName,
};
