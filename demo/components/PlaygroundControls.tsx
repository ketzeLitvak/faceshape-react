import { STYLE_OPTIONS, EYE_OPTIONS, MOUTH_OPTIONS } from '../options';
import { SHAPES, EXPRESSIONS, type ShapeName, type ExpressionName, type EyeVariant, type MouthVariant } from '../../src';
import type { usePlayground } from '../hooks/usePlayground';
export function PlaygroundControls(props: ReturnType<typeof usePlayground>) {
  const { shape, setShape, faceStyle, setFaceStyle, eyes, setEyes, mouth, setMouth, expression, setExpression, color, setColor, seed, setSeed, reduced, setReduced, motion, setMotion, toggle } = props;
  return (<aside className="controls">
    <div className="control-head">
      <h2>Tu personaje</h2>
      <span>01 / CUSTOMIZE</span>
    </div>
    <fieldset>
      <legend>FORMA</legend>
      <div className="options">{([...Object.keys(SHAPES), 'heart', 'shark'] as (ShapeName | 'heart' | 'shark')[]).map(s => <button key={s} aria-pressed={shape === s} onClick={() => setShape(s)}>{({ circle: 'Círculo', blob: 'Blob', square: 'Cuadrado', star: 'Estrella', heart: 'Corazón', shark: 'Tiburón' })[s]}
      </button>)}
      </div>
    </fieldset>
    <fieldset>
      <legend>ESTILO VISUAL</legend>
      <div className="options">
        {STYLE_OPTIONS.map(option =>
          <button key={option.value} aria-pressed={faceStyle === option.value} onClick={() => { setFaceStyle(option.value); setEyes(''); setMouth(''); }}>{option.label}
          </button>)}
      </div>
    </fieldset>
    <div className="face-parts">
      <label>OJOS<select aria-label="Variante de ojos" value={eyes} onChange={e => setEyes(e.target.value as EyeVariant | '')}>
        <option value="">Según estilo / expresión</option>{EYE_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}
        </option>)}
      </select>
      </label>
      <label>BOCA<select aria-label="Variante de boca" value={mouth} onChange={e => setMouth(e.target.value as MouthVariant | '')}>
        <option value="">Según estilo / expresión</option>{MOUTH_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}
        </option>)}
      </select>
      </label>
    </div>
    <fieldset>
      <legend>EXPRESIÓN</legend>
      <div className="options">{(Object.keys(EXPRESSIONS) as ExpressionName[]).map(e => <button key={e} aria-pressed={expression === e} onClick={() => setExpression(e)}>{e}
      </button>)}
      </div>
    </fieldset>
    <fieldset>
      <legend>MOVIMIENTO</legend>
      <div className="motions">{(['idle', 'blink', 'bounce', 'shake', 'talking'] as const).map(k => <label key={k}>
        <input type="checkbox" checked={!!motion[k]} onChange={() => toggle(k)} />
        <span>{k}
        </span>
      </label>)}
      </div>
      <label className="switch-row">
        <span>Seguir el cursor</span>
        <input type="checkbox" checked={motion.lookAt === 'cursor'} onChange={e => setMotion(m => ({ ...m, lookAt: e.target.checked ? 'cursor' : undefined }))} />
      </label>
    </fieldset>
    <div className="color-row">
      <label htmlFor="color">COLOR</label>
      <div className="swatches">{['#89d9c3', '#b9a1ef', '#ffbe8a', '#f18da3', '#8ac8ef'].map(c => <button key={c} aria-label={`Color ${c}`} onClick={() => setColor(c)} style={{ background: c }} aria-pressed={color === c} />)}
        <input id="color" type="color" value={color} onChange={e => setColor(e.target.value)} />
      </div>
    </div>
    <label className="seed">SEED <input value={seed} onChange={e => setSeed(e.target.value)} placeholder="Una identidad reproducible" />
    </label>
    <label className="switch-row">
      <span>Reducir movimiento</span>
      <input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} />
    </label>
  </aside>);
}
