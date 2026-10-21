import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const goldfish: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="goldfish">
      <path
        d="M36 28 Q35 6 47 6 Q52 4 54 15 Q66 9 66 30Z M30 46 Q16 25 9 38 Q-1 43 9 53 Q0 64 11 70 Q20 78 30 61Z M70 46 Q84 25 91 38 Q101 43 91 53 Q100 64 89 70 Q80 78 70 61Z M43 71 Q19 84 29 93 Q24 100 38 98 Q48 98 50 86 Q52 98 62 98 Q76 100 71 93 Q81 84 57 71Z"
        fill={color}
      />
      <FishBody
        body="M50 21 C69 21 77 36 77 53 C77 71 65 80 50 80 C35 80 23 71 23 53 C23 36 31 21 50 21Z"
        marking="M25 57 Q36 65 50 60 Q64 65 75 57 C72 73 63 79 50 79 C37 79 28 73 25 57Z"
        color={color}
      />
    </g>
  ),
};
