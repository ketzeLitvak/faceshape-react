import type { CustomShape } from '../../react/types';

export const baby: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: { eyes: { spacing: 14, y: 51, scale: 0.5 }, mouth: { y: 57, scale: 0.42 } },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="baby">
      <path
        d="M45 84 C40 89 31 92 31 98 Q39 101 50 94 Q61 101 69 98 C69 92 60 89 55 84Z"
        fill={color}
      />
      <path
        d="M28 58 Q15 62 12 73 Q11 79 18 77 L35 70Z M72 58 Q85 62 88 73 Q89 79 82 77 L65 70Z"
        fill={color}
      />
      <path
        d="M50 25 C70 25 80 41 80 58 C80 73 64 84 50 91 C36 84 20 73 20 58 C20 41 30 25 50 25Z"
        fill={color}
      />
      <path
        d="M50 52 C37 52 27 56 27 65 C28 75 40 85 50 90 C60 85 72 75 73 65 C73 56 63 52 50 52Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
