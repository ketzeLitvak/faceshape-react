import { CodeBlock } from '../CodeBlock';
import { compositionExample } from '../examples';

export function Composition() {
  return (
    <section id="docs-composition">
      <h2>Componer las partes</h2>
      <p>
        Para insertar detalles propios o controlar el orden de dibujo, usá{' '}
        <code>children</code>. Las partes necesitan estar dentro de <code>Character</code>
        , que les aporta geometría, color y movimiento. Tanto el personaje como{' '}
        <code>Face</code> requieren el conjunto completo.
      </p>
      <CodeBlock code={compositionExample} />
      <p>
        Los hijos reemplazan el dibujo automático de la cara: incluí las partes que querés
        mostrar. Conservá las mismas variantes en la configuración y en los componentes
        para que las capacidades de movimiento correspondan al dibujo.
      </p>
    </section>
  );
}
