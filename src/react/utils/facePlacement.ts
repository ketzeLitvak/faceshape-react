import type { FaceLayout } from '../types';

export function eyePlacement(layout: FaceLayout | undefined, x: number) {
  const eyes = layout?.eyes;
  return eyes
    ? `translate(${x} ${eyes.y}) scale(${eyes.scale}) translate(${-x} -36)`
    : undefined;
}

export function mouthPlacement(layout: FaceLayout | undefined, gaze: string) {
  const mouth = layout?.mouth;
  return mouth
    ? `translate(50 ${mouth.y}) scale(${mouth.scale}) translate(-50 -68) ${gaze}`
    : gaze;
}
