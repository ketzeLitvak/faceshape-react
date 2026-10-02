import { BROW_STRATEGIES } from '../../../src/react/eyebrows/registry';
import { EYE_STRATEGIES } from '../../../src/react/eyes/registry';
import { MOUTH_STRATEGIES } from '../../../src/react/mouths/registry';

export function FaceVariants() {
  return (
    <section id="docs-face">
      <h2>Ojos, bocas y cejas</h2>
      <p>
        Las tres partes se eligen por separado. El estilo define el aspecto; la expresión
        define la emoción. Podés combinar el pico con un círculo o los dientes de tiburón
        con una computadora.
      </p>
      <p>
        Elegí <code>none</code> en cualquiera de las tres partes para ocultarla. Cada
        elección es independiente: podés dibujar sólo ojos, sólo una boca, cejas sin ojos
        o una silueta sin cara. Sin ojos se desactivan parpadeo y mirada; sin boca, habla.
      </p>
      <h3>Ojos</h3>
      <div className="docs-tokens">
        {Object.keys(EYE_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>cartoon</code> tiene blancos y pupilas; <code>bright</code> incluye brillo;{' '}
        <code>sly</code> dibuja párpados entrecerrados; <code>capsule</code> permite
        miradas autónomas. Los estilos de arco pueden abrirse cuando la expresión lo
        requiere.
      </p>
      <h3>Bocas</h3>
      <div className="docs-tokens">
        {Object.keys(MOUTH_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>standard</code> es siempre una sola línea. <code>beak</code> mantiene el
        contorno del pico y acompaña la mirada. <code>shark</code> coloca dientes sobre el
        borde de la boca. En <code>happy</code>, <code>cat</code> queda cerrada y agrega
        cachetes rosados, con cualquier tipo de ojos.
      </p>
      <h3>Cejas</h3>
      <div className="docs-tokens">
        {Object.keys(BROW_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>expression</code> sigue la emoción, incluso su visibilidad. Las demás
        opciones fijan una geometría concreta; <code>none</code> las oculta. Ojos y cejas
        se mueven juntos cuando se desplaza la mirada completa.
      </p>
    </section>
  );
}
