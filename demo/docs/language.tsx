import { createContext, useContext } from 'react';

export type DocsLanguage = 'en' | 'es';
export const DocsLanguageContext = createContext<DocsLanguage>('es');
export const useDocsLanguage = () => useContext(DocsLanguageContext);
