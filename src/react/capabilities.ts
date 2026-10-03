import type { FaceGeometry } from '../core/types';
import { EYE_STRATEGIES } from './eyes/registry';
import { MOUTH_STRATEGIES } from './mouths/registry';
import type { EyeVariant, MotionCapabilities, MouthVariant } from './types';

/** Keep demo controls and the animation engine in agreement. */
export function getMotionCapabilities(
  eyes: EyeVariant,
  mouth?: MouthVariant,
  geometry?: Partial<FaceGeometry>,
): MotionCapabilities {
  const eye = EYE_STRATEGIES[eyes];
  const mouthStyle = mouth === undefined ? undefined : MOUTH_STRATEGIES[mouth];
  if (!eye || (mouth !== undefined && !mouthStyle)) {
    throw new Error('Unknown face style: register custom styles before rendering');
  }
  const closed = eye.isClosed(geometry?.eyeOpen ?? 1);
  return {
    blink: !closed && eye.supportsBlink !== false,
    lookAt: !closed && eye.supportsLookAt !== false,
    talking:
      mouth === undefined ||
      (!MOUTH_STRATEGIES[mouth].lineOnly &&
        MOUTH_STRATEGIES[mouth].supportsTalking !== false &&
        !MOUTH_STRATEGIES[mouth].isClosed?.(geometry ?? {})),
  };
}
