import type { CustomShape } from '../../react/types';

export const clownfish: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="clownfish">
      <path
        d="M40 26 Q36 5 48 5 Q55 5 56 15 Q69 8 68 30Z M26 51 Q9 34 5 48 Q1 60 9 70 L28 65Z M74 51 Q91 34 95 48 Q99 60 91 70 L72 65Z M43 79 Q31 96 39 98 Q50 100 50 92 Q50 100 61 98 Q69 96 57 79Z"
        fill={color}
      />
      <path
        d="M50 19 C73 19 82 37 82 55 C82 76 68 87 50 87 C32 87 18 76 18 55 C18 37 27 19 50 19Z"
        fill={color}
      />
      <path
        d="M30 25 Q23 55 35 84 L40 86 Q28 53 37 22Z M70 25 Q77 55 65 84 L60 86 Q72 53 63 22Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
