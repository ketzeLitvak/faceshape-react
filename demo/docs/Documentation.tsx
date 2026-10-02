import { Character } from '../../src';
import { DOC_SECTIONS } from './navigation';
import { APIReference } from './sections/APIReference';
import { Composition } from './sections/Composition';
import { CustomShapes } from './sections/CustomShapes';
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
          <a className="docs-cta" href="#demo">
            Probar en el playground ↗
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
          <UseCases />
          <APIReference />
          <Troubleshooting />
          <a className="docs-cta" href="#demo">
            Volver a probar combinaciones ↗
          </a>
        </article>
      </div>
    </div>
  );
}
