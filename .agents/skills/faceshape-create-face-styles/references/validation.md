# Validación de SVG FaceShape

## Matriz visual mínima

Renderizar e inspeccionar, no sólo serializar:
- neutral, happy, sad, angry, surprised, sleepy.
- Happy→surprised y angry→sad en inicio, mitad y fin de interpolación.
- Ojos abiertos, medio blink, blink cerrado, reapertura y guiño de cada lado.
- Mirada al centro y extremos; hablar sólo si la variante lo admite.
- Cejas, ojos y boca en none de forma independiente y todos ausentes.
- Avatar de 32–48 px y muestra de 200–240 px, fondos claro/oscuro, reducedMotion.
- Al menos tres nombres de contraste y el mismo nombre repetido. Para rotación completa, cubrir orientaciones próximas a 0°, 45°, 90°, 180°, 270°; encontrar nombres con esos ángulos o probar el generador directamente.

Usar SSR + Sharp para generar una lámina local y view_image para inspeccionarla; usar el navegador para blink/guiño/mirada reales y responsive. Conservar evidencia en la ubicación de trabajo del proyecto. No usar raster generado por IA como validación de los SVG implementados.

## Verificación funcional

Leer package.json y ejecutar los comandos que existan: lint, typecheck, test y demo:build. Usar los fixtures actuales (`tests/helpers.tsx`, `tests/visual.test.mjs`, `tests/shapes.test.mjs`, `tests/ssr.test.mjs`) antes de inventar un segundo motor de animación.

Agregar regresiones que detecten la falla real:
- Determinismo del contorno/transform/color y prioridad del color fijo.
- Centros, lados iguales cuando corresponde, márgenes y coordenadas finitas en transform/path/faceBox.
- Rasgos presentes/ausentes, IDs distintos entre instancias y render sin APIs del navegador.
- Capacidades coherentes con expresión y estilo.
- Dientes adheridos al contorno superior, lengua dentro del clip, una línea simple sin relleno incluso en happy.
- Que variantes distintas conserven identidad en sleepy y surprised, y que `none` no genere decoraciones huérfanas.

Para actualizar golden SVG, revisar primero la lámina y el diff; actualizar sólo las referencias afectadas por un cambio intencional. Nunca reemplazar todas las referencias para ocultar una regresión. No agregar asserts que sólo repliquen un path literal si se puede comprobar la propiedad geométrica.

## Criterios de rechazo

Corregir antes de entregar: recortes, cara fuera del cuerpo, centro de giro equivocado, brillo que no acompaña el ojo, hueco entre párpado y ceja, dientes flotantes, boca simple rellena, controles de movimiento que anuncian funciones inexistentes, identidad que cambia entre frames, APIs/types que no existen.
