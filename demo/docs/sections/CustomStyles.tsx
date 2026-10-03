import { CodeBlock } from '../CodeBlock';

const example = `import { Character, registerEyeStyle, registerMouthStyle } from 'faceshape-react';

// En un módulo compartido entre servidor y cliente, antes de renderizar.
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

<Character name="Almendra" face={{ eyes, mouth, eyebrows: 'expression' }} expression="happy" />`;

export function CustomStyles() {
  return (
    <section id="docs-custom-styles">
      <h2>Ojos y bocas personalizados</h2>
      <p>
        Registrá una estrategia con un nombre que empiece por <code>custom:</code>. No se
        pueden reemplazar estilos existentes. El registro devuelve el nombre tipado para
        usar en el contrato completo de la cara.
      </p>
      <CodeBlock code={example} />
      <p>
        Los ojos reciben la geometría interpolada de la expresión, blink, mirada y un ID
        único para clips. Usá esos datos en el dibujo y declará supportsBlink y
        supportsLookAt. Para un solo ojo, podés definir anchors. Los ojos con whites
        mueven sus pupilas dentro del renderer; los demás reciben gaze para mover el
        grupo.
      </p>
      <p>
        Las bocas reciben geometría ya escalada y animada. shape devuelve el contorno;
        decoration queda dentro del clip de la boca abierta. Declarà supportsTalking y, si
        corresponde, isClosed para desactivar el habla según la expresión. Probá las seis
        expresiones y sus transiciones en la galería de validación.
      </p>
      <p>
        Registrá una vez al cargar el módulo, también en SSR. No registres dentro de un
        componente ni en cada request. Los nombres duplicados producen un error para
        detectar colisiones.
      </p>
    </section>
  );
}
