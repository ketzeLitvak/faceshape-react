import { BROW_STRATEGIES } from '../eyebrows/registry';
import { EYE_STRATEGIES } from '../eyes/registry';
import { MOUTH_STRATEGIES } from '../mouths/registry';
import type { FaceConfig } from '../types';

export function validateFaceConfig(face: FaceConfig): void {
  if (
    !face ||
    !Object.keys(EYE_STRATEGIES).includes(face.eyes) ||
    !Object.keys(MOUTH_STRATEGIES).includes(face.mouth) ||
    !Object.keys(BROW_STRATEGIES).includes(face.eyebrows)
  ) {
    throw new Error('face must explicitly include valid eyes, mouth and eyebrows');
  }
}
