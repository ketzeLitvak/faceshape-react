import { clamp } from '../../core/math';
import type { FaceGeometry } from '../../core/types';
import type { MouthVariant } from '../types';

/** Variants change proportions and decoration, never replace the emotion. */
const WIDTH_SCALE: Partial<Record<MouthVariant, number>> = {
  gentle: .7, small: .5, tongue: .9, joyful: 1.15, grin: 1.1,
  toothy: 1.1, shark: 1.1, smirk: .8, cat: .8,
};

export function resolveMouthGeometry(geometry: FaceGeometry, variant: MouthVariant | undefined, talk: number): FaceGeometry {
  const result = {...geometry, mouthWidth: clamp(geometry.mouthWidth * (variant ? WIDTH_SCALE[variant] ?? 1 : 1), 8, 50)};
  if (talk > 0) result.mouthOpen = result.mouthOpen > 0 ? result.mouthOpen * (1 - talk * .8) : talk;
  return result;
}

export function stylizedMouthPath(face: FaceGeometry, variant: MouthVariant): string | undefined {
  if (variant !== 'cat' && variant !== 'smirk') return undefined;
  const left = 50 - face.mouthWidth / 2;
  const right = 50 + face.mouthWidth / 2;
  const curve = face.mouthCurve * 12;
  const depth = face.mouthOpen * 16;
  if (variant === 'smirk') {
    const corner = 68 - face.mouthCurve * 4;
    return `M${left} 68 Q50 ${68 + curve - depth} ${right} ${corner} Q50 ${68 + curve + depth} ${left} 68Z`;
  }
  const quarter = face.mouthWidth / 4;
  return `M${left} 68 Q${50 - quarter} ${68 + curve - depth} 50 68 Q${50 + quarter} ${68 + curve - depth} ${right} 68 Q${50 + quarter} ${68 + curve + depth} 50 ${68 + depth} Q${50 - quarter} ${68 + curve + depth} ${left} 68Z`;
}
