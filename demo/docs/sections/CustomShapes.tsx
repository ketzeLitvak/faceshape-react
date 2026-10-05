import { CodeBlock } from '../CodeBlock';
import { customPathExample, customRenderExample } from '../examples';

export function CustomShapes() {
  return (
    <section id="docs-custom">
      <h2>Agregar una forma personalizada</h2>
      <p>
        Para las formas incluidas, importá su definición desde{' '}
        <code>faceshape-react/shapes</code>. Se usa el mismo <code>Character</code>; el
        nombre sigue variando la forma y el color.
      </p>
      <CodeBlock
        code={`import { Character } from 'faceshape-react';
import { planet } from 'faceshape-react/shapes';

<Character shape={planet} name="Saturno"
  face={{ eyes: 'bright', mouth: 'standard', eyebrows: 'none' }} />`}
      />
      <h3>1. Un único contorno SVG</h3>
      <p>
        Definí el path y la zona donde entra la cara. <code>defineShape</code> valida el
        contorno, el viewBox y la caja de la cara.
      </p>
      <CodeBlock code={customPathExample} />
      <h3>2. Varias piezas, colores o detalles</h3>
      <p>
        Usá <code>CustomShape.render</code> para devolver grupos, paths, rectángulos y
        otras piezas SVG. Usá el <code>color</code> recibido para las partes que deban
        seguir el color del personaje. Los detalles pueden tener colores propios.
      </p>
      <CodeBlock code={customRenderExample} />
      <h3>Cómo calcular faceBox</h3>
      <p>
        La caja es relativa al viewBox: <code>x</code>, <code>y</code>, <code>width</code>{' '}
        y <code>height</code> van de 0 a 1. En un viewBox de 100 × 100, una zona desde
        (25, 28) de 50 × 45 equivale a{' '}
        <code>{'{ x: 0.25, y: 0.28, width: 0.5, height: 0.45 }'}</code>. Debe quedar
        completamente dentro del viewBox.
      </p>
      <p>
        En un viewBox con origen (10, 20) y tamaño 200 × 100, normalizá usando ese origen
        y esas dimensiones. Devolvé nodos en ese mismo espacio; evitá un <code>svg</code>{' '}
        anidado con otro viewBox. La prop <code>faceBox</code> de <code>Character</code>{' '}
        permite reemplazar la caja de la definición.
      </p>
    </section>
  );
}
