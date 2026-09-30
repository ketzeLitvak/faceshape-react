import { EYE_OPTIONS, MOUTH_OPTIONS } from '../options';
import { SHAPES, EXPRESSIONS, type ShapeName, type ExpressionName } from '../../src';
import type { usePlayground } from '../hooks/usePlayground';

export function PlaygroundControls(props: ReturnType<typeof usePlayground>) {
  const { shape, setShape, eyes, setEyes, mouth, setMouth, expression, setExpression, color, fixedColor, setFixedColor, name, setName, reduced, setReduced, motionDisabled, capabilities, motion, setMotion, toggle } = props;
  return <aside className="controls">
    <div className="control-head">
      <h2>Tu personaje</h2>
    </div>
    <label className="name-field">NOMBRE
      <input aria-label="Nombre del personaje" value={name} onChange={event => setName(event.target.value)} placeholder="Elegí un nombre" />
    </label>
    <fieldset>
      <legend>FORMA</legend>
      <div className="options">
        {([...Object.keys(SHAPES), 'heart', 'shark'] as (ShapeName | 'heart' | 'shark')[]).map(value => <button key={value} aria-pressed={shape === value} onClick={() => setShape(value)}>{({ circle: 'Círculo', blob: 'Blob', square: 'Cuadrado', star: 'Estrella', heart: 'Corazón', shark: 'Tiburón' })[value]}
        </button>)}
      </div>
    </fieldset>
    <fieldset>
      <legend>OJOS</legend>
      <div className="options" aria-label="Opciones de ojos">
        {EYE_OPTIONS.map(({ value, label }) => <button key={value} aria-pressed={eyes === value} onClick={() => setEyes(value)}>{label}
        </button>)}
        <button aria-pressed={eyes === ''} onClick={() => setEyes('')}>Según expresión</button>
      </div>
    </fieldset>
    <fieldset>
      <legend>BOCA</legend>
      <div className="options" aria-label="Opciones de boca">
        {MOUTH_OPTIONS.map(({ value, label }) => <button key={value} aria-pressed={mouth === value} onClick={() => setMouth(value)}>{label}
        </button>)}
        <button aria-pressed={mouth === ''} onClick={() => setMouth('')}>Según expresión</button>
      </div>
    </fieldset>
    <fieldset>
      <legend>EXPRESIÓN</legend>
      <div className="options">
        {(Object.keys(EXPRESSIONS) as ExpressionName[]).map(value => <button key={value} aria-pressed={expression === value} onClick={() => setExpression(value)}>{value}
        </button>)}
      </div>
    </fieldset>
    <fieldset>
      <legend>MOVIMIENTO</legend>
      <div className="motions">
        {(['idle', 'blink', 'bounce', 'shake', 'talking'] as const).map(key => {
          const unsupported = key === 'blink' ? !capabilities.blink : key === 'talking' ? !capabilities.talking : false;
          const disabled = motionDisabled || unsupported;
          return <label key={key} className={disabled ? 'motion-unavailable' : undefined} title={motionDisabled ? 'Movimiento reducido activo' : unsupported ? 'Esta variante no admite este movimiento' : undefined}>
            <input aria-label={key} type="checkbox" checked={!!motion[key]} disabled={disabled} onChange={() => toggle(key)} />
            <span>{key}
            </span>
          </label>;
        })}
      </div>
      <label className={`switch-row ${!capabilities.lookAt || motionDisabled ? 'motion-unavailable' : ''}`}>
        <span>Seguir el cursor</span>
        <input aria-label="Seguir el cursor" type="checkbox" checked={motion.lookAt === 'cursor'} disabled={!capabilities.lookAt || motionDisabled} onChange={event => setMotion(value => ({ ...value, lookAt: event.target.checked ? 'cursor' : undefined }))} />
      </label>
    </fieldset>
    <fieldset>
      <legend>COLOR</legend>
      <div className="options color-mode">
        <button aria-pressed={fixedColor === undefined} onClick={() => setFixedColor(undefined)}>Por nombre</button>
        <button aria-pressed={fixedColor !== undefined} onClick={() => setFixedColor(color)}>Color fijo</button>
      </div>
      <div className="swatches">
        {['#89d9c3', '#b9a1ef', '#ffbe8a', '#f18da3', '#8ac8ef'].map(value => <button key={value} aria-label={`Color ${value}`} aria-pressed={fixedColor === value} style={{ background: value }} onClick={() => setFixedColor(value)} />)}
        <input aria-label="Color fijo" type="color" value={color} onChange={event => setFixedColor(event.target.value)} />
        <span className="color-value">{color}
        </span>
      </div>
    </fieldset>
    <label className="switch-row">
      <span>Reducir movimiento</span>
      <input aria-label="Reducir movimiento" type="checkbox" checked={reduced} onChange={event => setReduced(event.target.checked)} />
    </label>
  </aside>;
}
