import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const clownfish: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 11, y: 49, scale: 0.52 },
    mouth: { y: 55, scale: 0.46 },
  },
  render: ({ color }) => (
    <g data-fish-kind="clownfish">
      <path
        d="M38 25 Q38 4 49 4 Q57 4 57 13 Q70 9 67 29Z M26 46 Q10 32 6 46 Q2 57 10 65 Q17 70 27 63Z M74 46 Q90 32 94 46 Q98 57 90 65 Q83 70 73 63Z M43 76 Q29 94 41 97 Q50 100 59 97 Q71 94 57 76Z"
        fill={color}
      />
      <path
        data-fish-fin-detail=""
        d="M44 22 L48 9 M53 23 L59 15 M63 24 L66 21 M24 48 L10 44 M23 55 L9 54 M24 61 L12 63 M76 48 L90 44 M77 55 L91 54 M76 61 L88 63 M44 84 L40 92 M50 85 L50 95 M56 84 L60 92"
        fill="none"
        stroke="#102d40"
        strokeOpacity={0.18}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <FishBody
        body="M50 18 C71 18 81 34 81 54 C81 73 69 83 50 83 C31 83 19 73 19 54 C19 34 29 18 50 18Z"
        marking="M24 14 Q38 25 34 48 Q30 66 42 87 L33 89 Q20 67 25 46 Q30 27 17 24Z M76 14 Q62 25 66 48 Q70 66 58 87 L67 89 Q80 67 75 46 Q70 27 83 24Z"
        color={color}
      />
    </g>
  ),
};
