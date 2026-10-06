import { createContext, useContext, useEffect, useState } from 'react';

export type DocsLanguage = 'en' | 'es';
export const DocsLanguageContext = createContext<DocsLanguage>('es');
export const useDocsLanguage = () => useContext(DocsLanguageContext);

export function useDocumentationLanguage() {
  const [language, setLanguage] = useState<DocsLanguage>('en');
  useEffect(() => {
    try {
      if (localStorage.getItem('faceshape-docs-language') === 'es') {
        setLanguage('es');
      }
    } catch {
      /* Storage is optional. */
    }
  }, []);
  const selectLanguage = (next: DocsLanguage) => {
    setLanguage(next);
    try {
      localStorage.setItem('faceshape-docs-language', next);
    } catch {
      /* Storage is optional. */
    }
  };
  return { language, selectLanguage };
}
