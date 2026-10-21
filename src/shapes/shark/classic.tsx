import type { CustomShape } from '../../react/types';

export const classic: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 14, y: 39, scale: 0.53 },
    mouth: { y: 46, scale: 0.46 },
  },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="classic">
      <path
        d="M45 84 C40 89 31 92 31 98 Q39 101 50 94 Q61 101 69 98 C69 92 60 89 55 84Z"
        fill={color}
      />
      <path
        d="M40 24 Q48 7 59 4 Q63 3 62 12 L62 26Z M75 30 Q79 22 84 20 Q87 20 86 25 L82 37Z"
        fill={color}
      />
      <path
        d="M21 49 Q7 58 4 73 Q3 78 10 75 L31 64Z M79 49 Q93 58 96 73 Q97 78 90 75 L69 64Z"
        fill={color}
      />
      <path
        d="M50 18 C72 18 85 39 84 56 C83 74 66 85 50 92 C34 85 17 74 16 56 C15 39 28 18 50 18Z"
        fill={color}
      />
      <path
        d="M50 41 C35 41 22 42 22 55 C23 69 37 83 50 91 C63 83 77 69 78 55 C78 42 65 41 50 41Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
