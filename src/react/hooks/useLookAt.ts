import { useEffect, useState, type RefObject } from 'react';
import { clamp } from '../../core/math';
import type { LookTarget } from '../types';
export function useLookAt(svgRef: RefObject<SVGSVGElement | null>, lookAt: LookTarget | undefined, reduced: boolean) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const cursorMode = lookAt === 'cursor';
  useEffect(() => {
    if (!cursorMode || reduced)
      return;
    let raf = 0;
    let latest = { x: 0, y: 0 };
    const update = (event: PointerEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0)
        return;
      latest = { x: clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * .75), -1, 1), y: clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * .75), -1, 1) };
      if (!raf)
        raf = requestAnimationFrame(() => { raf = 0; setCursor(latest); });
    };
    const reset = () => setCursor({ x: 0, y: 0 });
    window.addEventListener('pointermove', update, { passive: true });
    window.addEventListener('blur', reset);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', update); window.removeEventListener('blur', reset); };
  }, [cursorMode, reduced]);
  let look = { x: 0, y: 0 };
  if (!reduced) {
    if (cursorMode)
      look = cursor;
    else if (typeof lookAt === 'object')
      look = { x: clamp(lookAt.x, 0, 1) * 2 - 1, y: clamp(lookAt.y, 0, 1) * 2 - 1 };
  }
  return look;
}
