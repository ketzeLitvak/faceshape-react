import { CodeBlock } from '../CodeBlock';
import { identityExample } from '../examples';

export function Identity() {
  return (
    <section id="docs-identity">
      <h2>Un nombre, una identidad</h2>
      <p>
        <code>name</code> determina el color, los rasgos de la cara y las proporciones de
        las formas compatibles. El mismo nombre y la misma forma producen el mismo
        resultado. No hace falta guardar valores aleatorios.
      </p>
      <CodeBlock code={identityExample} />
      <p>
        Fijar <code>color</code> conserva las variaciones de silueta. El blob cambia su
        contorno; círculo y estrella cambian su tamaño; cuadrado y triángulo cambian
        tamaño y rotación. La cara queda derecha. El alias <code>seed</code> sigue
        disponible para código anterior, pero se recomienda <code>name</code>.
      </p>
      <div className="docs-note">
        <strong>Formas de la demo</strong>
        <p>
          Corazón, tiburón, pingüino y computadora son ejemplos personalizados. No son
          nombres de formas integradas en la API: importá su definición desde la demo o
          creá la tuya y pasala con <code>shape={'{miForma}'}</code>.
        </p>
      </div>
      <h3>Variaciones según la forma</h3>
      <p>
        Las formas personalizadas de la demo también varían por nombre: el planeta cambia
        sus anillos, bandas y entre cero y dos lunas; el robot, proporciones, entre cero y
        dos antenas y detalles como módulos laterales y ventilación; el gato conserva su
        cabeza circular y varía tamaño e inclinación de las orejas; la flor, cantidad y
        forma de pétalos. La gota y la tostada cambian sus proporciones; el fantasma, su
        contorno inferior; la nube, sus lóbulos. El mismo nombre reproduce siempre la
        misma forma, y color permite fijar el color.
      </p>
    </section>
  );
}
