import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const clownfish: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="clownfish">
      <path
        d="M40 26 Q36 5 48 5 Q55 5 56 15 Q69 8 68 30Z M26 51 Q9 34 5 48 Q1 60 9 70 L28 65Z M74 51 Q91 34 95 48 Q99 60 91 70 L72 65Z M43 79 Q31 96 39 98 Q50 100 50 92 Q50 100 61 98 Q69 96 57 79Z"
        fill={color}
      />
      <FishBody
        body="M50 19 C73 19 82 37 82 55 C82 76 68 87 50 87 C32 87 18 76 18 55 C18 37 27 19 50 19Z"
        marking="M20 12 Q34 48 28 93 L40 93 Q31 48 40 12Z M80 12 Q66 48 72 93 L60 93 Q69 48 60 12Z"
        color={color}
      />
    </g>
  ),
};
