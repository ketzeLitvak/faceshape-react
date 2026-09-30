import type { FaceGeometry } from '../../core/types';
import type { MouthVariant } from '../types';

const MOUTH_OVERRIDES: Partial<Record<MouthVariant, Partial<FaceGeometry>>> = {
  smile: { mouthCurve: 1, mouthOpen: 0 },
  frown: { mouthCurve: -1, mouthOpen: 0 },
  neutral: { mouthCurve: 0, mouthOpen: 0 },
  open: { mouthCurve: 0, mouthOpen: 1, mouthWidth: 20 },
  grin: { mouthCurve: .6, mouthOpen: .55, mouthWidth: 38 },
  small: { mouthWidth: 15, mouthOpen: 0 },
  gentle: { mouthCurve: .8, mouthOpen: 0, mouthWidth: 20 },
  tongue: { mouthCurve: .5, mouthOpen: 1, mouthWidth: 30 },
  joyful: { mouthCurve: 1, mouthOpen: 0, mouthWidth: 38 },
  shark: { mouthCurve: .5, mouthOpen: 1, mouthWidth: 40 },
  toothy: { mouthCurve: .5, mouthOpen: 1, mouthWidth: 40 },
  smirk: { mouthCurve: .5, mouthOpen: 0, mouthWidth: 22 },
  cat: { mouthCurve: .5, mouthOpen: 0, mouthWidth: 22 },
};

export function resolveMouthGeometry(geometry: FaceGeometry, variant: MouthVariant | undefined, talk: number) {
  const result = { ...geometry, ...(variant ? MOUTH_OVERRIDES[variant] : undefined) };
  result.mouthOpen = Math.max(result.mouthOpen, talk);
  return result;
}
