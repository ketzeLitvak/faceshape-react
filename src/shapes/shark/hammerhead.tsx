import type { CustomShape } from '../../react/types';

export const hammerhead: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 42, y: 25, scale: 0.48 },
    mouth: { y: 36, scale: 0.48 },
  },
  render: ({ color }) => (
    <g data-faceshape-shark="" data-shark-kind="hammerhead">
      <path
        d="M45 84 C40 89 31 92 31 98 Q39 101 50 94 Q61 101 69 98 C69 92 60 89 55 84Z"
        fill={color}
      />
      <path
        d="M34 52 Q19 61 17 75 Q16 81 22 77 L39 66Z M66 52 Q81 61 83 75 Q84 81 78 77 L61 66Z"
        fill={color}
      />
      <path
        d="M50 14 Q64 12 72 15 L91 14 Q98 13 99 23 L99 30 Q98 38 92 38 L72 36 Q66 36 66 46 C68 65 64 81 50 92 C36 81 32 65 34 46 Q34 36 28 36 L8 38 Q2 38 1 30 L1 23 Q2 13 9 14 L28 15 Q36 12 50 14Z"
        fill={color}
      />
      <path
        d="M50 35 C39 35 35 43 36 56 C36 72 41 84 50 91 C59 84 64 72 64 56 C65 43 61 35 50 35Z"
        fill="#f5f0e5"
      />
    </g>
  ),
};
