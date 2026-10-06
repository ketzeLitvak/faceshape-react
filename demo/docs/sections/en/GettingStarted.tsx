import { CodeBlock } from '../../CodeBlock';
import { basicExample } from '../../examples.en';

export function GettingStarted() {
  return (
    <section id="docs-start">
      <h2>Getting started</h2>
      <p>
        FaceShape provides SVG components for React 18/19. It supports server rendering;
        animations run in the browser. In applications using React Server Components,
        import the character from a client component.
      </p>
      <div className="docs-note">
        <strong>Package availability</strong>
        <p>
          The package is not published on npm yet. Clone the repository and build an
          installable archive.
        </p>
      </div>
      <CodeBlock
        label="Terminal · in the repository"
        code={
          'npm ci\nnpm run build\nnpm pack\n\n# In your React application:\nnpm install /path/faceshape-react-0.1.0.tgz'
        }
      />
      <CodeBlock code={basicExample} />
      <p>
        The face is always explicit: <code>face</code> must include <code>eyes</code>,{' '}
        <code>mouth</code> and <code>eyebrows</code>. There are no implicit face presets.
        Set a part to <code>none</code> to hide it.
      </p>
    </section>
  );
}
