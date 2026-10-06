import { useId, useState } from 'react';
import {
  Character,
  EXPRESSIONS,
  type ExpressionName,
  type FaceConfig,
  interpolateFace,
  resolveExpression,
  SHAPES,
} from '../../src';
import { BROW_OPTIONS, EYE_OPTIONS, MOUTH_OPTIONS } from '../options';
import { DEMO_SHAPES } from '../shapes';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import type { DemoShape } from '../types';
import { InspectionTabs, type InspectionView } from './InspectionTabs';
import { PosePreview, type PreviewPose } from './PosePreview';

const names = ['Ana', 'Bruno', 'Cielo'];
const sizes = [32, 48, 160];
const shapes = { ...SHAPES, ...DEMO_SHAPES };

const poses: PreviewPose[] = [
  { id: 'open', label: 'Abiertos', blink: 1 },
  { id: 'half', label: 'Medio blink', blink: 0.5 },
  { id: 'closed', label: 'Blink cerrado', blink: 0 },
  { id: 'reopen', label: 'Reapertura', blink: 0.75 },
  { id: 'wink-left', label: 'Guiño izquierdo', blink: 1, wink: 0 },
  { id: 'wink-right', label: 'Guiño derecho', blink: 1, wink: 1 },
  { id: 'look-left', label: 'Mirada izquierda', blink: 1, look: { x: -1, y: -1 } },
  { id: 'look-right', label: 'Mirada derecha', blink: 1, look: { x: 1, y: 1 } },
  {
    id: 'happy-surprise',
    label: 'Happy → surprised · 50%',
    blink: 1,
    geometry: interpolateFace(
      resolveExpression('happy'),
      resolveExpression('surprised'),
      0.5,
    ),
  },
  {
    id: 'angry-sad',
    label: 'Angry → sad · 50%',
    blink: 1,
    geometry: interpolateFace(resolveExpression('angry'), resolveExpression('sad'), 0.5),
  },
];

export function ValidationGallery({ face: initialFace }: { face: FaceConfig }) {
  const [face, setFace] = useState(initialFace);
  const [view, setView] = useState<InspectionView>('expressions');
  const panelId = useId();
  const [shape, setShape] = useState<DemoShape>('cloud');
  const [dark, setDark] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [phase, setPhase] = useState<ExpressionName>('happy');
  return (
    <section className="validation-page">
      <h1>Inspección visual</h1>
      <p>
        Explorá cómo se ve una combinación de forma y rasgos en distintos estados. Esta
        galería ayuda a revisar el dibujo a simple vista: no emite un resultado de
        aprobado o rechazado ni ejecuta los tests automáticos de la librería.
      </p>
      <div className="workbench-actions">
        {(
          [
            { key: 'eyes', label: 'Ojos', options: EYE_OPTIONS },
            { key: 'mouth', label: 'Boca', options: MOUTH_OPTIONS },
            { key: 'eyebrows', label: 'Cejas', options: BROW_OPTIONS },
          ] as const
        ).map((part) => (
          <label className="form-field" key={part.key}>
            {part.label}{' '}
            <select
              value={face[part.key]}
              onChange={(event) => setFace({ ...face, [part.key]: event.target.value })}
            >
              {part.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label className="form-field">
          Forma{' '}
          <select value={shape} onChange={(e) => setShape(e.target.value as DemoShape)}>
            {Object.keys(shapes).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />{' '}
          Fondo oscuro
        </label>
        {view === 'expressions' && (
          <label>
            <input
              type="checkbox"
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
            />{' '}
            Animar las muestras
          </label>
        )}
      </div>
      <InspectionTabs value={view} onChange={setView} panelId={panelId} />
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${panelId}-${view}`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Static tab panels need a keyboard entry point.
        tabIndex={0}
      >
        {view === 'expressions' && (
          <>
            <h2>La misma identidad, seis expresiones</h2>
            <p>
              Dentro de cada grupo, el nombre mantiene la forma y el color. Revisá si las
              expresiones se distinguen y si los rasgos se leen a 32, 48 y 160 px.
            </p>
            {names.map((name) => (
              <section className="identity-samples" key={name}>
                <h3>{name}</h3>
                <p>
                  Variación por nombre · la configuración facial es la misma en todas las
                  muestras.
                </p>
                <div className={`validation-grid ${dark ? 'validation-dark' : ''}`}>
                  {(Object.keys(EXPRESSIONS) as ExpressionName[]).map((expression) => (
                    <article key={expression}>
                      <span>
                        {name} · {expression}
                      </span>
                      <div className="validation-sizes">
                        {sizes.map((size) => (
                          <figure key={size}>
                            <Character
                              shape={resolveDemoShape(shape)}
                              name={name}
                              expression={expression}
                              face={face}
                              size={size}
                              reducedMotion={!animated}
                              motion={{
                                blink: animated,
                                glance: animated,
                                lookAt: animated ? 'cursor' : undefined,
                              }}
                            />
                            <figcaption>{size} px</figcaption>
                          </figure>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
        {view === 'poses' && (
          <>
            <h2>Poses de inspección</h2>
            <p>
              Son instantes detenidos del parpadeo y la mirada, más dos puntos intermedios
              entre expresiones. Revisá que los brillos acompañen al ojo, las cejas no
              dejen huecos y la boca conserve su contorno. En cíclope, el guiño
              corresponde al único ojo.
            </p>
            <div className={`validation-grid ${dark ? 'validation-dark' : ''}`}>
              {poses.map((pose) => (
                <article key={pose.id}>
                  <span>{pose.label}</span>
                  <Character
                    shape={resolveDemoShape(shape)}
                    name="Ana"
                    face={face}
                    expression="neutral"
                    size={160}
                    reducedMotion
                  >
                    <PosePreview face={face} pose={pose} />
                  </Character>
                </article>
              ))}
            </div>
          </>
        )}
        {view === 'motion' && (
          <>
            <h2>Transiciones en vivo</h2>
            <p>
              Elegí una expresión y observá el recorrido hasta la siguiente. Revisá que no
              aparezcan saltos, dientes flotantes o rasgos fuera de la forma. El
              movimiento respeta la preferencia de movimiento reducido de tu sistema.
            </p>
            <div className="workbench-actions">
              {(Object.keys(EXPRESSIONS) as ExpressionName[]).map((expression) => (
                <button
                  type="button"
                  key={expression}
                  aria-pressed={phase === expression}
                  onClick={() => setPhase(expression)}
                >
                  {expression}
                </button>
              ))}
            </div>
            <div className={`inspection-live ${dark ? 'validation-dark' : ''}`}>
              <Character
                shape={resolveDemoShape(shape)}
                face={face}
                name="Transición"
                expression={phase}
                transition={{ duration: 1200 }}
                size={220}
                motion={{ blink: true, lookAt: 'cursor', talking: true }}
              />
            </div>
          </>
        )}
        {view === 'parts' && (
          <>
            <h2>Partes ocultas</h2>
            <p>
              Cada muestra oculta una parte. Revisá que tampoco queden brillos, cachetes u
              otras decoraciones de ese rasgo.
            </p>
            <div className="validation-hidden">
              {(['eyes', 'mouth', 'eyebrows'] as const).map((part) => (
                <article key={part}>
                  <Character
                    shape={resolveDemoShape(shape)}
                    face={{ ...face, [part]: 'none' }}
                    name="Ana"
                    size={140}
                    reducedMotion
                  />
                  <span>Sin {part}</span>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
