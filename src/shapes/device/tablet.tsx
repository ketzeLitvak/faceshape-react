import { createNameRandom } from '../../core/index';
import type { CustomShape } from '../../react/types';
import { centeredFaceBox } from '../faceBox';

export function tabletFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-tablet');
  const landscape = random() > 0.5;
  const long = 76 + random() * 12;
  const short = 56 + random() * 10;
  const width = landscape ? long : short;
  const height = landscape ? short : long;
  const left = 50 - width / 2;
  const top = 50 - height / 2;
  return {
    faceBox: centeredFaceBox((width - 12) * 0.75, (height - 12) * 0.68),
    render: ({ color }) => (
      <g>
        <rect x={left} y={top} width={width} height={height} rx={8} fill={color} />
        <rect
          x={left + 5}
          y={top + 5}
          width={width - 10}
          height={height - 10}
          rx={4}
          fill="#f5f0e5"
        />
        <circle cx={50} cy={top + 2.5} r={1} fill="#182b35" opacity={0.6} />
      </g>
    ),
  };
}
