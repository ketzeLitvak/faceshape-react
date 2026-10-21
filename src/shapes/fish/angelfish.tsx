import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const angelfish: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 11, y: 50, scale: 0.49 },
    mouth: { y: 56, scale: 0.43 },
  },
  render: ({ color }) => (
    <g data-fish-kind="angelfish">
      <path
        d="M34 37 Q51 17 38 2 Q63 11 68 38Z M36 65 Q38 82 30 98 Q45 88 50 76 Q55 88 70 98 Q62 82 64 65Z M29 47 Q19 39 7 37 Q17 52 10 67 Q22 64 31 59Z M71 47 Q81 39 93 37 Q83 52 90 67 Q78 64 69 59Z"
        fill={color}
      />
      <path
        data-fish-fin-detail=""
        d="M30 49 L13 41 M29 54 L13 53 M30 59 L14 63 M70 49 L87 41 M71 54 L87 53 M70 59 L86 63"
        fill="none"
        stroke="#102d40"
        strokeOpacity={0.18}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <FishBody
        body="M50 23 C61 26 70 38 72 52 Q69 68 50 81 Q31 68 28 52 C30 38 39 26 50 23Z"
        marking="M50 29 Q62 38 63 54 Q60 69 50 75 Q40 69 37 54 Q38 38 50 29Z"
        color={color}
      />
      <path
        d="M42 6 Q58 24 47 33 Q37 44 36 57 Q35 72 30 92 Q44 80 44 68 Q40 52 49 38 Q64 23 42 6Z M61 31 Q70 47 66 60 Q59 74 70 96 Q56 85 56 72 Q63 52 57 39Z"
        fill="#102d40"
        opacity={0.18}
      />
    </g>
  ),
};
