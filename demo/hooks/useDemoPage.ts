import { useEffect, useState } from 'react';
import { DOCS_PATH, SITE_PATH, updatePageMetadata } from '../seo';

export type DemoPage = 'demo' | 'docs' | 'collection' | 'validation';

export function useDemoPage(initialPage: 'demo' | 'docs' = 'demo') {
  const [page, setPage] = useState<DemoPage>(initialPage);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#docs') && window.location.pathname !== DOCS_PATH) {
        window.history.replaceState(
          null,
          '',
          `${DOCS_PATH}${window.location.search}${hash === '#docs' ? '' : hash}`,
        );
      }
      const next = hash.startsWith('#collection')
        ? 'collection'
        : hash.startsWith('#validation')
          ? 'validation'
          : window.location.pathname === DOCS_PATH
            ? 'docs'
            : 'demo';
      setPage(next);
      updatePageMetadata(next === 'docs' ? 'docs' : 'demo');
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = hash.startsWith('#docs-')
          ? document.getElementById(hash.slice(1))
          : document.getElementById('page-content');
        section?.setAttribute('tabindex', '-1');
        section?.focus({ preventScroll: true });
        if (hash.startsWith('#docs-')) {
          section?.scrollIntoView();
        } else {
          window.scrollTo({ top: 0 });
        }
      });
    };
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) {
        return;
      }
      const url = new URL(anchor.href);
      if (
        url.origin !== window.location.origin ||
        ![SITE_PATH, DOCS_PATH].includes(url.pathname)
      ) {
        return;
      }
      event.preventDefault();
      window.history.pushState(null, '', url);
      update();
    };
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    document.addEventListener('click', navigate);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
      document.removeEventListener('click', navigate);
    };
  }, []);
  return page;
}
