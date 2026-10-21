import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const pufferfish: CustomShape = {
  faceBox: { x: 0, y: 0, width: 1, height: 1 },
  faceLayout: {
    eyes: { spacing: 13, y: 40, scale: 0.56 },
    mouth: { y: 46, scale: 0.52 },
  },
  render: ({ color }) => (
    <g data-fish-kind="pufferfish">
      <path
        d="M19 46 Q5 34 3 48 Q0 61 8 65 L22 59Z M81 46 Q95 34 97 48 Q100 61 92 65 L78 59Z M43 81 Q30 96 42 97 Q47 97 50 91 Q53 97 58 97 Q70 96 57 81Z"
        fill={color}
      />
      <path
        data-fish-fin-detail=""
        d="M17 49 L6 45 M17 54 L6 54 M17 59 L7 62 M83 49 L94 45 M83 54 L94 54 M83 59 L93 62 M44 86 L41 93 M49 86 L47 93 M53 86 L55 93 M57 86 L61 93"
        fill="none"
        stroke="#102d40"
        strokeOpacity={0.18}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <FishBody
        body="M50 13 C72 13 85 29 85 50 C85 73 70 87 50 87 C30 87 15 73 15 50 C15 29 28 13 50 13Z"
        marking="M50 54 C32 54 20 65 23 76 C30 85 40 90 50 89 C60 90 70 85 77 76 C80 65 68 54 50 54Z"
        color={color}
      />
      <g data-fish-spines="" fill={color}>
        <path d="M45 16 L48 8 Q50 5 52 8 L57 16Z M23 28 L21 18 Q20 15 23 17 L32 23Z M77 28 L79 18 Q80 15 77 17 L68 23Z M17 43 L9 40 Q6 39 8 43 L16 49Z M83 43 L91 40 Q94 39 92 43 L84 49Z M20 66 L12 70 Q9 73 13 73 L26 74Z M80 66 L88 70 Q91 73 87 73 L74 74Z M29 79 L25 86 Q24 90 28 88 L36 84Z M71 79 L75 86 Q76 90 72 88 L64 84Z" />
      </g>
    </g>
  ),
};
