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
          Corazón, pez, tiburón, pingüino, dispositivo y las demás formas adicionales
          están en
          <code>faceshape-react/shapes</code>. Importá su definición y pasala con
          <code>shape={'{miForma}'}</code>; no son nombres de formas integradas en la API.
        </p>
      </div>
      <h3>Variaciones según la forma</h3>
      <p>
        Las formas personalizadas de la demo también varían por nombre: el planeta cambia
        sus anillos y entre cero y dos lunas; el robot, proporciones, entre cero y dos
        antenas y módulos laterales; el gato conserva su cabeza circular y orejas fijas:
        sólo cambia el color; la flor, cantidad y forma de pétalos. Dispositivo elige
        entre escritorio, notebook, celular y tablet. Pez combina cinco especies y cuatro
        tiburones; tiburón conserva sólo esos cuatro perfiles. La gota y la tostada
        cambian sus proporciones; el fantasma combina perfiles clásicos, anchos, de
        sábana, con gotas o cola lateral, con distintas inclinaciones y lados; la nube,
        sus lóbulos. El mismo nombre reproduce siempre la misma forma, y color permite
        fijar el color.
      </p>
      <h3>Color de texto legible</h3>
      <p>
        Importá <code>textColorFromName</code> desde <code>faceshape-react/core</code> y
        usá <code>textColorFromName('Ketze', '#ffffff')</code>. Conserva el color del
        nombre si tiene suficiente contraste; si no, lo aclara u oscurece para alcanzar
        4.5:1 con ese fondo. Acepta fondos opacos <code>#RGB</code> o <code>#RRGGBB</code>{' '}
        y devuelve un hexadecimal. <code>colorFromName</code> y el color del personaje no
        cambian. Si el tema cambia el fondo, volvé a calcular el color del texto.
      </p>
    </section>
  );
}
