import { useEffect, useState } from 'react';

export function useDemoPage() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const update = () => {
      const next = window.location.hash;
      setHash(next);
      requestAnimationFrame(() => {
        if (next.startsWith('#docs-')) {
          document.getElementById(next.slice(1))?.scrollIntoView();
        } else {
          window.scrollTo({ top: 0 });
        }
      });
    };
    window.addEventListener('hashchange', update);
    update();
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return hash.startsWith('#docs')
    ? 'docs'
    : hash.startsWith('#validation')
      ? 'validation'
      : 'demo';
}
