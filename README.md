# FaceShape React

Librería React 18/19 + TypeScript para convertir formas SVG en personajes animados. Sin dependencias de animación ni audio.

## Desarrollo

Node.js 22.12+ o Node 24.

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run demo:build
npm pack
```

Biome formatea el proyecto y ordena imports. `npm run lint:fix` corrige automáticamente; `npm run format` sólo aplica formato. El CI verifica lint, tipos, contrato público, pruebas de animación y regresión visual.

## Contrato explícito de cara

`face` es obligatorio y debe incluir ojos, boca y cejas. No hay presets, `faceStyle`, variantes implícitas ni una cara predeterminada en la librería. TypeScript rechaza las caras incompletas; JavaScript recibe un error descriptivo. Usá `eyebrows: 'none'` para omitir las cejas de manera explícita.

```tsx
import { Character, type FaceConfig } from 'faceshape-react';

const face: FaceConfig = {
  eyes: 'bright',
  mouth: 'tongue',
  eyebrows: 'expression',
};

<Character
  name="Ezequiel"
  shape="blob"
  expression="happy"
  face={face}
  size={200}
  motion={{ idle: true, blink: true, lookAt: 'cursor' }}
/>
```

La demo comienza con ojos `bright`, boca `tongue` y cejas `expression`, enviados explícitamente. Los chips permiten cambiar las tres partes. La galería usa el mismo conjunto elegido.

| Parte | Variantes |
| --- | --- |
| Ojos | `round`, `oval`, `cute`, `happy`, `closed`, `dots`, `bright`, `joyful`, `cartoon`, `sly`, `capsule` |
| Boca | `beak`, `standard`, `wide`, `small`, `gentle`, `tongue`, `joyful`, `toothy`, `shark`, `smirk`, `cat` |
| Cejas | `expression`, `none`, `soft`, `raised`, `angry`, `sad` |

Cada ojo define sus dimensiones, blanco, brillo y comportamiento. Ninguna variante depende de un estilo global. Todas las bocas y ojos responden a la expresión. Las cejas `expression` siguen directamente la emoción; las demás variantes son elecciones explícitas de geometría.

## Formas, identidad y expresión

`shape` admite `circle`, `blob`, `square`, `star` o una definición personalizada. Su valor inicial es `blob`. `name` determina la silueta del blob, sus rasgos y color de forma reproducible. `color` permite fijar el color sin perder la silueta determinada por el nombre. `seed` permanece como alias obsoleto para consumidores anteriores; `name` tiene precedencia.

`expression` admite `neutral`, `happy`, `sad`, `angry`, `surprised`, `sleepy` o geometría personalizada con `defineExpression`. La expresión inicial es `neutral`; esto no selecciona ninguna variante de cara. Los parámetros explícitos de una expresión personalizada tienen precedencia sobre los rasgos generados por el nombre.

```tsx
import { Character, defineShape } from 'faceshape-react';

const heart = defineShape({
  path: 'M50 88 C40 79 7 57 7 31 C7 9 37 5 50 24 C63 5 93 9 93 31 C93 57 60 79 50 88Z',
  faceBox: { x: 0.23, y: 0.27, width: 0.54, height: 0.4 },
});

<Character
  shape={heart}
  expression="happy"
  face={{ eyes: 'cute', mouth: 'wide', eyebrows: 'raised' }}
/>
```

`faceBox` es relativo al `viewBox`. La demo incluye corazón, tiburón, pingüino y computadora. El nombre modifica las proporciones de las tres últimas, manteniendo la cara dentro de su zona de dibujo. El color fijo conserva esa variación de geometría.

Las formas personalizadas también admiten `render: ({ color }) => ReactNode` para dibujar SVG dentro del mismo espacio de coordenadas. Las partes `Eyes`, `Mouth`, `Eyebrows` requieren `variant`. `Face` requiere el conjunto completo. La composición con `children` conserva el requisito de enviar `face` al `Character`.

## Movimiento y accesibilidad

`motion` acepta `idle`, `blink`, `bounce`, `shake`, `talking`, `glance` y `lookAt` (`'cursor'` o coordenadas normalizadas `{ x, y }`). Las capacidades dependen de la variante y de la expresión. Ojos en arco cerrados desactivan blink y mirada; al abrirse por sorpresa, los permiten. Los ojos con blanco desplazan sólo sus pupilas; los demás coordinan mirada, cejas y boca. `capsule` incorpora mirada autónoma cuando `idle` está activo.

`transition` permite `duration` y `easing`. `reducedMotion` y la preferencia del sistema desactivan movimientos. El SVG es decorativo por defecto; `label` o las etiquetas ARIA lo identifican como imagen.

## Arquitectura y pruebas

- `src/react/resolvers/`: apariencia y geometría, independientes del componente.
- `src/react/Character.tsx`: contenedor SVG, silueta estática y coordinación.
- `src/react/AnimatedFace.tsx`: estado de animación y contexto de la cara. Sus actualizaciones no renderizan la silueta nuevamente.
- `src/react/animation/`: funciones puras para blink, boca, mirada y transición.
- `src/react/eyes/`, `mouths/`, `eyebrows/`: tipos, un archivo por variante y registros de estrategias.
- `src/core/shapes/` y `demo/shapes/`: un archivo por silueta.

Las pruebas controlan tiempos exactos, límites geométricos, prioridades de configuración, contratos TypeScript y composición. La regresión visual rasteriza SVG con Sharp y compara píxeles de 28 referencias: cuatro combinaciones de cara en siete estados, incluidos medio blink, cierre, guiño y transición con cejas. El guiño se ejercita como pose asimétrica de los renderizadores, no como una opción nueva de movimiento público.

Después de revisar un cambio visual intencional, actualizá las referencias con `npm run test:visual:update`. Las referencias SVG están en `tests/visual/` y son revisables en git. La prueba de rendimiento usa 20 personajes y 60 frames para verificar que la silueta se renderiza una vez por personaje, mientras la cara continúa animándose; también comprueba que se cancelan los frames al desmontar.

## Migración del contrato anterior

- Reemplazá `faceStyle` y `FACE_PRESETS` por `face: { eyes, mouth, eyebrows }` completo.
- Para la combinación anterior B, enviá `{ eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' }`.
- `smile`, `frown`, `neutral` y `open` eran alias de la misma boca geométrica: usá `standard`. La emoción la indica `expression`.
- `grin` pasa a llamarse `wide`.
- Los consumidores deben elegir explícitamente si quieren cejas expresivas, de una geometría concreta o `none`.

El paquete no fue publicado en npm. Su nombre es provisional y su licencia está pendiente (`UNLICENSED`).

Una forma personalizada puede implementar `fromName: (name) => CustomShape` para resolver sus proporciones y su `faceBox` de forma determinista. Se resuelve junto con la apariencia y no se recalcula por cada frame. `createNameRandom(name, 'canal')` permite variaciones independientes por forma.

El trazo `standard` conserva siempre una sola curva sin relleno: su ancho y curvatura dependen de la expresión. No admite animación de habla y la demo desactiva ese control. Círculo, cuadrado, estrella y corazón varían de tamaño según el nombre. El triángulo es una forma base adicional; tanto éste como el cuadrado varían también su rotación (hasta 15°). La cara mantiene su orientación y su zona se escala junto con la silueta.

El pico es la variante de boca `beak`, disponible para cualquier forma. En la demo se selecciona al elegir pingüino, y después se puede reemplazar por cualquier otra boca. La silueta no incluye el pico. Su contorno permanece constante, acompaña suavemente la mirada y no admite habla.

En `happy`, la boca `cat` muestra una curva cerrada de dos lóbulos y cachetes rosados; el habla queda desactivada para esa pose. Los dientes `shark` siguen la curva superior de la boca, también en sorpresa y durante las transiciones.
