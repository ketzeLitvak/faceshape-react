import { ease, interpolateFace } from '../../core/index';
import type { FaceGeometry } from '../../core/types';
import type { AnimatedFaceOptions } from '../types';
import type { AnimationFrame } from './types';

export function calculateBlink(elapsed: number, phaseOffset: number): number {
  const phase = (elapsed + phaseOffset) % 4200;
  return phase < 170 ? Math.abs(phase - 85) / 85 : 1;
}

export function calculateTalk(elapsed: number): number {
  return (0.5 + 0.5 * Math.sin(elapsed / 85)) * 0.7;
}

export function calculateGaze(elapsed: number, phaseOffset: number) {
  return {
    x: Math.sin((elapsed + phaseOffset) / 1800) * 0.7,
    y: Math.sin((elapsed + phaseOffset) / 2500) * 0.35,
  };
}

export function calculateFrame(
  from: FaceGeometry,
  target: FaceGeometry,
  elapsed: number,
  options: AnimatedFaceOptions,
): AnimationFrame {
  if (options.reduced) {
    return { geometry: target, blink: 1, talk: 0, gaze: { x: 0, y: 0 } };
  }
  const duration = Math.max(0, options.duration);
  const progress = duration === 0 ? 1 : Math.min(1, Math.max(0, elapsed) / duration);
  return {
    geometry: interpolateFace(from, target, ease(progress, options.easing)),
    blink: options.blink ? calculateBlink(elapsed, options.seedPhase) : 1,
    talk: options.talking ? calculateTalk(elapsed) : 0,
    gaze: options.glance ? calculateGaze(elapsed, options.seedPhase) : { x: 0, y: 0 },
  };
}
