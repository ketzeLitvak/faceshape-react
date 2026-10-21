import type { CustomShape } from '../../react/types';

export const classic: CustomShape = {
  viewBox: '0 0 100 100',
  faceBox: { x: 0.24, y: 0.265, width: 0.52, height: 0.46 },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="classic">
      <path
        d="M43 84 Q30 91 30 97 Q39 100 50 93 Q61 100 70 97 Q70 91 57 84Z"
        fill={color}
      />
      <path d="M40 20 Q46 7 53 3 Q56 1 57 6 L61 23Z" fill={color} />
      <path
        d="M18 54 Q8 61 3 74 Q0 83 6 82 L24 78Z M82 54 Q92 61 97 74 Q100 83 94 82 L76 78Z"
        fill={color}
      />
      <path
        d="M50 18 C73 18 87 39 87 60 C87 75 81 83 75 88 Q62 97 50 94 Q38 97 25 88 C18 81 13 73 13 60 C13 39 27 18 50 18Z"
        fill={color}
      />
      <path
        d="M50 49 C37 49 22 55 18 61 C15 68 29 80 39 92 Q41 94 46 94 H54 Q59 94 61 92 C71 80 85 68 82 61 C78 55 63 49 50 49Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
