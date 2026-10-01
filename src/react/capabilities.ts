import type { FaceGeometry } from '../core/types';
import { EYE_STRATEGIES } from './eyes/registry';
import { MOUTH_STRATEGIES } from './mouths/registry';
import type { EyeVariant, MotionCapabilities, MouthVariant } from './types';

/** Keep demo controls and the animation engine in agreement. */
export function getMotionCapabilities(
  eyes: EyeVariant,
  mouth?: MouthVariant,
  geometry?: Pick<FaceGeometry, 'eyeOpen'>,
  fixedMouth = false,
): MotionCapabilities {
  const closed = EYE_STRATEGIES[eyes].isClosed(geometry?.eyeOpen ?? 1);
  return {
    blink: !closed,
    lookAt: !closed,
    talking: !fixedMouth && (mouth === undefined || !MOUTH_STRATEGIES[mouth].lineOnly),
  };
}
