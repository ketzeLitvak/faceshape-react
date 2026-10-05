import { lazy, Suspense, useState } from 'react';
import { CharacterStage } from './components/CharacterStage';
import { CustomShapeExample } from './components/CustomShapeExample';
import { ExpressionGallery } from './components/ExpressionGallery';
import { IconButton } from './components/IconButton';
import { PlaygroundControls } from './components/PlaygroundControls';
import { Documentation } from './docs/Documentation';
import { useDemoPage } from './hooks/useDemoPage';
import { usePlayground } from './hooks/usePlayground';
import { SaveModal } from './modals/SaveModal';
import { ShareModal } from './modals/ShareModal';
import { DOCS_PATH, SITE_PATH } from './seo';
import { ValidationGallery } from './validation/ValidationGallery';
import { SavedCharacters } from './workbench/SavedCharacters';
import { useSavedCharacters } from './workbench/useSavedCharacters';
import './workbench/workbench.css';
import { buildSnippet } from './snippet';

const ExportModal = lazy(() =>
  import('./modals/ExportModal').then((module) => ({ default: module.ExportModal })),
);

export function App({ initialPage = 'demo' }: { initialPage?: 'demo' | 'docs' }) {
  const page = useDemoPage(initialPage);
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
      <a className="skip-link" href="#page-content">
        Saltar al contenido
      </a>
      <header>
        <a href={SITE_PATH} className="brand">
          <img className="brand-icon" src={`${SITE_PATH}faceshape-icon.svg`} alt="" />{' '}
          faceshape
          <span className="version">0.1.0</span>
        </a>
        <nav className="app-nav" aria-label="Navegación principal">
          <a href={SITE_PATH} aria-current={page === 'demo' ? 'page' : undefined}>
            Playground
          </a>
          <a href={DOCS_PATH} aria-current={page === 'docs' ? 'page' : undefined}>
            Documentación
          </a>
          <a
            href={`${SITE_PATH}#validation`}
            aria-current={page === 'validation' ? 'page' : undefined}
          >
            Inspección
          </a>
          <a
            href={`${SITE_PATH}#collection`}
            aria-current={page === 'collection' ? 'page' : undefined}
          >
            Colección
          </a>
        </nav>
      </header>
      <div id="page-content" tabIndex={-1}>
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
                Una librería de avatares SVG animados para React. Combiná formas, ojos,
                bocas y cejas, probá expresiones y exportá tu personaje como componente.
              </p>
              <div className="intro-links">
                <a href={DOCS_PATH}>Instalación y ejemplos ↗</a>
                <a href="https://github.com/ketzeLitvak/faceshape-react">
                  Ver código en GitHub ↗
                </a>
              </div>
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
                    <IconButton
                      icon="share"
                      label="Compartir"
                      onClick={() => setModal('share')}
                    />
                    <IconButton
                      icon="save"
                      label="Guardar"
                      onClick={() => setModal('save')}
                    />
                    <IconButton
                      icon="export"
                      label="Exportar"
                      onClick={() => setModal('export')}
                    />
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
              {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/noNoninteractiveTabindex: Scrollable code needs keyboard focus and an accessible region name. */}
              <pre tabIndex={0} role="region" aria-label="Código del personaje">
                <code>{snippet}</code>
              </pre>
            </section>
            <ExpressionGallery face={face} reduced={reduced} />
            <CustomShapeExample reduced={reduced} />
          </>
        )}
      </div>
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
