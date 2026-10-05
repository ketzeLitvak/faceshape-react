import { createNameRandom, createPerspectivePlane, polygonPath } from '../../core/index';
import type { CustomShape } from '../../react/types';
import { centeredFaceBox } from '../faceBox';

export function notebookFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-notebook');
  const width = 66 + random() * 16;
  const height = 44 + random() * 10;
  const left = 50 - width / 2;
  const top = 14 + random() * 5;
  const bottom = top + height;
  const screen = { x: left + 5, y: top + 5, width: width - 10, height: height - 11 };
  const project = createPerspectivePlane(width, 92, bottom - 1, 88);
  const panel = (x: number, y: number, w: number, h: number) =>
    polygonPath([
      project(x, y),
      project(x + w, y),
      project(x + w, y + h),
      project(x, y + h),
    ]);
  const keys = Array.from({ length: 24 }, (_, index) => ({
    id: `key-${index}`,
    path: panel(
      0.12 + (index % 8) * 0.095,
      0.15 + Math.floor(index / 8) * 0.14,
      0.075,
      0.1,
    ),
  }));
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
        <path data-device-deck="" d={panel(0, 0, 1, 1)} fill={color} />
        <path d="M4 88 H96 Q96 92 91 92 H9 Q4 92 4 88Z" fill={color} />
        <path d="M5 89 H95" stroke="#182b35" strokeWidth={0.6} opacity={0.15} />
        <g data-device-keyboard="" fill="#182b35" opacity={0.22}>
          {keys.map((key) => (
            <path key={key.id} d={key.path} />
          ))}
          <path data-device-touchpad="" d={panel(0.36, 0.64, 0.28, 0.23)} />
        </g>
      </g>
    ),
  };
}
