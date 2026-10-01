import { useEffect, useMemo, useRef, useState } from 'react';
import type { FaceGeometry } from '../../core/types';
import { calculateFrame } from '../animation/calculateFrame';
import type { AnimatedFaceOptions } from '../types';

export function useAnimatedFace(target: FaceGeometry, options: AnimatedFaceOptions) {
  const geometryKey = JSON.stringify(target);
  const stableTarget = useMemo(
    () => JSON.parse(geometryKey) as FaceGeometry,
    [geometryKey],
  );
  const [frame, setFrame] = useState(() =>
    calculateFrame(stableTarget, stableTarget, 0, { ...options, reduced: true }),
  );
  const current = useRef(stableTarget);
  const { duration, easing, blink, talking, reduced, seedPhase, glance } = options;

  useEffect(() => {
    const settings = { duration, easing, blink, talking, reduced, seedPhase, glance };
    if (reduced) {
      current.current = stableTarget;
      setFrame(calculateFrame(stableTarget, stableTarget, 0, settings));
      return;
    }
    const from = current.current;
    let raf = 0;
    let start: number | undefined;
    const loop = (time: number) => {
      start ??= time;
      const elapsed = time - start;
      const next = calculateFrame(from, stableTarget, elapsed, settings);
      current.current = next.geometry;
      setFrame(next);
      if (elapsed < Math.max(0, duration) || blink || talking || glance) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [stableTarget, duration, easing, blink, talking, reduced, seedPhase, glance]);

  return frame;
}
