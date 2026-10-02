export function APIReference() {
  return (
    <section id="docs-api">
      <h2>Referencia de Character</h2>
      <div className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Uso y valor inicial</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>face</code>
              </td>
              <td>
                Obligatoria. Conjunto completo de ojos, boca y cejas. Cada parte admite
                none para ocultarla.
              </td>
            </tr>
            <tr>
              <td>
                <code>shape</code>
              </td>
              <td>
                <code>circle</code>, <code>blob</code>, <code>square</code>,{' '}
                <code>star</code>, <code>triangle</code> o forma personalizada. Inicial:{' '}
                <code>blob</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>expression</code>
              </td>
              <td>
                Nombre de emoción o geometría propia. Inicial: <code>neutral</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>name</code>
              </td>
              <td>
                Identidad determinista, opcional. Tiene precedencia sobre el alias
                obsoleto <code>seed</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>color</code> / <code>faceColor</code>
              </td>
              <td>
                Color del cuerpo y de los rasgos. Sin nombre ni color: cuerpo{' '}
                <code>#388697</code>; rasgos <code>#182b35</code>. Pico y cachetes
                conservan su color propio.
              </td>
            </tr>
            <tr>
              <td>
                <code>size</code>
              </td>
              <td>
                Número o tamaño CSS; inicial: 160. Atributos SVG <code>width</code> y{' '}
                <code>height</code> pueden reemplazarlo.
              </td>
            </tr>
            <tr>
              <td>
                <code>faceBox</code>
              </td>
              <td>
                Reemplaza la zona de cara de la definición. Valores normalizados de 0 a 1.
              </td>
            </tr>
            <tr>
              <td>
                <code>motion</code>
              </td>
              <td>Opciones de movimiento; todas desactivadas cuando se omite.</td>
            </tr>
            <tr>
              <td>
                <code>transition</code>
              </td>
              <td>
                <code>duration</code> en ms, inicial 300; <code>easing</code>:{' '}
                <code>linear</code>, <code>ease-out</code> (inicial) o{' '}
                <code>ease-in-out</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>reducedMotion</code>
              </td>
              <td>
                Detiene movimientos explícitamente. La preferencia del sistema también se
                respeta.
              </td>
            </tr>
            <tr>
              <td>
                <code>label</code>, ARIA y SVG
              </td>
              <td>Etiqueta accesible, atributos SVG, estilos y ref al elemento SVG.</td>
            </tr>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>Reemplaza la cara automática para composición personalizada.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
