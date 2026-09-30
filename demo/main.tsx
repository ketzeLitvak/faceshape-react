import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Character, Eyes, Mouth, Eyebrows, SHAPES, EXPRESSIONS, defineShape, type ExpressionName, type ShapeName, type MotionConfig, type CustomShape, type FaceStyle, type EyeVariant, type MouthVariant } from '../src';
import './style.css';
const heart=defineShape({path:'M50 88 C40 79 7 57 7 31 C7 9 37 5 50 24 C63 5 93 9 93 31 C93 57 60 79 50 88Z',faceBox:{x:.23,y:.27,width:.54,height:.4}});
const shark: CustomShape = {
 viewBox: '0 0 100 100',
 faceBox: { x: .25, y: .32, width: .5, height: .35 },
 render: ({ color }) => <g data-faceshape-shark="">
  <path d="M42 27 L51 3 Q61 11 64 27 C76 32 80 43 79 57 L95 75 Q84 79 75 71 C72 85 62 94 50 94 C38 94 28 85 25 71 Q16 79 5 75 L21 57 C20 43 26 32 42 27Z" fill={color}/>
  <path d="M50 48 C62 48 70 63 70 76 C65 87 58 91 50 91 C42 91 35 87 30 76 C30 63 38 48 50 48Z" fill="#edf8f6"/>
  <g fill="none" stroke="#182b35" strokeOpacity={.3} strokeWidth={1.1} strokeLinecap="round">
   <path d="M24 50 L26 55 M23 56 L25 60 M76 50 L74 55 M77 56 L75 60"/>
  </g>
 </g>,
};
function App(){
 const [shape,setShape]=useState<ShapeName|'heart'|'shark'>('shark');
 const [faceStyle,setFaceStyle]=useState<FaceStyle>('soft');
 const [eyes,setEyes]=useState<EyeVariant|''>('');
 const [mouth,setMouth]=useState<MouthVariant|''>('');
 const face={eyes:eyes||undefined,mouth:mouth||undefined};
 const [expression,setExpression]=useState<ExpressionName>('happy');
 const [color,setColor]=useState('#89d9c3');
 const [seed,setSeed]=useState('hello');
 const [reduced,setReduced]=useState(false);
 const [motion,setMotion]=useState<MotionConfig>({idle:true,blink:true,lookAt:'cursor'});
 const toggle=(key:'idle'|'blink'|'bounce'|'shake'|'talking')=>setMotion(m=>({...m,[key]:!m[key]}));
 const selectedShape=shape==='heart'?heart:shape==='shark'?shark:shape;
 const motionLines=Object.entries(motion).filter(([,value])=>value).map(([key,value])=>`    ${key}: ${JSON.stringify(value)},`).join('\n');
 const snippet=`${shape==='heart'||shape==='shark'?`// ${shape} es tu forma personalizada\n`:''}<Character\n  shape=${shape==='heart'||shape==='shark'?`{${shape}}`:JSON.stringify(shape)}\n  expression="${expression}"\n  faceStyle="${faceStyle}"\n  face={${JSON.stringify(face)}}\n  color="${color}"\n  seed={${JSON.stringify(seed)}}\n  size={280}\n  motion={{\n${motionLines}\n  }}\n/>`;
 return <main>
  <header><a href="#" className="brand"><span className="brand-icon">◡</span> faceshape<span className="version">0.1.0</span></a><span className="tag">React + SVG · Sin audio</span></header>
  <section className="intro"><div className="eyebrow">UNA FORMA. MUCHAS PERSONALIDADES.</div><h1>Dale vida a<br/><span>cualquier forma.</span></h1><p>Elegí su cara, combiná movimientos y mirá cómo reacciona. Un pequeño personaje, completamente tuyo.</p></section>
  <section className="playground" aria-label="Playground">
   <div className="stage"><div className="stage-top"><span className="live-dot"/>PLAYGROUND EN VIVO<span className="stage-hint">Mové el cursor ↗</span></div><div className="character-wrap" data-testid="hero"><Character shape={selectedShape} expression={expression} faceStyle={faceStyle} face={face} color={color} seed={seed} motion={motion} reducedMotion={reduced} size={280} label="Personaje de demostración"/></div><div className="character-meta"><span>{shape}</span><span>·</span><span>{expression}</span></div><div className="stage-bottom">Hecho con geometría, un poco de movimiento y mucha actitud.</div></div>
   <aside className="controls"><div className="control-head"><h2>Tu personaje</h2><span>01 / CUSTOMIZE</span></div>
    <fieldset><legend>FORMA</legend><div className="options">{([...Object.keys(SHAPES),'heart','shark'] as (ShapeName|'heart'|'shark')[]).map(s=><button key={s} aria-pressed={shape===s} onClick={()=>setShape(s)}>{({circle:'Círculo',blob:'Blob',square:'Cuadrado',star:'Estrella',heart:'Corazón',shark:'Tiburón'})[s]}</button>)}</div></fieldset>
    <fieldset><legend>ESTILO VISUAL</legend><div className="options"><button aria-pressed={faceStyle==='soft'} onClick={()=>setFaceStyle('soft')}>B · Ojos ovalados</button><button aria-pressed={faceStyle==='cartoon'} onClick={()=>setFaceStyle('cartoon')}>D · Cartoon</button></div></fieldset>
    <div className="face-parts">
     <label>OJOS<select aria-label="Variante de ojos" value={eyes} onChange={e=>setEyes(e.target.value as EyeVariant|'')}><option value="">Según expresión</option>{['round','oval','cute','happy','closed'].map(v=><option key={v} value={v}>{v}</option>)}</select></label>
     <label>BOCA<select aria-label="Variante de boca" value={mouth} onChange={e=>setMouth(e.target.value as MouthVariant|'')}><option value="">Según expresión</option>{['smile','frown','neutral','open','grin','small'].map(v=><option key={v} value={v}>{v}</option>)}</select></label>
    </div>
    <fieldset><legend>EXPRESIÓN</legend><div className="options">{(Object.keys(EXPRESSIONS) as ExpressionName[]).map(e=><button key={e} aria-pressed={expression===e} onClick={()=>setExpression(e)}>{e}</button>)}</div></fieldset>
    <fieldset><legend>MOVIMIENTO</legend><div className="motions">{(['idle','blink','bounce','shake','talking'] as const).map(k=><label key={k}><input type="checkbox" checked={!!motion[k]} onChange={()=>toggle(k)}/><span>{k}</span></label>)}</div><label className="switch-row"><span>Seguir el cursor</span><input type="checkbox" checked={motion.lookAt==='cursor'} onChange={e=>setMotion(m=>({...m,lookAt:e.target.checked?'cursor':undefined}))}/></label></fieldset>
    <div className="color-row"><label htmlFor="color">COLOR</label><div className="swatches">{['#89d9c3','#b9a1ef','#ffbe8a','#f18da3','#8ac8ef'].map(c=><button key={c} aria-label={`Color ${c}`} onClick={()=>setColor(c)} style={{background:c}} aria-pressed={color===c}/>)}<input id="color" type="color" value={color} onChange={e=>setColor(e.target.value)}/></div></div>
    <label className="seed">SEED <input value={seed} onChange={e=>setSeed(e.target.value)} placeholder="Una identidad reproducible"/></label>
    <label className="switch-row"><span>Reducir movimiento</span><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/></label>
   </aside>
  </section>
  <section className="code-panel"><div><div className="eyebrow">LA API</div><h2>Tan simple como<br/>un componente.</h2><p>Sin dependencias de animación.<br/>Tipado con TypeScript. Tu propio SVG.</p></div><pre><code>{snippet}</code></pre></section>
  <section className="gallery"><div className="section-head"><h2>Una misma cara.<br/>Todo un elenco.</h2><p>Las expresiones se adaptan al <code>faceBox</code> de cada forma.</p></div><div className="cards">{(['neutral','happy','sad','angry','surprised','sleepy'] as ExpressionName[]).map((e,i)=><article key={e}><Character shape={(['circle','blob','square','star','circle','blob'] as ShapeName[])[i]} expression={e} faceStyle={faceStyle} color={['#b9a1ef','#89d9c3','#8ac8ef','#ffbe8a','#f18da3','#b9a1ef'][i]} size={140} motion={{blink:true,idle:true}} reducedMotion={reduced} label={e}/><span>{e}</span></article>)}</div></section>
  <section className="custom-example"><div><div className="eyebrow">TU SILUETA. TU CARA.</div><h2>Traé tu propio SVG.</h2><p>Definí dónde vive la cara y combiná sus partes. Este corazón es una forma personalizada.</p></div><Character shape={heart} color="#f18da3" size={160} motion={{idle:true}} reducedMotion={reduced} label="Corazón personalizado"><Eyebrows variant="raised"/><Eyes variant="cute"/><Mouth variant="grin"/></Character></section>
  <footer><span>faceshape · Primera versión funcional</span><span>React 18 / 19 · SVG · TypeScript</span></footer>
 </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
