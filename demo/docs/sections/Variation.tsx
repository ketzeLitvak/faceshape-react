import { CodeBlock } from '../CodeBlock';
import { randomExample, variationExample } from '../examples';

export function Variation() {
  return (
    <section id="docs-variation">
      <h2>Hacer que el nombre cambie tu forma</h2>
      <p>
        Agregá <code>fromName</code> a la definición. Recibe el nombre y devuelve la forma
        resuelta, incluida su caja de cara. Se ejecuta al resolver la apariencia y no por
        cada frame de animación.
      </p>
      <h3>Escala y rotación con varyShape</h3>
      <CodeBlock code={variationExample} />
      <p>
        <code>varyShape</code> está pensado para contornos en coordenadas 0–100, centrados
        en (50, 50). Escala el contorno y su faceBox, mantiene la cara derecha y deja
        margen para que el contorno no se recorte al rotar. <code>rotationRange</code>{' '}
        limita la rotación en grados. Para otros espacios de coordenadas, calculá tus
        propias proporciones. El cuadrado y el triángulo incluidos usan 180° de rango:
        pueden tomar cualquier orientación según el nombre.
      </p>
      <h3>Contorno y proporciones propios</h3>
      <CodeBlock code={randomExample} />
      <p>
        Usá un canal distinto en <code>createNameRandom</code> para cada familia de forma.
        Generá números dentro de límites seguros y recalculá <code>faceBox</code> junto
        con el cuerpo. Evitá <code>Math.random()</code> si necesitás reproducir el
        personaje. El objeto devuelto por <code>fromName</code> debe incluir{' '}
        <code>path</code> o <code>render</code>. no se encadenan resoluciones recursivas.
      </p>
    </section>
  );
}
