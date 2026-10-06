import { Character, type FaceConfig } from '../../src';
import { SHAPE_LABELS } from '../options';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import type { DemoShape } from '../types';
import { VARIANT_EXAMPLES } from './variantExamples';

export function ShapeVariants({
  shape,
  face,
  dark,
}: {
  shape: DemoShape;
  face: FaceConfig;
  dark: boolean;
}) {
  const categories = VARIANT_EXAMPLES[shape];
  const examples =
    categories ??
    ['Ana', 'Bruno', 'Cielo', 'Dalia', 'Eze', 'Luna', 'Nube', 'Sol'].map((name) => ({
      name,
      label: name,
    }));
  return (
    <section>
      <h2>Variantes de {SHAPE_LABELS[shape]}</h2>
      <p>
        {categories
          ? 'Un ejemplo por categoría estructural. El nombre también cambia tamaños y posiciones dentro de cada categoría: esta vista no enumera todos los dibujos posibles.'
          : 'Una muestra de nombres para explorar colores y proporciones. Esta forma no tiene un catálogo de categorías estructurales.'}
      </p>
      <p>
        El mismo nombre reproduce siempre la misma variante. Podés usar los nombres de
        estas tarjetas en el playground o en tu componente.
      </p>
      <div className={`validation-grid ${dark ? 'validation-dark' : ''}`}>
        {examples.map(({ name, label }) => (
          <article className="inspection-pose" key={name}>
            <Character
              shape={resolveDemoShape(shape)}
              name={name}
              face={face}
              expression="happy"
              size={160}
              reducedMotion
            />
            <strong>{label}</strong>
            <span>Nombre: {name}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
