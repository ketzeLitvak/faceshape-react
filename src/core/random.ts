import type { FaceGeometry } from './types';

export function seededTraits(
  seed?: string | number,
): Pick<FaceGeometry, 'eyeSpacing' | 'pupilSize'> {
  if (seed === undefined) {
    return { eyeSpacing: 24, pupilSize: 4.2 };
  }
  let hash = 2166136261;
  for (const c of String(seed)) {
    hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  }
  const random = () => {
    hash = (hash + 0x6d2b79f5) | 0;
    let t = hash;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { eyeSpacing: 22 + random() * 4, pupilSize: 3.8 + random() * 0.8 };
}
