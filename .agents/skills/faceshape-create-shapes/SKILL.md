---
name: faceshape-create-shapes
description: Crear o corregir siluetas SVG para faceshape-react respetando CustomShape, faceBox, variación determinista por name, colores y rotación. Usar al agregar animales, objetos o formas geométricas, convertir referencias visuales en SVG nativos o corregir centrado y recortes de personajes FaceShape.
---

# Crear formas FaceShape

## Verificar el contrato vivo

1. Localizar el checkout cuyo package.json declara `faceshape-react`; respetar sus AGENTS.md. No depender de una ruta absoluta de una sesión anterior.
2. Leer `src/core/types.ts`, `src/react/types.ts`, `src/core/shapes.ts`, `src/core/shapes/varyShape.ts`, `src/react/resolvers/resolveCharacterAppearance.ts` y una forma comparable en `demo/shapes/`. Buscar el archivo equivalente si cambió la estructura. Si sólo está disponible el paquete, leer sus declaraciones y limitarse a la extensión pública CustomShape.
3. Leer [contrato y ejemplos](references/shapes.md) y [validación](references/validation.md). Tratar las referencias como orientación; prevalecer el código actual. Si falta el contrato, pedir acceso a esos archivos antes de inventar APIs.

## Diseñar e implementar

- Separar la silueta de los rasgos. No incrustar ojos, cejas, boca ni un pico facial en el cuerpo. Implementar un pico como variante de boca cuando deba ser intercambiable.
- Conservar el lenguaje visual del proyecto: SVG 2D plano, contornos simples, formas claras a tamaños de avatar, colores por identidad o por override. Usar la imagen sólo como referencia; entregar paths/componentes nativos.
- Definir una geometría base con su centro real y una zona segura para la cara antes de escribir JSX. Para un triángulo equilátero, calcular vértices con trigonometría y comprobar lados iguales y centroide; no estimarlos a ojo.
- Diseñar `faceBox` en coordenadas normalizadas respecto del viewBox original. Centrar la caja en el centro del cuerpo si ése es el diseño. Verificar también el centro visual de ojos y boca: centrar una caja no garantiza que los rasgos queden visualmente centrados.
- Mantener la cara derecha cuando sólo gira el cuerpo. Rotar la silueta alrededor de su centro geométrico y escalar/posicionar la caja junto con ella; no aplicar el giro del cuerpo al grupo facial.
- Comprobar que la cara permanezca dentro del contorno en todo el rango de giro, con todas las expresiones. Usar una caja facial contenida en una zona interior segura para todas las orientaciones.
- Variar proporciones con `createNameRandom(name, canal)` o `varyShape`, con límites definidos. No usar Math.random, tiempo, aleatoriedad durante render ni depender del orden de render de otros personajes. Resolver la silueta una vez por identidad, fuera de los frames de animación.
- Usar `color` recibido en render para el cuerpo principal. Permitir colores decorativos explícitos sin anular el color fijo del usuario. Usar `name` en ejemplos y UI; no introducir seed como nueva API.
- Crear un archivo por forma. Para una forma de demo, usar CustomShape sin agregar un nombre ficticio a ShapeName. Para una forma base pública, actualizar la unión, el registro core, exports necesarios, demo y documentación según el contrato vivo.
- Exigir en ejemplos `face={{ eyes, mouth, eyebrows }}` completo. Permitir `none` de forma independiente; no incorporar presets/defaults faciales.
- Evitar SVG anidados con otro espacio de coordenadas. Crear IDs únicos si hay clips/máscaras/gradientes; no hardcodear IDs compartidos.

## Validar y entregar

Seguir la matriz de [validación](references/validation.md). Verificar determinismo, override de color, geometría, SSR y el resultado visual a escala real. No aprobar un SVG sólo porque compila. Informar qué se agregó, qué se verificó y qué queda pendiente. No publicar por esta skill: aplicar la autorización de la tarea actual.
