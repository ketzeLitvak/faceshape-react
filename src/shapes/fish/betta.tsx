import type { CustomShape } from '../../react/types';

export const betta: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="betta">
      <path
        d="M38 35 Q19 28 27 17 Q20 9 33 10 Q30 1 43 6 Q53 0 55 12 Q72 7 66 24 L64 36Z M69 30 Q83 10 89 22 Q100 18 94 33 Q104 39 94 46 Q104 57 94 62 Q103 78 89 77 Q92 94 77 86 Q66 100 58 77Z M37 69 Q22 82 34 86 Q28 99 43 94 L50 83 Q57 98 69 94 Q79 91 65 70Z M28 46 Q14 31 10 43 Q0 44 7 55 Q-1 66 10 69 Q14 81 30 65Z"
        fill={color}
      />
      <path
        d="M50 28 C67 28 75 41 75 56 C75 73 64 82 50 82 C36 82 25 73 25 56 C25 41 33 28 50 28Z"
        fill={color}
      />
      <path
        d="M28 61 Q36 66 50 63 Q64 66 72 61 Q68 79 50 80 Q32 79 28 61Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
