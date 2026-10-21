import type { CustomShape } from '../../react/types';

export const hammerhead: CustomShape = {
  faceBox: { x: 0.24, y: 0.28, width: 0.52, height: 0.44 },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="hammerhead">
      <path
        d="M43 84 Q30 91 30 97 Q39 100 50 93 Q61 100 70 97 Q70 91 57 84Z"
        fill={color}
      />
      <path
        d="M25 56 Q10 64 5 81 Q4 85 10 83 L32 75Z M75 56 Q90 64 95 81 Q96 85 90 83 L68 75Z"
        fill={color}
      />
      <path
        d="M50 20 C65 20 69 25 76 26 L91 24 Q98 24 98 31 L98 43 Q98 50 91 50 L79 48 C82 61 82 77 72 86 L68 91 Q50 97 32 91 L28 86 C18 77 18 61 21 48 L9 50 Q2 50 2 43 L2 31 Q2 24 9 24 L24 26 C31 25 35 20 50 20Z"
        fill={color}
      />
      <path
        d="M50 49 C36 49 28 55 26 65 C24 76 35 90 50 92 C65 90 76 76 74 65 C72 55 64 49 50 49Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
