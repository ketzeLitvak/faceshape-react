import { clamp } from '../core/math';
import { getMotionCapabilities } from './capabilities';
import { EYE_STRATEGIES } from './eyes/registry';
import { Face } from './Face';
import { FaceContext } from './FaceContext';
import { useAnimatedFace } from './hooks/useAnimatedFace';
import { useLookAt } from './hooks/useLookAt';
import type { AnimatedFaceProps } from './types';

export function AnimatedFace({
  fixedMouth,
  geometry,
  face,
  motion,
  transition,
  reduced,
  svgRef,
  color,
  children,
}: AnimatedFaceProps) {
  const capabilities = getMotionCapabilities(face.eyes, face.mouth, geometry, fixedMouth);
  const frame = useAnimatedFace(geometry, {
    duration: Number.isFinite(transition.duration)
      ? Math.max(0, transition.duration ?? 300)
      : 300,
    easing: transition.easing ?? 'ease-out',
    blink: !!motion.blink && capabilities.blink,
    talking: !!motion.talking && capabilities.talking,
    reduced,
    seedPhase: geometry.eyeSpacing * 93,
    glance:
      capabilities.lookAt &&
      (motion.glance ?? (EYE_STRATEGIES[face.eyes].idleGlance && !!motion.idle)),
  });
  const directLook = useLookAt(
    svgRef,
    capabilities.lookAt ? motion.lookAt : undefined,
    reduced,
  );
  const state = {
    ...frame,
    fixedMouth,
    look: {
      x: clamp(directLook.x + frame.gaze.x, -1, 1),
      y: clamp(directLook.y + frame.gaze.y, -1, 1),
    },
    color,
    eyeVariant: face.eyes,
  };
  return (
    <FaceContext.Provider value={state}>
      {children ?? <Face {...face} />}
    </FaceContext.Provider>
  );
}
