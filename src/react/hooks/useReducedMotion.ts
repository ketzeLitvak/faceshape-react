import { useEffect, useState } from 'react';
export function useReducedMotion(explicit = false): boolean {
  const [preferred, setPreferred] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPreferred(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return explicit || preferred;
}
