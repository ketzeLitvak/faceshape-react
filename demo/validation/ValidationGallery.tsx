import { useState } from 'react';
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
import { CUSTOM_SHAPES } from '../shapes';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import type { DemoShape } from '../types';
import { PosePreview, type PreviewPose } from './PosePreview';

const names = ['Ana', 'Bruno', 'Cielo'];
const sizes = [32, 48, 160];
const shapes = { ...SHAPES, ...CUSTOM_SHAPES };

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
  const [shape, setShape] = useState<DemoShape>('cloud');
  const [dark, setDark] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [phase, setPhase] = useState<ExpressionName>('happy');
  return (
    <section className="validation-page">
      <h1>Validación visual</h1>
      <p>
        Compará nombres, tamaños y expresiones con los rasgos que elegiste en el
        playground.
      </p>
      <div className="workbench-actions">
        {(
          [
            { key: 'eyes', label: 'Ojos', options: EYE_OPTIONS },
            { key: 'mouth', label: 'Boca', options: MOUTH_OPTIONS },
            { key: 'eyebrows', label: 'Cejas', options: BROW_OPTIONS },
          ] as const
        ).map((part) => (
          <label key={part.key}>
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
        <label>
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
        <label>
          <input
            type="checkbox"
            checked={animated}
            onChange={(e) => setAnimated(e.target.checked)}
          />{' '}
          Blink y mirada
        </label>
      </div>
      <div className={`validation-grid ${dark ? 'validation-dark' : ''}`}>
        {names.map((name) =>
          (Object.keys(EXPRESSIONS) as ExpressionName[]).map((expression) => (
            <article key={`${name}-${expression}`}>
              <span>
                {name} · {expression}
              </span>
              <div className="validation-sizes">
                {sizes.map((size) => (
                  <Character
                    key={size}
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
                ))}
              </div>
            </article>
          )),
        )}
      </div>
      <h2>Poses de inspección</h2>
      <p>
        Poses detenidas para inspeccionar contornos, brillos y cejas. En cíclope hay un
        solo ojo.
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
      <h2>Transiciones y movimiento</h2>
      <p>
        Cambiá la expresión para revisar la transición. El movimiento respeta la
        preferencia del sistema.
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
      <Character
        shape={resolveDemoShape(shape)}
        face={face}
        name="Transición"
        expression={phase}
        transition={{ duration: 1200 }}
        size={220}
        motion={{ blink: true, lookAt: 'cursor', talking: true }}
      />
      <h2>Partes ausentes</h2>
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
    </section>
  );
}
