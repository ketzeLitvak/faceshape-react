import type { EyeVariant, MouthVariant, MotionCapabilities } from './types';

/** Keep demo controls and the animation engine in agreement. */
export function getMotionCapabilities(eyes?: EyeVariant, mouth?: MouthVariant): MotionCapabilities {
  const closed = eyes === 'closed' || eyes === 'happy' || eyes === 'joyful';
  const staticMouth = ['smile', 'frown', 'neutral', 'small', 'gentle', 'joyful', 'smirk', 'cat'];
  return {
    blink: !closed,
    lookAt: !closed,
    talking: mouth === undefined || !staticMouth.includes(mouth),
  };
}
