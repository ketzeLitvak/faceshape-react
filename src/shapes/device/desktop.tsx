import { createNameRandom } from '../../core/index';
import type { CustomShape } from '../../react/types';

export function desktopFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-desktop');
  const width = 64 + random() * 22;
  const height = 49 + random() * 15;
  const left = 50 - width / 2;
  const top = 9 + random() * 5;
  const radius = 4 + random() * 8;
  const screen = { x: left + 6, y: top + 6, width: width - 12, height: height - 14 };
  return {
    faceBox: {
      x: (screen.x + screen.width * 0.1) / 100,
      y: (screen.y + screen.height * 0.08) / 100,
      width: (screen.width * 0.8) / 100,
      height: (screen.height * 0.8) / 100,
    },
    render: ({ color }) => (
      <g data-device-desktop="">
        <path d={`M44 ${top + height - 1} H56 L59 85 H41Z`} fill={color} />
        <rect x={left} y={top} width={width} height={height} rx={radius} fill={color} />
        <rect {...screen} rx={Math.max(2, radius - 3)} fill="#f5f0e5" />
        <circle cx={50} cy={top + height - 4} r={1.5} fill="#182b35" />
        <path d="M35 83 H65 Q70 83 70 89 H30 Q30 83 35 83Z" fill={color} />
        <rect x={17} y={92} width={66} height={5} rx={2.5} fill={color} />
        {[27, 37, 47, 57, 67].map((x) => (
          <path key={x} d={`M${x} 93 V96`} stroke="#182b35" opacity={0.3} />
        ))}
      </g>
    ),
  };
}
