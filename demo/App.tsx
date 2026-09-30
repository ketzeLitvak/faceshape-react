import { usePlayground } from './hooks/usePlayground';
import { PlaygroundControls } from './components/PlaygroundControls';
import { CharacterStage } from './components/CharacterStage';
import { CustomShapeExample } from './components/CustomShapeExample';
import { ExpressionGallery } from './components/ExpressionGallery';
import { buildSnippet } from './snippet';
export function App() {
  const playground = usePlayground();
  const { shape, expression, face, fixedColor, name, motion, reduced, selectedShape } = playground;
  const snippet = buildSnippet({ shape, expression, face, color: fixedColor, name, motion });
  return <main>
    <header>
      <a href="#" className="brand">
        <span className="brand-icon">◡</span> faceshape<span className="version">0.1.0</span>
      </a>
      <span className="tag">React + SVG · Sin audio</span>
    </header>
    <section className="intro">
      <div className="eyebrow">UNA FORMA. MUCHAS PERSONALIDADES.</div>
      <h1>Dale vida a<br />
        <span>cualquier forma.</span>
      </h1>
      <p>Elegí su cara, combiná movimientos y mirá cómo reacciona. Un pequeño personaje, completamente tuyo.</p>
    </section>
    <section className="playground" aria-label="Playground">
      <CharacterStage selectedShape={selectedShape} expression={expression} face={face} color={fixedColor} name={name} motion={motion} reduced={reduced} shape={shape} />
      <PlaygroundControls {...playground} />
    </section>
    <section className="code-panel">
      <div>
        <div className="eyebrow">LA API</div>
        <h2>Tan simple como<br />un componente.</h2>
        <p>Sin dependencias de animación.<br />Tipado con TypeScript. Tu propio SVG.</p>
      </div>
      <pre>
        <code>{snippet}
        </code>
      </pre>
    </section>
    <ExpressionGallery faceStyle="soft" reduced={reduced} />
    <CustomShapeExample reduced={reduced} />
    <footer>
      <span>faceshape · Primera versión funcional</span>
      <span>React 18 / 19 · SVG · TypeScript</span>
    </footer>
  </main>;
}
