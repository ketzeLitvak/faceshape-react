import type { FaceConfig } from '../src';
import { Character, Eyebrows, Eyes, Face, Mouth } from '../src';

const face: FaceConfig = { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' };
<Character face={face} />;
// @ts-expect-error A face must be explicitly supplied.
<Character />;
// @ts-expect-error Partial faces are forbidden.
<Character face={{ eyes: 'bright', mouth: 'tongue' }} />;
// @ts-expect-error Legacy presets cannot replace the full face.
<Character face={face} faceStyle="soft" />;
// @ts-expect-error Face also requires the full collection.
<Face eyes="bright" mouth="tongue" />;
// @ts-expect-error Parts have no default variant.
<Eyes />;
// @ts-expect-error Parts have no default variant.
<Mouth />;
// @ts-expect-error Parts have no default variant.
<Eyebrows />;
// @ts-expect-error Emotion-based mouth aliases have been removed.
<Character face={{ ...face, mouth: 'frown' }} />;

<Character face={{ eyes: 'none', mouth: 'none', eyebrows: 'none' }} />;
<Eyes variant="none" />;
<Mouth variant="none" />;

<Character face={{ eyes: 'cyclops', mouth: 'cat', eyebrows: 'soft' }} />;
<Character face={{ eyes: 'eyelashes', mouth: 'none', eyebrows: 'none' }} />;
<Eyes variant="heart" />;
<Eyes variant="star" />;
<Eyes variant="softLids" />;
<Eyes variant="spiral" />;

import { registerEyeStyle, registerMouthStyle } from '../src';

const customEye = registerEyeStyle('custom:typed-eye', {
  supportsBlink: true,
  supportsLookAt: false,
  render: () => null,
  dimensions: { rx: 10, ry: 10, whites: false, highlight: false },
  isClosed: () => false,
  gazeDistance: 0,
  browBaseline: 10,
  idleGlance: false,
});
const customMouth = registerMouthStyle('custom:typed-mouth', {
  supportsTalking: false,
  widthScale: 1,
  shape: () => ({ path: 'M30 68 H70', bottom: 68, tongueHeight: 0 }),
});
<Character face={{ eyes: customEye, mouth: customMouth, eyebrows: 'none' }} />;
// @ts-expect-error Extensions must use their own namespace.
registerEyeStyle('bright', {});
// @ts-expect-error Motion capabilities must be explicitly declared.
registerMouthStyle('custom:incomplete', {
  widthScale: 1,
  shape: () => ({ path: 'M30 68 H70', bottom: 68, tongueHeight: 0 }),
});
