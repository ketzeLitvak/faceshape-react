import type { ReactNode } from 'react';
import { EXPRESSIONS, type ExpressionName } from '../../src';
import type { usePlayground } from '../hooks/usePlayground';
import {
  BROW_OPTIONS,
  EYE_OPTIONS,
  MOUTH_OPTIONS,
  SHAPE_GROUPS,
  SHAPE_LABELS,
} from '../options';
import { IconButton } from './IconButton';

export function PlaygroundControls(
  props: ReturnType<typeof usePlayground> & { actions?: ReactNode },
) {
  const {
    shape,
    setShape,
    eyes,
    setEyes,
    eyebrows,
    setEyebrows,
    mouth,
    setMouth,
    expression,
    setExpression,
    color,
    fixedColor,
    setFixedColor,
    name,
    setName,
    reduced,
    setReduced,
    motionDisabled,
    capabilities,
    motion,
    setMotion,
    toggle,
  } = props;
  return (
    <aside className="controls">
      <div className="control-head">
        <h2>Tu personaje</h2>
        {props.actions}
      </div>
      <div className="name-field">
        <label htmlFor="character-name">NOMBRE</label>
        <div className="name-input-row">
          <input
            id="character-name"
            aria-label="Nombre del personaje"
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Elegí un nombre"
          />
          <IconButton
            icon="shuffle"
            label="Generar otro nombre"
            onClick={props.randomizeName}
          />
        </div>
      </div>
      <fieldset>
        <legend>FORMA</legend>
        <div className="options">
          {SHAPE_GROUPS.flatMap((group) => group.shapes).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={shape === value}
              onClick={() => setShape(value)}
            >
              {SHAPE_LABELS[value]}
            </button>
          ))}
        </div>
      </fieldset>
      <section className="face-controls" aria-label="Rasgos del personaje">
        <fieldset>
          <legend>OJOS</legend>
          <div className="options">
            {EYE_OPTIONS.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                aria-pressed={eyes === value}
                onClick={() => setEyes(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>BOCA</legend>
          <div className="options">
            {MOUTH_OPTIONS.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                aria-pressed={mouth === value}
                onClick={() => setMouth(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>CEJAS</legend>
          <div className="options">
            {BROW_OPTIONS.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                aria-pressed={eyebrows === value}
                onClick={() => setEyebrows(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </section>
      <fieldset>
        <legend>EXPRESIÓN</legend>
        <div className="options">
          {(Object.keys(EXPRESSIONS) as ExpressionName[]).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={expression === value}
              onClick={() => setExpression(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>COLOR</legend>
        <div className="options color-mode">
          <button
            type="button"
            aria-pressed={fixedColor === undefined}
            onClick={() => setFixedColor(undefined)}
          >
            Por nombre
          </button>
          <button
            type="button"
            aria-pressed={fixedColor !== undefined}
            onClick={() => setFixedColor(color)}
          >
            Color fijo
          </button>
        </div>
        <div className="swatches">
          {['#89d9c3', '#b9a1ef', '#ffbe8a', '#f18da3', '#8ac8ef'].map((value) => (
            <button
              type="button"
              key={value}
              aria-label={`Color ${value}`}
              aria-pressed={fixedColor === value}
              style={{ background: value }}
              onClick={() => setFixedColor(value)}
            />
          ))}
          <input
            aria-label="Color fijo"
            type="color"
            value={color}
            onChange={(event) => setFixedColor(event.target.value)}
          />
          <span className="color-value">{color}</span>
        </div>
      </fieldset>
      <fieldset>
        <legend>MOVIMIENTO</legend>
        <div className="motions">
          {(['idle', 'blink', 'bounce', 'shake', 'talking'] as const).map((key) => {
            const unsupported =
              key === 'blink'
                ? !capabilities.blink
                : key === 'talking'
                  ? !capabilities.talking
                  : false;
            const disabled = motionDisabled || unsupported;
            return (
              <label
                key={key}
                className={disabled ? 'motion-unavailable' : undefined}
                title={
                  motionDisabled
                    ? 'Movimiento reducido activo'
                    : unsupported
                      ? 'Esta variante no admite este movimiento'
                      : undefined
                }
              >
                <input
                  aria-label={key}
                  type="checkbox"
                  checked={!!motion[key]}
                  disabled={disabled}
                  onChange={() => toggle(key)}
                />
                <span>{key}</span>
              </label>
            );
          })}
        </div>
        <label
          className={`switch-row ${!capabilities.lookAt || motionDisabled ? 'motion-unavailable' : ''}`}
        >
          <span>Seguir cursor o toque</span>
          <input
            aria-label="Seguir cursor o toque"
            type="checkbox"
            checked={motion.lookAt === 'cursor'}
            disabled={!capabilities.lookAt || motionDisabled}
            onChange={(event) =>
              setMotion((value) => ({
                ...value,
                lookAt: event.target.checked ? 'cursor' : undefined,
              }))
            }
          />
        </label>
      </fieldset>
      <label className="switch-row">
        <span>Reducir movimiento</span>
        <input
          aria-label="Reducir movimiento"
          type="checkbox"
          checked={reduced}
          onChange={(event) => setReduced(event.target.checked)}
        />
      </label>
    </aside>
  );
}
