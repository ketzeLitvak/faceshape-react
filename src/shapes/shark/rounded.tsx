import type { CustomShape } from '../../react/types';

export const rounded: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: { eyes: { spacing: 16, y: 34, scale: 0.55 }, mouth: { y: 41, scale: 0.5 } },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="rounded">
      <path
        d="M45 84 C40 89 31 92 31 98 Q39 101 50 94 Q61 101 69 98 C69 92 60 89 55 84Z"
        fill={color}
      />
      <path
        d="M22 46 Q8 51 3 61 Q0 67 8 67 L28 62Z M78 46 Q92 51 97 61 Q100 67 92 67 L72 62Z"
        fill={color}
      />
      <path
        d="M50 12 C76 12 87 32 87 53 C87 72 71 86 50 93 C29 86 13 72 13 53 C13 32 24 12 50 12Z"
        fill={color}
      />
      <path
        d="M50 36 C33 36 23 44 23 56 C23 72 37 86 50 92 C63 86 77 72 77 56 C77 44 67 36 50 36Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
