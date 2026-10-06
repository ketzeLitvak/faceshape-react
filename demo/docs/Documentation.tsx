import { useEffect, useState } from 'react';
import { Character } from '../../src';
import { SITE_PATH } from '../seo';
import { type DocsLanguage, DocsLanguageContext } from './language';
import { DOC_SECTIONS } from './navigation';
import * as Spanish from './sections';
import * as English from './sections/en';
import './documentation.css';

export function Documentation() {
  const [language, setLanguage] = useState<DocsLanguage>('en');
  useEffect(() => {
    try {
      if (localStorage.getItem('faceshape-docs-language') === 'es') {
        setLanguage('es');
      }
    } catch {
      /* Language selection remains available without browser storage. */
    }
  }, []);
  const sections = language === 'en' ? English : Spanish;
  const isEnglish = language === 'en';
  const {
    GettingStarted,
    FaceVariants,
    Expressions,
    Identity,
    Motion,
    CustomShapes,
    Variation,
    Composition,
    CustomStyles,
    UseCases,
    APIReference,
    Troubleshooting,
  } = sections;
  return (
    <DocsLanguageContext.Provider value={language}>
      <div className="documentation" lang={language}>
        <div className="docs-language-row">
          <label className="form-field">
            {isEnglish ? 'Documentation language' : 'Idioma de la documentación'}
            <select
              value={language}
              onChange={(event) => {
                const next = event.target.value as DocsLanguage;
                setLanguage(next);
                try {
                  localStorage.setItem('faceshape-docs-language', next);
                } catch {
                  /* Storage is optional. */
                }
              }}
            >
              <option value="en" lang="en">
                English
              </option>
              <option value="es" lang="es">
                Español
              </option>
            </select>
          </label>
        </div>
        <section className="docs-hero" id="docs">
          <div>
            <div className="eyebrow">
              {isEnglish ? 'FACESHAPE GUIDE' : 'GUÍA DE FACESHAPE'}
            </div>
            <h1>
              {isEnglish ? 'From a shape' : 'De una forma'}
              <br />
              {isEnglish ? 'to a character.' : 'a un personaje.'}
            </h1>
            <p>
              {isEnglish
                ? 'Choose its features, give it a name and animate its expression. Explore the complete contract, examples and ways to extend it.'
                : 'Elegí sus rasgos, dale un nombre y animá su expresión. Acá encontrás el contrato completo, ejemplos y formas de extenderlo.'}
            </p>
            <a className="docs-cta" href={SITE_PATH}>
              {isEnglish ? 'Try in the playground' : 'Probar en el playground'}
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
          <Character
            name="Documentación"
            shape="square"
            face={{ eyes: 'bright', mouth: 'cat', eyebrows: 'expression' }}
            expression="happy"
            size={200}
            reducedMotion
            label={
              isEnglish ? 'Documentation character' : 'Personaje de la documentación'
            }
          />
        </section>
        <div className="docs-layout">
          <nav
            className="docs-sidebar"
            aria-label={isEnglish ? 'Documentation contents' : 'Índice de documentación'}
          >
            <span>{isEnglish ? 'IN THIS GUIDE' : 'EN ESTA GUÍA'}</span>
            {DOC_SECTIONS.map(({ id, label, english }) => (
              <a key={id} href={`#${id}`}>
                {isEnglish ? english : label}
              </a>
            ))}
          </nav>
          <article className="docs-content">
            <GettingStarted />
            <FaceVariants />
            <Expressions />
            <Identity />
            <Motion />
            <CustomShapes />
            <Variation />
            <Composition />
            <CustomStyles />
            <UseCases />
            <APIReference />
            <Troubleshooting />
            <a className="docs-cta" href={SITE_PATH}>
              {isEnglish ? 'Try more combinations' : 'Volver a probar combinaciones'}
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </DocsLanguageContext.Provider>
  );
}
