import type { Easing } from './types';

export function clamp(value: number, min: number, max: number): number {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
}

export function ease(t: number, easing: Easing = 'ease-out'): number {
  t = clamp(t, 0, 1);
  return easing === 'linear'
    ? t
    : easing === 'ease-in-out'
      ? t * t * (3 - 2 * t)
      : 1 - (1 - t) ** 3;
}
