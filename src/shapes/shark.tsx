import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { scaledFaceBox, shapeVariation } from './variation';

const baseShark: CustomShape = {
  viewBox: '0 0 100 100',
  faceBox: { x: 0.24, y: 0.265, width: 0.52, height: 0.46 },
  render: ({ color }) => (
    <g data-faceshape-shark="">
      <path d="M40 20 Q46 7 53 3 Q56 1 57 6 L61 23Z" fill={color} />
      <path
        d="M18 54 Q8 61 3 74 Q0 83 6 82 L24 78Z M82 54 Q92 61 97 74 Q100 83 94 82 L76 78Z"
        fill={color}
      />
      <path
        d="M50 18 C73 18 87 39 87 60 C87 75 81 83 75 88 L75 94 Q72 100 65 99 Q59 99 58 94 L42 94 Q41 99 34 99 Q27 100 25 94 L25 88 C18 81 13 73 13 60 C13 39 27 18 50 18Z"
        fill={color}
      />
      <path
        d="M50 49 C37 49 22 55 18 61 C15 68 29 80 39 92 Q41 94 46 94 H54 Q59 94 61 92 C71 80 85 68 82 61 C78 55 63 49 50 49Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};

function sharkFromName(name: string | number): CustomShape {
  const { width, height, detail } = shapeVariation(name, 'shark');
  return {
    faceBox: scaledFaceBox(baseShark.faceBox, width, height),
    render: ({ color }) => (
      <g transform={`translate(50 50) scale(${width} ${height}) translate(-50 -50)`}>
        <path
          d={`M40 20 Q46 ${7 - detail * 2} 53 ${4 - detail * 3} Q56 ${2 - detail * 2} 57 6 L61 23Z`}
          fill={color}
        />
        {baseShark.render?.({ color })}
      </g>
    ),
  };
}
export const shark: CustomShape = /* @__PURE__ */ createNamedShape(
  sharkFromName,
  baseShark,
);
