import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const angelfish: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="angelfish">
      <path
        d="M32 34 Q54 18 43 2 Q67 11 70 39Z M32 69 Q39 81 28 98 Q50 86 50 77 Q50 86 72 98 Q61 81 68 69Z M29 47 L6 34 Q17 51 7 71 L31 64Z M71 47 L94 34 Q83 51 93 71 L69 64Z"
        fill={color}
      />
      <FishBody
        body="M50 20 Q72 31 73 54 Q72 74 50 85 Q28 74 27 54 Q28 31 50 20Z"
        marking="M50 36 Q63 41 64 57 Q63 74 50 79 Q37 74 36 57 Q37 41 50 36Z"
        color={color}
      />
    </g>
  ),
};
