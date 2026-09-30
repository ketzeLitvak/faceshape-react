import type { FaceGeometry } from '../core/types';
import type { EyeVariant, MouthVariant, MotionCapabilities } from './types';

/** Keep demo controls and the animation engine in agreement. */
export function getMotionCapabilities(eyes?: EyeVariant, _mouth?: MouthVariant, geometry?: Pick<FaceGeometry, 'eyeOpen'>): MotionCapabilities {
  const closed = (eyes === 'closed' || eyes === 'happy' || eyes === 'joyful') && (geometry?.eyeOpen ?? 1) <= 1.05;
  return {
    blink: !closed,
    lookAt: !closed,
    talking: true,
  };
}
