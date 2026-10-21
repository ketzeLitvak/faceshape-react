import type { CustomShape } from '../../react/types';

export const baby: CustomShape = {
  faceBox: { x: 0.24, y: 0.28, width: 0.52, height: 0.44 },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="baby">
      <path
        d="M43 84 Q30 91 30 97 Q39 100 50 93 Q61 100 70 97 Q70 91 57 84Z"
        fill={color}
      />
      <path
        d="M20 51 Q7 55 3 69 Q2 75 8 74 L28 70Z M80 51 Q93 55 97 69 Q98 75 92 74 L72 70Z"
        fill={color}
      />
      <path
        d="M50 19 C74 19 83 39 83 61 C89 80 76 90 66 92 Q50 98 34 92 C24 90 11 80 17 61 C17 39 26 19 50 19Z"
        fill={color}
      />
      <path
        d="M50 49 C34 49 23 56 21 65 C19 78 33 91 50 91 C67 91 81 78 79 65 C77 56 66 49 50 49Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
