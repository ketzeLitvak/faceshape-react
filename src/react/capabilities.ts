import type { FaceGeometry } from '../core/types';
import { EYE_STRATEGIES } from './eyes/registry';
import type { EyeVariant, MotionCapabilities, MouthVariant } from './types';

/** Keep demo controls and the animation engine in agreement. */
export function getMotionCapabilities(
  eyes?: EyeVariant,
  _mouth?: MouthVariant,
  geometry?: Pick<FaceGeometry, 'eyeOpen'>,
): MotionCapabilities {
  const closed = EYE_STRATEGIES[eyes ?? 'round'].isClosed(geometry?.eyeOpen ?? 1);
  return {
    blink: !closed,
    lookAt: !closed,
    talking: true,
  };
}
