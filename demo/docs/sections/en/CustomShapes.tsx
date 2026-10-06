import { CodeBlock } from '../../CodeBlock';
import { customPathExample, customRenderExample } from '../../examples.en';

export function CustomShapes() {
  return (
    <section id="docs-custom">
      <h2>Add a custom shape</h2>
      <p>
        For included shapes, import definitions from <code>faceshape-react/shapes</code>.
        Use the same <code>Character</code>; names still vary geometry and color.
      </p>
      <CodeBlock
        code={
          "import { Character } from 'faceshape-react';\nimport { planet } from 'faceshape-react/shapes';\n\n<Character shape={planet} name=\"Saturn\" face={{ eyes: 'bright', mouth: 'standard', eyebrows: 'none' }} />"
        }
      />
      <h3>1. A single SVG outline</h3>
      <p>
        Define the path and the area for the face. <code>defineShape</code> validates the
        outline, viewBox and face box.
      </p>
      <CodeBlock code={customPathExample} />
      <h3>2. Multiple pieces, colors or details</h3>
      <p>
        Use <code>CustomShape.render</code> to return groups, paths, rectangles and other
        SVG elements. Use its <code>color</code> for pieces that follow the character
        color. Details may use their own colors.
      </p>
      <CodeBlock code={customRenderExample} />
      <h3>Calculating faceBox</h3>
      <p>
        The box is relative to the viewBox: <code>x</code>, <code>y</code>,{' '}
        <code>width</code> and <code>height</code> range from 0 to 1. In a 100 × 100
        viewBox, an area starting at (25, 28) with size 50 × 45 corresponds to{' '}
        <code>{'{ x: 0.25, y: 0.28, width: 0.5, height: 0.45 }'}</code>. Keep it entirely
        inside the viewBox.
      </p>
      <p>
        For a viewBox starting at (10, 20) with size 200 × 100, normalize using that
        origin and those dimensions. Return nodes in the same coordinate space; avoid a
        nested <code>svg</code> with another viewBox. The <code>faceBox</code> prop on{' '}
        <code>Character</code> overrides the definition.
      </p>
    </section>
  );
}
