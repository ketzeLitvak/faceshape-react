import {
  Character,
  type ExpressionName,
  type FaceStyle,
  type ShapeName,
} from '../../src';

export function ExpressionGallery({
  faceStyle,
  reduced,
}: {
  faceStyle: FaceStyle;
  reduced: boolean;
}) {
  return (
    <section className="gallery">
      <div className="section-head">
        <h2>
          Una misma cara.
          <br />
          Todo un elenco.
        </h2>
        <p>
          Las expresiones se adaptan al <code>faceBox</code> de cada forma.
        </p>
      </div>
      <div className="cards">
        {(
          ['neutral', 'happy', 'sad', 'angry', 'surprised', 'sleepy'] as ExpressionName[]
        ).map((e, i) => (
          <article key={e}>
            <Character
              shape={
                (['circle', 'blob', 'square', 'star', 'circle', 'blob'] as ShapeName[])[i]
              }
              expression={e}
              faceStyle={faceStyle}
              color={
                ['#b9a1ef', '#89d9c3', '#8ac8ef', '#ffbe8a', '#f18da3', '#b9a1ef'][i]
              }
              size={140}
              motion={{ blink: true, idle: true }}
              reducedMotion={reduced}
              label={e}
            />
            <span>{e}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
