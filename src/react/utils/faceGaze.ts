import { getEyeDimensions } from './eyeGeometry';
import { getMotionCapabilities } from '../capabilities';
import type { EyeVariant, FaceStyle, LookTarget } from '../types';

/** Gaze offsets are independent of blink and mouth openness. */
export function getFaceGaze(eyes: EyeVariant, style: FaceStyle, look: Exclude<LookTarget, string>, eyeOpen = 1) {
  const pupilOnly = eyes !== 'sly' && getEyeDimensions(eyes, style).whites;
  const follows = getMotionCapabilities(eyes, undefined, {eyeOpen}).lookAt && !pupilOnly;
  const distance = follows ? (eyes === 'sly' ? 1.8 : 3) : 0;
  const eye = { x: look.x * distance, y: look.y * distance };
  return {
    eyes: `translate(${eye.x} ${eye.y})`,
    eyebrows: `translate(${eye.x} ${eye.y})`,
    mouth: `translate(${eye.x * .4} ${eye.y * .4})`,
  };
}
