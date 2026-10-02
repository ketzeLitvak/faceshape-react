export function Troubleshooting() {
  return (
    <section id="docs-troubleshooting">
      <h2>Dudas frecuentes</h2>
      <h3>“Me pide todas las partes de face”</h3>
      <p>
        Es parte del contrato. Incluí ojos, boca y cejas, incluso si elegís{' '}
        <code>none</code>. <code>faceStyle</code> y <code>FACE_PRESETS</code> fueron
        eliminados.
      </p>
      <h3>“No parpadea o no habla”</h3>
      <p>
        Revisá las capacidades de esa variante y expresión, la configuración{' '}
        <code>motion</code> y la preferencia de movimiento reducido. Una boca de trazo
        simple o pico conserva su forma y no se abre.
      </p>
      <h3>“La cara se sale de mi dibujo”</h3>
      <p>
        Reducí o reposicioná <code>faceBox</code>. Si el nombre cambia la silueta,
        recalculá esa caja en <code>fromName</code>. Dejá margen para la mirada, cejas y
        expresiones abiertas.
      </p>
      <h3>“Mi nombre cambia el color aunque quiero uno fijo”</h3>
      <p>
        Pasá <code>color</code>. La identidad y el contorno se mantienen; se reemplaza
        sólo el color automático.
      </p>
      <h3>“Quiero un pingüino con otra boca”</h3>
      <p>
        Podés hacerlo. La silueta no contiene el pico: <code>beak</code> es una variante
        de boca intercambiable, disponible también para otras formas.
      </p>
    </section>
  );
}
