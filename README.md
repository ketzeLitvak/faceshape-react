# FaceShape React

Primera versión funcional de una librería React para convertir formas SVG en personajes animados. React 18/19 + TypeScript. Sin dependencias de animación ni audio.

## Probar el proyecto

Node.js 22.12+ (o Node 24).

```bash
npm ci
npm run dev
```

Abrí la dirección que muestra Vite (normalmente http://localhost:5173). La demo permite cambiar forma, ojos, boca, emoción, nombre, color y movimientos.

```bash
npm run lint
npm run typecheck
npm test
npm run demo:build
npm pack
```

`npm pack` genera `faceshape-react-0.1.0.tgz`. Instalalo desde otro proyecto con `npm install /ruta/faceshape-react-0.1.0.tgz`. El nombre npm es provisional: no se publicó ni se comprobó su disponibilidad. La licencia está pendiente (`UNLICENSED`).

## Organización y formato

Biome aplica formato e imports ordenados y revisa el código con `npm run lint`. Usá `npm run lint:fix` para corregir los problemas automáticos o `npm run format` para formatear. El CI verifica el lint, incluyendo el formato. Las reglas exigen bloques con llaves y una declaración por variable.

Las variantes viven en `src/react/eyes/`, `src/react/mouths/` y `src/react/eyebrows/`, con un archivo por estilo. Cada carpeta tiene sus tipos y un `registry.ts` tipado que selecciona la estrategia. `Eyes`, `Mouth` y `Eyebrows` coordinan el estado y delegan el comportamiento; no contienen ramas por variante. Las rutinas geométricas compartidas permanecen separadas para evitar duplicarlas. La boca de tiburón y sus dientes viven en `mouths/shark.tsx` y `mouths/SharkTeeth.tsx`.

Las siluetas base están en `src/core/shapes/`; las formas personalizadas de la demo, en `demo/shapes/`, también con un archivo por forma. Para agregar una variante, implementá su contrato y registrala en el mapa de su categoría.

## Uso

```tsx
import { Character } from 'faceshape-react';

<Character
  shape="blob"
  expression="happy"
  color="#388697"
  size={200}
  name="Ezequiel"
  motion={{ idle: true, blink: true, lookAt: 'cursor' }}
/>
```

| Prop | Valores / comportamiento |
| --- | --- |
| `shape` | `circle`, `blob`, `square`, `star` o definición propia. Default: `blob`. |
| `expression` | `neutral`, `happy`, `sad`, `angry`, `surprised`, `sleepy` o parámetros propios. Default: `neutral`. |
| `faceStyle` | `soft` (estilo B: ojos negros ovalados) o `cartoon` (estilo D: ojos blancos con pupilas y dientes). Default: `soft`. |
| `face` | `{ eyes, mouth, eyebrows }`: variantes que reemplazan partes del preset. |
| `motion` | Opciones independientes: `idle`, `blink`, `bounce`, `shake`, `talking`, `lookAt`. Sin movimiento por defecto. |
| `transition` | `{ duration: 300, easing: 'ease-out' }`. Milisegundos. Easing: `linear`, `ease-out`, `ease-in-out`. |
| `name` | String o número. Determina separación de ojos, tamaño de pupila y fase de parpadeo. |
| `faceBox` | Reemplaza la región de cara de la forma. Coordenadas normalizadas 0..1. |
| `size` | Número o tamaño CSS, default `160`. `width` / `height` SVG pueden reemplazarlo. |
| `color`, `faceColor` | Color de la silueta y de los rasgos. |
| `label` | Nombre accesible. Sin label/aria-label/aria-labelledby, el SVG es decorativo. |
| `reducedMotion` | `true` desactiva todo movimiento. Siempre respeta también la preferencia del sistema. |

También acepta `className`, `style`, `ref` y atributos/eventos de SVG.

### Expresión dinámica

```tsx
<Character
  expression={isError ? 'sad' : 'happy'}
  transition={{ duration: 300, easing: 'ease-in-out' }}
  motion={{ idle: true, blink: true, talking: isTalking }}
/>
```

`talking` anima la apertura de la boca. No usa micrófono, audio ni sincronización labial. `bounce` y `shake` se repiten mientras sean `true`; para una acción acotada, activalas/desactivalas desde tu estado. No hay API imperativa de acciones puntuales en esta versión.

### Mirada

`lookAt: 'cursor'` sigue eventos pointer del navegador (mouse, lápiz o desplazamiento táctil). `lookAt: { x: 0.5, y: 0.5 }` mira al centro; los extremos están entre 0 y 1 y se limitan a ese rango. Con reduced motion, la mirada se queda centrada.

### Una forma propia

```tsx
import { Character, defineShape } from 'faceshape-react';

const heart = defineShape({
  path: 'M50 88 C40 79 7 57 7 31 C7 9 37 5 50 24 C63 5 93 9 93 31 C93 57 60 79 50 88Z',
  viewBox: '0 0 100 100',
  faceBox: { x: 0.23, y: 0.27, width: 0.54, height: 0.4 },
});

<Character shape={heart} expression="happy" />
```

Una forma también puede usar `render: ({ color }) => <g>...</g>` en lugar de `path` para varios nodos SVG. No devuelvas otro `<svg>` con coordenadas distintas. La región faceBox se ajusta manualmente: no se detecta automáticamente. Las coordenadas de la cara se mapean al viewBox de la forma, incluso si su origen no es 0,0.

### Partes independientes

```tsx
import { Character, Face, Eyes, Mouth, Eyebrows } from 'faceshape-react';

<Character shape="circle" motion={{ idle: true }}>
  <Face>
    <Eyebrows variant="raised" />
    <Eyes variant="cute" />
    <Mouth variant="grin" />
  </Face>
</Character>
```

Si pasás `children`, reemplazan la cara automática completa: incluí todas las partes que quieras dibujar. También podés pasar Eyes/Mouth/Eyebrows directamente como hijos. Los componentes de cara deben estar dentro de Character.

- Ojos: `round`, `oval`, `cute`, `happy`, `closed`.
- Boca: `smile`, `frown`, `neutral`, `open`, `grin`, `small`.
- Cejas: `soft`, `raised`, `angry`, `sad`, `none`.

Las variantes explícitas reemplazan la geometría de su parte, por lo que no se interpolan al cambiar de variante. Las transiciones suaves corresponden a cambios de `expression` usando la geometría por defecto. Los ojos `happy` y `closed` ya son curvas cerradas y no necesitan el parpadeo habitual.

### Expresiones propias y core

```tsx
import { defineExpression } from 'faceshape-react/core';
const curious = defineExpression({ eyeOpen: 1.1, mouthCurve: 0.4,
  browOpacity: 1, browLift: -4, browAngle: -8 });
<Character expression={curious} />
```

El core no importa React ni usa APIs de navegador. Exporta presets, interpolación, validación, generación por nombre y geometría de boca. Las expresiones son objetos numéricos; se validan y limitan a rangos seguros. Los parámetros de ojo explícitos de una expresión propia prevalecen sobre los rasgos del nombre. No se mutan registros globales: reutilizá definiciones como constantes.

## Arquitectura

- `src/core`: geometría, presets, nombres e interpolación independientes de React.
- `src/react`: componentes, contexto de cara, animación y seguimiento pointer.
- `demo`: playground con todas las funciones principales.
- `tests`: validación del core y render del paquete en servidor.

Los movimientos corporales usan grupos SVG anidados con animaciones CSS. Expresiones, parpadeo y boca usan requestAnimationFrame. Las transiciones interrumpidas parten del estado visible actual. Los efectos cancelan frames y eliminan listeners al desmontar. SSR no toca window; el paquete React lleva `use client` para frameworks compatibles. No requiere importar CSS externo.

## Estado y siguientes mejoras

Versión 0.1.0: API inicial, preparada para pruebas e instalación local. Todavía no está publicada en npm. Pendientes para una versión estable: API de acciones puntuales, escala de muchos personajes con reloj compartido, animaciones personalizadas y pruebas en una matriz más amplia de navegadores. Sin audio por decisión de alcance.

### Cambiar de estilo sin cambiar de expresión

```tsx
<Character expression="happy" faceStyle="soft" />    // B
<Character expression="happy" faceStyle="cartoon" /> // D
<Character faceStyle="soft" face={{ mouth: 'grin' }} />
```

La demo permite configurar ojos y boca por separado con chips. El preset happy incluye una sonrisa abierta con lengua. Los estilos visuales no cambian los parámetros de la emoción, las animaciones ni la forma.

## Organización del código

- `src/core/types.ts`: contratos del motor, sin React.
- `src/core/expressions.ts` y `shapes.ts`: presets y validación de definiciones.
- `src/core/geometry.ts`, `math.ts`, `interpolation.ts`, `random.ts`: funciones puras.
- `src/react/types.ts`: props, configuración y estado de React.
- `src/react/Character.tsx`, `Face.tsx`, `Eyes.tsx`, `Mouth.tsx`, `Eyebrows.tsx`: componentes separados.
- `src/react/hooks/`: animación, preferencia de movimiento y seguimiento del cursor.
- `src/react/utils/`: cálculo de geometría para ojos y bocas.
- `demo/components/`, `demo/hooks/`, `demo/options.ts`, `demo/shapes.tsx`, `demo/snippet.ts`: secciones de la demo, estado, opciones, SVG propios y generación del ejemplo.

Los archivos `index.ts` conservan los puntos de entrada públicos del paquete.

## Estilos de la lámina A–F

| Referencia | `faceStyle` | Ojos | Boca |
| --- | --- | --- | --- |
| A | `minimal` | `dots` | `gentle` |
| B (predeterminado) | `soft` | `bright` | `tongue` |
| C | `cheerful` | `joyful` | `joyful` |
| D | `cartoon` | `cartoon` | `toothy` |
| E | `sly` | `sly` | `smirk` |
| F | `kawaii` | `kawaii` | `cat` |

Los presets conservan las emociones. Todas las variantes de ojos y boca conservan la expresión; la variante define sus proporciones y decoraciones. Los parpadeos, la mirada y el movimiento de hablar siguen aplicándose. F agrega mejillas rosadas y E cejas elevadas. Los presets siguen disponibles en la librería por compatibilidad; la demo combina directamente los ojos y bocas.

```tsx
<Character
  shape={shark}
  expression="happy"
  faceStyle="soft"
  face={{ eyes: 'cartoon', mouth: 'tongue' }}
  motion={{ blink: true, lookAt: 'cursor' }}
/>
```

El tiburón de la demo usa una silueta SVG basada en la lámina: cuerpo redondeado, aleta dorsal, aletas laterales, patas y panza clara. Las partes de la cara se dibujan por separado.

La boca `shark` agrega tres dientes superiores triangulares, como el tiburón D de la referencia. Es independiente del preset y los ojos:

```tsx
<Character faceStyle="soft" face={{ eyes: 'bright', mouth: 'shark' }} />
```

En la demo aparece como **D · Dientes de tiburón** en el selector BOCA.

## Nombre, silueta y color

```tsx
<Character name="Ezequiel" shape="blob" face={{ eyes: 'capsule', mouth: 'shark' }} motion={{ idle: true, blink: true }} />
<Character name="Ezequiel" color="#388697" /> // color fijo; mantiene su silueta
```

`name` genera rasgos de la cara, contorno del blob y color por canales determinísticos independientes: el mismo nombre produce el mismo personaje en servidor y navegador. Las otras formas conservan su silueta pero también reciben color por nombre. Sin nombre se conserva el comportamiento anterior. `seed` queda como alias obsoleto para compatibilidad; si se pasan ambos, `name` tiene prioridad.

La demo combina ojos y bocas mediante chips, sin selector de estilo visual. Comienza con los ojos y boca B. **Por nombre** activa el color automático; elegir **Color fijo**, una muestra o el selector de color lo reemplaza. Editar el nombre conserva ese color fijo.

Los ojos `capsule` son cápsulas con mirada suave autónoma cuando `idle` está activo; `motion.glance` permite controlar esa mirada explícitamente. Cursor, brillo y parpadeo usan transformaciones compartidas. La animación de boca ahora cambia también cuando la boca ya estaba abierta.

`getMotionCapabilities(eyes, mouth, geometry)` devuelve `blink`, `lookAt` y `talking`: los ojos cerrados/arcos no admiten parpadeo ni seguimiento mientras están cerrados, pero sí cuando la expresión los abre (por ejemplo, sorpresa). Todas las bocas admiten hablar. La demo desactiva esos controles y el componente evita ejecutar esas animaciones. La preferencia de movimiento reducido desactiva todos los controles de movimiento.

### Mirada coordinada

Cuando se desplaza el ojo completo, las cejas acompañan ese desplazamiento y la boca se mueve el 40% de esa distancia, también durante la mirada autónoma de las cápsulas. En los ojos blancos, donde solo se desplazan las pupilas, la boca y cejas quedan quietas. El parpadeo y la apertura de la boca no alteran su posición. La preferencia de movimiento reducido detiene la mirada de toda la cara.

Todas las variantes responden a `expression`, incluso las de gatito, sonrisa de costado y dientes. Se eliminó el chip «Según expresión»: ahora es el comportamiento común. La variante de ojos animados se llama `capsule`, sin referencias a otras librerías en los tipos.
