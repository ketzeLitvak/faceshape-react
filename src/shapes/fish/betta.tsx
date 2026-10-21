import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const betta: CustomShape = {
  faceBox: { x: 0, y: 0, width: 0.9, height: 1 },
  faceLayout: {
    eyes: { spacing: 10, y: 48, scale: 0.51 },
    mouth: { y: 54, scale: 0.43 },
  },
  render: ({ color }) => (
    <g data-fish-kind="betta">
      <path
        d="M35 38 Q23 19 32 12 Q29 3 39 9 Q46 -1 49 8 Q61 1 63 11 Q74 11 66 22 L64 39Z M63 34 Q81 7 84 20 Q99 18 91 31 Q106 35 94 45 Q105 53 95 59 Q104 72 91 73 Q98 89 83 84 Q77 99 68 85 L57 70Z M33 47 Q15 27 12 41 Q-1 39 6 52 Q-1 62 10 65 Q8 78 22 71 L36 62Z M41 65 Q26 76 32 84 Q25 94 39 90 Q38 101 49 93 L52 80 Q53 94 65 96 Q79 97 71 88 Q81 84 67 73 L60 65Z"
        fill="#ff806b"
      />
      <path
        d="M36 38 Q27 21 35 18 Q33 11 40 16 Q48 6 49 15 Q62 9 59 19 Q68 17 60 29 L57 41Z M62 40 Q81 17 80 29 Q94 24 85 37 Q99 39 86 46 Q99 54 87 59 Q98 72 85 68 Q90 83 79 77 Q75 90 66 80 L58 66Z M33 50 Q17 34 17 46 Q5 43 12 54 Q4 62 17 61 Q13 74 32 60Z M41 67 Q31 77 39 81 Q32 91 44 85 L50 75 Q55 87 65 89 Q73 89 63 81 Q72 80 59 68Z"
        fill={color}
      />
      <path
        d="M36 36 Q33 26 42 17 Q36 30 43 36Z M47 32 Q45 22 53 16 Q48 28 53 34Z M63 43 Q79 27 82 30 Q68 43 66 48Z M65 51 Q81 41 88 46 Q77 50 65 56Z M64 58 Q83 55 88 61 Q74 59 62 64Z M61 64 Q79 69 79 76 Q68 70 58 67Z M31 51 Q17 46 13 50 L29 55Z M31 57 Q18 54 13 60 L31 61Z M41 70 Q34 78 40 82 L46 73Z M54 71 Q60 80 65 81 L59 72Z"
        fill="#102d40"
        opacity={0.18}
      />
      <FishBody
        body="M45 29 C59 29 67 39 67 51 C67 65 58 73 45 73 C32 73 24 64 24 51 C24 39 32 29 45 29Z"
        marking="M25 57 Q34 60 45 58 Q56 60 66 57 Q62 73 45 73 Q28 73 25 57Z"
        color={color}
      />
    </g>
  ),
};
