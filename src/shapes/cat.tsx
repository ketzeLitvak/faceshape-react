import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { centeredFaceBox } from './faceBox';

const catShape: CustomShape = {
  faceBox: /* @__PURE__ */ centeredFaceBox(42, 42, 50, 58),
  render: ({ color }) => (
    <g data-faceshape-cat="" fill={color}>
      <path data-cat-ear="" d="M22 43 L24 19 Q24 17 26 19 L42 36Z" />
      <path data-cat-ear="" d="M78 43 L76 19 Q76 17 74 19 L58 36Z" />
      <path d="M27 37 L26 25 L36 35Z M73 37 L74 25 L64 35Z" fill="white" opacity={0.32} />
      <circle data-cat-head="" cx={50} cy={58} r={32} />
    </g>
  ),
};

export const cat: CustomShape = /* @__PURE__ */ createNamedShape(
  () => catShape,
  catShape,
);
