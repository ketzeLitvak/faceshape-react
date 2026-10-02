import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function robotFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'robot');
  const width = 58 + random() * 20;
  const height = 44 + random() * 18;
  const radius = 6 + random() * 12;
  const left = 50 - width / 2;
  const top = 54 - height / 2;
  const antennaCount = Math.floor(random() * 3);
  const squareTips = random() > 0.5;
  const antennaX = 40 + random() * 20;
  const antenna = 9 + random() * 10;
  const ear = 4 + random() * 6;
  const bolts = random() > 0.5;
  const sideModules = random() > 0.25;
  const antennas = Array.from({ length: antennaCount }, (_, index) =>
    antennaCount === 1 ? antennaX : 42 + index * 16,
  );
  return {
    faceBox: centeredFaceBox(width * 0.64, height * 0.72, 50, 54),
    render: ({ color }) => (
      <g data-faceshape-robot="" fill={color}>
        {antennas.map((x) => (
          <g key={x} data-robot-antenna="">
            <path d={`M${x} ${top} V${top - antenna}`} stroke={color} strokeWidth={3} />
            {squareTips ? (
              <rect x={x - 3.5} y={top - antenna - 3.5} width={7} height={7} rx={1.5} />
            ) : (
              <circle cx={x} cy={top - antenna} r={4 + radius * 0.08} />
            )}
          </g>
        ))}
        {sideModules && (
          <g data-robot-side-modules="">
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
          </g>
        )}
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
