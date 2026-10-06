import { Character } from '../../src';
import { SITE_PATH } from '../seo';
import { DOC_SECTIONS } from './navigation';
import { APIReference } from './sections/APIReference';
import { Composition } from './sections/Composition';
import { CustomShapes } from './sections/CustomShapes';
import { CustomStyles } from './sections/CustomStyles';
import { Expressions } from './sections/Expressions';
import { FaceVariants } from './sections/FaceVariants';
import { GettingStarted } from './sections/GettingStarted';
import { Identity } from './sections/Identity';
import { Motion } from './sections/Motion';
import { Troubleshooting } from './sections/Troubleshooting';
import { UseCases } from './sections/UseCases';
import { Variation } from './sections/Variation';
import './documentation.css';

export function Documentation() {
  return (
    <div className="documentation">
      <section className="docs-hero" id="docs">
        <div>
          <div className="eyebrow">GUÍA DE FACESHAPE</div>
          <h1>
            De una forma
            <br />a un personaje.
          </h1>
          <p>
            Elegí sus rasgos, dale un nombre y animá su expresión. Acá encontrás el
            contrato completo, ejemplos y formas de extenderlo.
          </p>
          <a className="docs-cta" href={SITE_PATH}>
            Probar en el playground
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
          label="Personaje de la documentación"
        />
      </section>
      <div className="docs-layout">
        <nav className="docs-sidebar" aria-label="Índice de documentación">
          <span>EN ESTA GUÍA</span>
          {DOC_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}>
              {label}
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
            Volver a probar combinaciones
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
  );
}
