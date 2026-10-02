import { CodeBlock } from '../CodeBlock';
import { basicExample } from '../examples';

export function GettingStarted() {
  return (
    <section id="docs-start">
      <h2>Primeros pasos</h2>
      <p>
        FaceShape es una librería de componentes React 18/19 con SVG. Puede renderizarse
        en servidor; las animaciones se activan en el navegador. Para aplicaciones con
        React Server Components, importá el personaje desde un componente de cliente.
      </p>
      <div className="docs-note">
        <strong>Disponibilidad del paquete</strong>
        <p>
          El paquete todavía no está publicado en npm. Usá una copia del repositorio y
          generá el archivo instalable.
        </p>
      </div>
      <CodeBlock
        label="Terminal · en el repositorio"
        code={
          'npm ci\nnpm run build\nnpm pack\n\n# En tu aplicación React:\nnpm install /ruta/faceshape-react-0.1.0.tgz'
        }
      />
      <CodeBlock code={basicExample} />
      <p>
        La cara siempre es explícita: <code>face</code> debe incluir <code>eyes</code>,{' '}
        <code>mouth</code> y <code>eyebrows</code>. No existen presets ni un estilo de
        cara implícito. Para omitir ojos, boca o cejas, elegí <code>none</code> en esa
        parte.
      </p>
    </section>
  );
}
