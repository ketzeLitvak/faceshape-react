import { type CustomShape, createNameRandom } from '../../../src';
import { centeredFaceBox } from '../faceBox';

export function notebookFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-notebook');
  const width = 66 + random() * 16;
  const height = 44 + random() * 10;
  const left = 50 - width / 2;
  const top = 14 + random() * 5;
  const bottom = top + height;
  const screen = { x: left + 5, y: top + 5, width: width - 10, height: height - 11 };
  return {
    faceBox: centeredFaceBox(
      screen.width * 0.76,
      screen.height * 0.76,
      50,
      screen.y + screen.height / 2,
    ),
    render: ({ color }) => (
      <g>
        <rect x={left} y={top} width={width} height={height} rx={5} fill={color} />
        <rect {...screen} rx={2} fill="#f5f0e5" />
        <circle cx={50} cy={top + 2.5} r={0.8} fill="#182b35" />
        <path
          d={`M${left} ${bottom - 1} H${left + width} L96 88 Q96 92 91 92 H9 Q4 92 4 88Z`}
          fill={color}
        />
        <path
          d={`M${left + 4} ${bottom + 4} H${left + width - 4} L84 82 H16Z`}
          fill="white"
          opacity={0.25}
        />
        <rect x={39} y={84} width={22} height={4} rx={1.5} fill="#182b35" opacity={0.2} />
      </g>
    ),
  };
}
