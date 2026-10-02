# Contratos de rasgos (verificar la versión actual)

## Archivos de referencia

- `src/react/{Eyes,Mouth,Eyebrows}.tsx`: wrappers, hooks y transforms compartidos.
- `src/react/eyes/{types,registry}.ts` y `EllipseEye.tsx`: ojos y clips.
- `src/react/mouths/{types,registry}.ts`, `shared.ts`, `relaxed.ts`: bocas y poses de reposo.
- `src/react/eyebrows/{types,registry}.ts`: cejas.
- `src/react/utils/{faceGaze,mouthGeometry,eyeGeometry,sharkTeethGeometry,toothyTeethGeometry}.ts`.
- `src/react/capabilities.ts`, `src/react/animation/`, `demo/options.ts`.

## EyeStrategy

```ts
interface EyeDimensions { rx: number; ry: number; whites: boolean; highlight: boolean }
interface EyeRenderProps {
  face: FaceState;
  x: number;
  angle: number;
  index: number;
  id: string;
  dimensions: EyeDimensions;
  gaze: string;
}
interface EyeStrategy {
  hidden?: boolean;
  render: React.ComponentType<EyeRenderProps>;
  dimensions: EyeDimensions;
  isClosed: (openness: number) => boolean;
  gazeDistance: number;
  browBaseline: number;
  idleGlance: boolean;
}
```

Eyes actual usa x=50±eyeSpacing, y≈36 y dos instancias. El renderer recibe index para distinguirlas. Leer el fixture de guiño; no suponer que FaceState incluye wink. `isClosed` describe capacidad por apertura de expresión, no el frame de blink. whites también participa en la política de mirada.

## MouthStrategy

```ts
interface MouthShape {
  path: string;
  bottom: number;
  tongueHeight: number;
  closed?: boolean;
  cheeks?: boolean;
}
interface MouthStrategy {
  hidden?: boolean;
  widthScale: number;
  resolveGeometry?: (geometry: FaceGeometry) => FaceGeometry;
  lineOnly?: boolean;
  solidFill?: string;
  supportsTalking?: boolean;
  isClosed?: (geometry: Partial<FaceGeometry>) => boolean;
  shape: (geometry: FaceGeometry) => MouthShape;
  decoration?: (geometry: FaceGeometry) => React.ReactNode;
}
```

Mouth aplica resolveGeometry antes de widthScale/talk. shape y decoration reciben la misma geometría resuelta. getMotionCapabilities recibe la geometría de expresión original: si el estilo ajusta la boca, isClosed debe reflejar esa misma regla desde la geometría original. closed evita relleno/elementos interiores; isClosed evita anunciar habla. Si closed no se propaga a capabilities, el control puede quedar engañosamente activo.

Usar bottom del contorno propio para colocar la lengua; no copiar bottom de standardShape si el contorno nuevo tiene otro extremo. La forma se centra alrededor de x=50 y y≈68.

## Cejas

```ts
interface BrowGeometry { hidden?: boolean; angle: number; lift: number; opacity: number }
type BrowStrategy = (geometry: FaceGeometry) => BrowGeometry;
```

El renderer común actualmente usa dos arcos, x de ojos y browBaseline+lift. Otra forma de ceja requiere una extensión tipada de la estrategia; no añadir ifs por variante al wrapper.

## Composición pública

Character exige `face: { eyes, mouth, eyebrows }`. Face, Eyes, Mouth y Eyebrows usan sus tipos explícitos, no un estilo visual global. None debe devolver ausencia de nodos/decoraciones faciales de esa parte. CustomShape es sólo extensión de cuerpo, no un registro público de rasgos.

## Motion público

MotionConfig actual tiene idle, blink, bounce, shake, talking, lookAt y glance. No tiene una opción pública wink. El fixture renderPose de tests prueba cierre unilateral por índice. Para ofrecer guiño como nueva API, diseñar y tipar su flujo completo; no mostrar motion={{ wink: true }} como si existiera.
