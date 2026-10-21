import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const goldfish: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 12, y: 39, scale: 0.53 },
    mouth: { y: 45, scale: 0.46 },
  },
  render: ({ color }) => (
    <g data-fish-kind="goldfish">
      <path
        d="M37 27 Q29 13 43 3 Q47 0 48 8 Q48 15 56 17 Q64 17 65 27Z M29 43 Q20 24 13 32 Q8 34 11 41 Q0 43 6 51 Q0 58 9 61 Q9 72 18 69 Q21 77 30 62Z M71 43 Q80 24 87 32 Q92 34 89 41 Q100 43 94 51 Q100 58 91 61 Q91 72 82 69 Q79 77 70 62Z M44 68 Q22 78 28 86 Q20 92 32 94 Q33 103 44 96 Q50 95 50 82 Q50 95 56 96 Q67 103 68 94 Q80 92 72 86 Q78 78 56 68Z"
        fill={color}
      />
      <path
        d="M42 7 Q41 19 47 25 L53 25 Q44 18 48 9Z M12 35 Q18 44 30 49 L29 53 Q14 44 6 46Z M8 56 Q19 52 29 55 L29 61 Q19 59 15 69Z M88 35 Q82 44 70 49 L71 53 Q86 44 94 46Z M92 56 Q81 52 71 55 L71 61 Q81 59 85 69Z M44 72 Q30 85 32 92 Q42 86 48 76Z M56 72 Q70 85 68 92 Q58 86 52 76Z M49 77 Q44 90 44 96 L48 94 L50 83 Q52 94 56 96 Q53 84 51 77Z"
        fill="#102d40"
        opacity={0.14}
      />
      <FishBody
        body="M50 20 C66 20 74 34 74 49 C74 65 63 73 50 73 C37 73 26 65 26 49 C26 34 34 20 50 20Z"
        marking="M26 53 Q36 59 50 55 Q64 59 74 53 Q70 73 50 73 Q30 73 26 53Z"
        color={color}
      />
    </g>
  ),
};
