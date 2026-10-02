import { type CustomShape, createNameRandom } from '../../src';
import { centeredFaceBox } from './faceBox';

function catFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'cat');
  const width = 58 + random() * 24;
  const height = 44 + random() * 16;
  const spread = 8 + random() * 14;
  const earHeight = 18 + random() * 12;
  const left = 50 - width / 2;
  const right = 50 + width / 2;
  const earTop = 58 - height / 2 - earHeight;
  const leftTip = left + 12 - spread * 0.5;
  const rightTip = right - 12 + spread * 0.5;
  return {
    faceBox: centeredFaceBox(width * 0.62, height * 0.66, 50, 58),
    render: ({ color }) => (
      <g data-faceshape-cat="" fill={color}>
        <path
          d={`M${left + 2} 48 L${leftTip} ${earTop} Q${leftTip + 2} ${earTop - 3} ${leftTip + 5} ${earTop + 1} L39 40Z`}
        />
        <path
          d={`M${right - 2} 48 L${rightTip} ${earTop} Q${rightTip - 2} ${earTop - 3} ${rightTip - 5} ${earTop + 1} L61 40Z`}
        />
        <path
          d={`M${left + 7} 39 L${leftTip + 4} ${earTop + 8} L35 39Z M${right - 7} 39 L${rightTip - 4} ${earTop + 8} L65 39Z`}
          fill="white"
          opacity={0.32}
        />
        <ellipse cx={50} cy={58} rx={width / 2} ry={height / 2} />
      </g>
    ),
  };
}

export const cat: CustomShape = { ...catFromName('default'), fromName: catFromName };
