import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { scaledFaceBox, shapeVariation } from './variation';

function penguinFromName(name: string | number): CustomShape {
  const { width, height, detail } = shapeVariation(name, 'penguin');
  return {
    faceBox: scaledFaceBox(
      { x: 0.29, y: 0.27, width: 0.42, height: 0.37 },
      width,
      height,
    ),
    render: ({ color }) => (
      <g
        data-faceshape-penguin=""
        transform={`translate(50 50) scale(${width} ${height}) translate(-50 -50)`}
      >
        <path
          d={`M25 42 Q${10 - detail * 3} 53 12 73 Q17 79 29 65Z M75 42 Q${90 + detail * 3} 53 88 73 Q83 79 71 65Z`}
          fill={color}
        />
        <path
          d="M27 87 Q17 90 18 96 H43 L42 87Z M73 87 Q83 90 82 96 H57 L58 87Z"
          fill="#efa64f"
        />
        <path
          d={`M50 6 C${79 + detail * 3} 6 75 35 83 62 Q94 94 50 94 Q6 94 17 62 C25 35 ${21 - detail * 3} 6 50 6Z`}
          fill={color}
        />
        <path
          d="M50 30 C39 15 26 27 26 45 C26 59 19 69 26 80 Q50 96 74 80 C81 69 74 59 74 45 C74 27 61 15 50 30Z"
          fill="#fbf8ee"
        />
      </g>
    ),
  };
}

export const penguin: CustomShape = /* @__PURE__ */ createNamedShape(penguinFromName);
