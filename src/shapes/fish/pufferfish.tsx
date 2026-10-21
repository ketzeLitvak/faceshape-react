import type { CustomShape } from '../../react/types';
import { FishBody } from './FishBody';

export const pufferfish: CustomShape = {
  faceBox: { x: 0.32, y: 0.35, width: 0.36, height: 0.34 },
  render: ({ color }) => (
    <g data-fish-kind="pufferfish">
      <path
        d="M22 40 L13 27 L30 31Z M40 20 Q50 0 60 20Z M70 31 L87 27 L78 40Z M80 63 L91 74 L74 76Z M26 76 L9 74 L20 63Z M19 50 Q2 39 3 59 Q5 68 20 63Z M81 50 Q98 39 97 59 Q95 68 80 63Z M43 81 Q29 98 43 97 L50 91 L57 97 Q71 98 57 81Z"
        fill={color}
      />
      <FishBody
        body="M50 17 C72 17 85 33 85 54 C85 75 71 88 50 88 C29 88 15 75 15 54 C15 33 28 17 50 17Z"
        marking="M50 60 C32 60 23 70 27 78 Q50 96 73 78 C77 70 68 60 50 60Z"
        color={color}
      />
    </g>
  ),
};
