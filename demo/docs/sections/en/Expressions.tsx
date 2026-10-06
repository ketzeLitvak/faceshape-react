import { CodeBlock } from '../../CodeBlock';
import { expressionExample } from '../../examples.en';

export function Expressions() {
  return (
    <section id="docs-expressions">
      <h2>Expressions and transitions</h2>
      <p>
        Available expressions are <code>neutral</code>, <code>happy</code>,{' '}
        <code>sad</code>, <code>angry</code>, <code>surprised</code> and{' '}
        <code>sleepy</code>. Changing <code>expression</code> interpolates geometry;{' '}
        <code>transition</code> controls duration and easing.
      </p>
      <CodeBlock code={expressionExample} />
      <p>
        <code>defineExpression</code> accepts <code>eyeOpen</code>, <code>eyeCurve</code>,{' '}
        <code>eyeAngle</code>, <code>mouthWidth</code>, <code>mouthCurve</code>,{' '}
        <code>mouthOpen</code>, <code>browAngle</code>, <code>browLift</code> and{' '}
        <code>browOpacity</code>. It validates numbers and clamps ranges. Explicit{' '}
        <code>eyeSpacing</code> and <code>pupilSize</code> take precedence over traits
        generated from the name.
      </p>
    </section>
  );
}
