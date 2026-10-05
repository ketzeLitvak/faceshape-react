import { Character, type CustomShape, Eyebrows, Eyes, Mouth } from '../../src';

const gem: CustomShape = {
  path: 'M50 8 L91 38 L75 85 H25 L9 38Z',
  faceBox: { x: 0.3, y: 0.32, width: 0.4, height: 0.36 },
};

export function CustomShapeExample({ reduced }: { reduced: boolean }) {
  return (
    <section className="custom-example">
      <div>
        <div className="eyebrow">TU SILUETA. TU CARA.</div>
        <h2>Traé tu propio SVG.</h2>
        <p>
          Definí dónde vive la cara y combiná sus partes. Esta gema es una forma
          personalizada.
        </p>
      </div>
      <Character
        shape={gem}
        face={{ eyes: 'cute', mouth: 'wide', eyebrows: 'raised' }}
        color="#f18da3"
        size={160}
        motion={{ idle: true }}
        reducedMotion={reduced}
        label="Gema personalizada"
      >
        <Eyebrows variant="raised" />
        <Eyes variant="cute" />
        <Mouth variant="wide" />
      </Character>
    </section>
  );
}
