import { CodeBlock } from '../../CodeBlock';

const example = `import { Character, registerEyeStyle, registerMouthStyle } from 'faceshape-react';

// In a shared server/client module, before rendering.
const eyes = registerEyeStyle('custom:almond', {
  supportsBlink: true,
  supportsLookAt: true,
  dimensions: { rx: 9, ry: 12, whites: false, highlight: false },
  gazeDistance: 3,
  browBaseline: 10,
  idleGlance: true,
  isClosed: openness => openness < 0.05,
  render: ({ face, x, angle, dimensions, gaze }) => {
    const height = dimensions.ry * face.geometry.eyeOpen * face.blink;
    return (
      <g transform={gaze}>
        <g transform={\`rotate(\${angle} \${x} 36)\`}>
          {height < 0.5
            ? <path d={\`M\${x - 9} 36 H\${x + 9}\`} fill="none" stroke={face.color} strokeWidth={2} />
            : <ellipse cx={x} cy={36} rx={dimensions.rx} ry={height} />}
        </g>
      </g>
    );
  },
});

const mouth = registerMouthStyle('custom:curve', {
  supportsTalking: false,
  lineOnly: true,
  widthScale: 1,
  shape: geometry => ({
    path: \`M\${50 - geometry.mouthWidth / 2} 68 Q50 \${68 + geometry.mouthCurve * 15} \${50 + geometry.mouthWidth / 2} 68\`,
    bottom: 68,
    tongueHeight: 0,
    closed: true,
  }),
});

<Character name="Almond" face={{ eyes, mouth, eyebrows: 'expression' }} expression="happy" />`;

export function CustomStyles() {
  return (
    <section id="docs-custom-styles">
      <h2>Custom eyes and mouths</h2>
      <p>
        Register a strategy with a name starting with <code>custom:</code>. Existing
        styles cannot be replaced. Registration returns a typed name to use in the
        complete face contract.
      </p>
      <CodeBlock code={example} />
      <p>
        Eyes receive interpolated expression geometry, blink, gaze and a unique clip ID.
        Use these values when drawing and declare <code>supportsBlink</code> and{' '}
        <code>supportsLookAt</code>. Define <code>anchors</code> for a single eye. Styles
        with <code>whites</code> move pupils inside their renderer; other styles receive{' '}
        <code>gaze</code> to move the group.
      </p>
      <p>
        Mouths receive scaled, animated geometry. <code>shape</code> returns the outline;{' '}
        <code>decoration</code> stays within the open-mouth clip. Declare{' '}
        <code>supportsTalking</code> and, when needed, <code>isClosed</code> to disable
        speech by expression. Inspect all six expressions and their transitions.
      </p>
      <p>
        Register once when loading the module, including in SSR. Do not register inside a
        component or on every request. Duplicate names throw an error to catch collisions.
      </p>
    </section>
  );
}
