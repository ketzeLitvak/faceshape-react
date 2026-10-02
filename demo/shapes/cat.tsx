import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

const head = { x: 50, y: 58, radius: 32 };
const anchorOffset = 20 / Math.sqrt(2);

function catFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'cat');
  const ears = [-1, 1].map((side) => {
    const medium = random() > 0.5;
    const height = medium ? 23 + random() * 3 : 16 + random() * 4;
    return {
      side,
      x: head.x + side * anchorOffset,
      y: head.y - anchorOffset,
      height,
      width: medium ? 9 : 7.5,
      angle: side * (25 + random() * 40),
    };
  });

  return {
    faceBox: centeredFaceBox(42, 42, head.x, head.y),
    render: ({ color }) => (
      <g data-faceshape-cat="" fill={color}>
        {ears.map(({ side, x, y, height, width, angle }) => (
          <g
            key={side}
            data-cat-ear=""
            transform={`translate(${x} ${y}) rotate(${angle})`}
          >
            <path
              d={`M${-width} 3 L-3 ${-height} Q0 ${-height - 3} 3 ${-height} L${width} 3Z`}
            />
            <path
              d={`M${-width * 0.5} 1 L0 ${-height + 5} L${width * 0.5} 1Z`}
              fill="white"
              opacity={0.32}
            />
          </g>
        ))}
        <circle data-cat-head="" cx={head.x} cy={head.y} r={head.radius} />
      </g>
    ),
  };
}

export const cat: CustomShape = { ...catFromName('default'), fromName: catFromName };
