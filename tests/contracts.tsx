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
