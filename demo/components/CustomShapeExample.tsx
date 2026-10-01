import { Character, Eyebrows, Eyes, Mouth } from '../../src';
import { heart } from '../shapes';

export function CustomShapeExample({ reduced }: { reduced: boolean }) {
  return (
    <section className="custom-example">
      <div>
        <div className="eyebrow">TU SILUETA. TU CARA.</div>
        <h2>Traé tu propio SVG.</h2>
        <p>
          Definí dónde vive la cara y combiná sus partes. Este corazón es una forma
          personalizada.
        </p>
      </div>
      <Character
        shape={heart}
        color="#f18da3"
        size={160}
        motion={{ idle: true }}
        reducedMotion={reduced}
        label="Corazón personalizado"
      >
        <Eyebrows variant="raised" />
        <Eyes variant="cute" />
        <Mouth variant="grin" />
      </Character>
    </section>
  );
}
