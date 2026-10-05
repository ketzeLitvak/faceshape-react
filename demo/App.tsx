import { lazy, Suspense, useState } from 'react';
import { CharacterStage } from './components/CharacterStage';
import { CustomShapeExample } from './components/CustomShapeExample';
import { ExpressionGallery } from './components/ExpressionGallery';
import { PlaygroundControls } from './components/PlaygroundControls';
import { Documentation } from './docs/Documentation';
import { useDemoPage } from './hooks/useDemoPage';
import { usePlayground } from './hooks/usePlayground';
import { SaveModal } from './modals/SaveModal';
import { ShareModal } from './modals/ShareModal';
import { ValidationGallery } from './validation/ValidationGallery';
import { SavedCharacters } from './workbench/SavedCharacters';
import { useSavedCharacters } from './workbench/useSavedCharacters';
import './workbench/workbench.css';
import { buildSnippet } from './snippet';

const ExportModal = lazy(() =>
  import('./modals/ExportModal').then((module) => ({ default: module.ExportModal })),
);

export function App() {
  const page = useDemoPage();
  const playground = usePlayground();
  const collection = useSavedCharacters(
    playground.configuration,
    playground.loadConfiguration,
  );
  const [modal, setModal] = useState<'save' | 'share' | 'export'>();
  const { shape, expression, face, fixedColor, name, motion, reduced, selectedShape } =
    playground;
  const snippet = buildSnippet({
    shape,
    expression,
    face,
    color: fixedColor,
    name,
    motion,
  });
  return (
    <main>
      <header>
        <a href="#demo" className="brand">
          <img className="brand-icon" src="./faceshape-icon.svg" alt="" /> faceshape
          <span className="version">0.1.0</span>
        </a>
        <nav className="app-nav" aria-label="Navegación principal">
          <a href="#demo" aria-current={page === 'demo' ? 'page' : undefined}>
            Playground
          </a>
          <a href="#docs" aria-current={page === 'docs' ? 'page' : undefined}>
            Documentación
          </a>
          <a href="#validation" aria-current={page === 'validation' ? 'page' : undefined}>
            Inspección
          </a>
          <a href="#collection" aria-current={page === 'collection' ? 'page' : undefined}>
            Colección
          </a>
        </nav>
      </header>
      {page === 'collection' ? (
        <SavedCharacters collection={collection} />
      ) : page === 'validation' ? (
        <ValidationGallery face={face} />
      ) : page === 'docs' ? (
        <Documentation />
      ) : (
        <>
          <section className="intro">
            <div className="eyebrow">UNA FORMA. MUCHAS PERSONALIDADES.</div>
            <h1>
              Dale vida a<br />
              <span>cualquier forma.</span>
            </h1>
            <p>
              Elegí su cara, combiná movimientos y mirá cómo reacciona. Un pequeño
              personaje, completamente tuyo.
            </p>
          </section>
          <section className="playground" aria-label="Playground">
            <CharacterStage
              selectedShape={selectedShape}
              expression={expression}
              face={face}
              color={fixedColor}
              name={name}
              motion={motion}
              reduced={reduced}
              shape={shape}
            />
            <PlaygroundControls
              {...playground}
              actions={
                <div className="character-actions">
                  <button
                    type="button"
                    aria-label="Compartir"
                    onClick={() => setModal('share')}
                  >
                    <span aria-hidden="true">↗</span>
                    <span className="action-label">Compartir</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Guardar"
                    onClick={() => setModal('save')}
                  >
                    <span aria-hidden="true">＋</span>
                    <span className="action-label">Guardar</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Exportar"
                    onClick={() => setModal('export')}
                  >
                    <span aria-hidden="true">↓</span>
                    <span className="action-label">Exportar</span>
                  </button>
                </div>
              }
            />
          </section>
          <section className="code-panel">
            <div>
              <div className="eyebrow">LA API</div>
              <h2>
                Tan simple como
                <br />
                un componente.
              </h2>
              <p>
                Sin dependencias de animación.
                <br />
                Tipado con TypeScript. Tu propio SVG.
              </p>
            </div>
            <pre>
              <code>{snippet}</code>
            </pre>
          </section>
          <ExpressionGallery face={face} reduced={reduced} />
          <CustomShapeExample reduced={reduced} />
        </>
      )}
      {modal === 'save' && (
        <SaveModal
          collection={collection}
          configuration={playground.configuration}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === 'share' && (
        <ShareModal
          configuration={playground.configuration}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === 'export' && (
        <Suspense fallback={<p role="status">Preparando componente…</p>}>
          <ExportModal
            configuration={playground.configuration}
            onClose={() => setModal(undefined)}
          />
        </Suspense>
      )}
      <footer>
        <span>faceshape · Primera versión funcional</span>
        <span>React 18 / 19 · SVG · TypeScript</span>
      </footer>
    </main>
  );
}
