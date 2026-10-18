import type { CustomShape } from '../../react/types';

export const rounded: CustomShape = {
  faceBox: { x: 0.24, y: 0.28, width: 0.52, height: 0.44 },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="rounded">
      <path d="M39 24 Q43 10 52 5 Q56 3 57 8 L62 26Z" fill={color} />
      <path
        d="M20 51 Q7 55 3 69 Q2 75 8 74 L28 70Z M80 51 Q93 55 97 69 Q98 75 92 74 L72 70Z"
        fill={color}
      />
      <path
        d="M50 19 C76 19 89 39 89 61 C89 80 76 90 66 92 L65 97 Q58 100 54 94 H46 Q42 100 35 97 L34 92 C24 90 11 80 11 61 C11 39 24 19 50 19Z"
        fill={color}
      />
      <path
        d="M50 49 C34 49 23 56 21 65 C19 78 33 91 50 91 C67 91 81 78 79 65 C77 56 66 49 50 49Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
