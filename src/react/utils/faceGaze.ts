import { getMotionCapabilities } from '../capabilities';
import { EYE_STRATEGIES } from '../eyes/registry';
import type { EyeVariant, LookTarget } from '../types';

/** Gaze offsets are independent of blink and mouth openness. */
export function getFaceGaze(
  eyes: EyeVariant,
  look: Exclude<LookTarget, string>,
  eyeOpen = 1,
) {
  const strategy = EYE_STRATEGIES[eyes];
  const pupilOnly = strategy.dimensions.whites;
  const follows =
    getMotionCapabilities(eyes, undefined, { eyeOpen }).lookAt && !pupilOnly;
  const distance = follows ? strategy.gazeDistance : 0;
  const eye = { x: look.x * distance, y: look.y * distance };
  return {
    eyes: `translate(${eye.x} ${eye.y})`,
    eyebrows: `translate(${eye.x} ${eye.y})`,
    mouth: `translate(${eye.x * 0.4} ${eye.y * 0.4})`,
  };
}
