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
          <a
            className="github-link"
            href="https://github.com/ketzeLitvak/faceshape-react"
            aria-label="Ver código en GitHub"
            title="Ver código en GitHub"
          >
            <span className="sr-only">Ver código en GitHub</span>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.83c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
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
                      icon="reset"
                      label="Restablecer personaje"
                      onClick={playground.reset}
                    />
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
