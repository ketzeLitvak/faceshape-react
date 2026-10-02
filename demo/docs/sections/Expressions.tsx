import { CodeBlock } from '../CodeBlock';
import { expressionExample } from '../examples';

export function Expressions() {
  return (
    <section id="docs-expressions">
      <h2>Expresiones y transiciones</h2>
      <p>
        Las expresiones disponibles son <code>neutral</code>, <code>happy</code>,{' '}
        <code>sad</code>, <code>angry</code>, <code>surprised</code> y <code>sleepy</code>
        . Cambiar la prop <code>expression</code> interpola la geometría;{' '}
        <code>transition</code> controla duración y curva de animación.
      </p>
      <CodeBlock code={expressionExample} />
      <p>
        <code>defineExpression</code> admite parámetros como <code>eyeOpen</code>,{' '}
        <code>eyeCurve</code>, <code>eyeAngle</code>, <code>mouthWidth</code>,{' '}
        <code>mouthCurve</code>, <code>mouthOpen</code>, <code>browAngle</code>,{' '}
        <code>browLift</code> y <code>browOpacity</code>. Valida números y limita sus
        valores. Los valores explícitos de <code>eyeSpacing</code> y{' '}
        <code>pupilSize</code> prevalecen sobre los rasgos generados por nombre.
      </p>
    </section>
  );
}
