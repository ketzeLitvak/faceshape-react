import { CodeBlock } from '../../CodeBlock';
import { compositionExample } from '../../examples.en';

export function Composition() {
  return (
    <section id="docs-composition">
      <h2>Compose the parts</h2>
      <p>
        Use <code>children</code> to insert your own details or control drawing order.
        Parts must be inside <code>Character</code>, which supplies geometry, color and
        motion. Both the character and <code>Face</code> require a complete face
        configuration.
      </p>
      <CodeBlock code={compositionExample} />
      <p>
        Children replace the automatic face: include the parts you want to show. Use the
        same variants in configuration and rendered components so motion capabilities
        match the drawing.
      </p>
    </section>
  );
}
