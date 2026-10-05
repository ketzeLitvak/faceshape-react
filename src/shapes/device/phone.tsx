import { createNameRandom } from '../../core/index';
import type { CustomShape } from '../../react/types';
import { centeredFaceBox } from '../faceBox';

export function phoneFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-phone');
  const width = 42 + random() * 12;
  const height = 74 + random() * 12;
  const left = 50 - width / 2;
  const top = 50 - height / 2;
  const radius = 7 + random() * 6;
  return {
    faceBox: centeredFaceBox((width - 10) * 0.82, (width - 10) * 0.82, 50, 50),
    render: ({ color }) => (
      <g>
        <rect x={left - 1.5} y={top + 19} width={3} height={10} rx={1} fill={color} />
        <rect x={left} y={top} width={width} height={height} rx={radius} fill={color} />
        <rect
          x={left + 4}
          y={top + 5}
          width={width - 8}
          height={height - 10}
          rx={radius - 2}
          fill="#f5f0e5"
        />
        <rect x={43} y={top + 4} width={14} height={4} rx={2} fill={color} />
        <rect
          x={44}
          y={top + height - 8}
          width={12}
          height={2}
          rx={1}
          fill="#182b35"
          opacity={0.4}
        />
      </g>
    ),
  };
}
