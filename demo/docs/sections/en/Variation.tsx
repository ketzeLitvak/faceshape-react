import { CodeBlock } from '../../CodeBlock';
import { randomExample, variationExample } from '../../examples.en';

export function Variation() {
  return (
    <section id="docs-variation">
      <h2>Vary a shape by name</h2>
      <p>
        Add <code>fromName</code> to the definition. It receives the name and returns the
        resolved shape, including its face box. It runs when resolving appearance, not on
        each animation frame.
      </p>
      <h3>Scale and rotation with varyShape</h3>
      <CodeBlock code={variationExample} />
      <p>
        <code>varyShape</code> is designed for outlines in 0–100 coordinates centered at
        (50, 50). It scales the outline and faceBox, keeps the face upright and leaves
        room to avoid clipping during rotation. <code>rotationRange</code> limits rotation
        in degrees. For other coordinate systems, calculate your own proportions. Built-in
        squares and triangles use a 180° range and can take any orientation depending on
        the name.
      </p>
      <h3>Custom outlines and proportions</h3>
      <CodeBlock code={randomExample} />
      <p>
        Use a different <code>createNameRandom</code> channel for each shape family.
        Generate values within safe bounds and recalculate <code>faceBox</code> with the
        body. Avoid <code>Math.random()</code> when reproducibility matters. The object
        returned by <code>fromName</code> must include <code>path</code> or{' '}
        <code>render</code>; recursive resolution is not supported.
      </p>
    </section>
  );
}
