import { CodeBlock } from '../CodeBlock';
import { motionExample } from '../examples';

export function Motion() {
  return (
    <section id="docs-motion">
      <h2>Movimientos y capacidades</h2>
      <CodeBlock code={motionExample} />
      <div className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Opción</th>
              <th>Comportamiento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>idle</code>
              </td>
              <td>
                Movimiento suave de la figura. En cápsulas activa también mirada autónoma
                si no configuraste <code>glance</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>blink</code>
              </td>
              <td>Parpadeo periódico, cuando la pose de ojos lo admite.</td>
            </tr>
            <tr>
              <td>
                <code>talking</code>
              </td>
              <td>Oscilación de la apertura de boca, sin audio.</td>
            </tr>
            <tr>
              <td>
                <code>lookAt</code>
              </td>
              <td>Sigue el cursor o mira coordenadas normalizadas de 0 a 1.</td>
            </tr>
            <tr>
              <td>
                <code>glance</code>
              </td>
              <td>Mirada autónoma. Puede habilitarse o deshabilitarse explícitamente.</td>
            </tr>
            <tr>
              <td>
                <code>bounce</code> / <code>shake</code>
              </td>
              <td>Rebote o sacudida de la figura.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Los ojos blancos mueven sólo sus pupilas. En los demás, la boca acompaña una
        fracción del movimiento de ojos y cejas. El pico y el trazo simple no hablan;
        tampoco la boca de gatito cuando está cerrada en <code>happy</code>.
      </p>
      <p>
        <code>getMotionCapabilities(eyes, mouth, geometry)</code> devuelve{' '}
        <code>blink</code>, <code>talking</code> y <code>lookAt</code>. Para una geometría
        de emoción integrada, usá <code>resolveExpression(expression)</code>. Es la misma
        información que usa la demo para desactivar controles.
      </p>
      <p>
        La preferencia de movimiento reducido del sistema siempre se respeta.{' '}
        <code>reducedMotion={'{true}'}</code> también permite detenerlo explícitamente.
        Usá <code>label</code> para un personaje con significado; sin etiqueta, el SVG es
        decorativo.
      </p>
    </section>
  );
}
