---
name: faceshape-create-face-styles
description: Crear o corregir estilos SVG de ojos, bocas y cejas en faceshape-react mediante strategies y registros. Usar para nuevos rasgos combinables, expresiones, blink/guiño/mirada/habla, dientes/brillos/cachetes, errores visuales o controles de animación incoherentes con el estilo.
---

# Crear rasgos expresivos FaceShape

## Leer el contrato real

Localizar el proyecto faceshape-react y respetar AGENTS.md. Leer `src/core/types.ts`, `src/core/expressions.ts`, `src/react/types.ts`, el componente de la parte, sus strategy types/registry, `src/react/capabilities.ts` y los helpers de geometría que consume. Leer [contratos](references/face-contracts.md), [expresiones](references/expressions.md) y [validación](references/validation.md). Prevalecer el código vivo sobre estas referencias.

Si sólo existe una app consumidora del paquete, no inventar APIs como registerEyes/customMouth. Explicar que agregar variantes requiere editar la librería o usar la composición realmente soportada por su versión.

## Crear una estrategia, no un switch central

- Crear un archivo por estilo y un renderer separado cuando tenga geometría propia. Registrar la implementación en el registro tipado y agregar el nombre a su unión. Mantener lógica de estilo fuera de Eyes, Mouth y Eyebrows.
- Reutilizar helpers para cálculos genuinamente comunes; no forzar todas las variantes al mismo path. Mantener los archivos legibles y formateados por el linter.
- Para nuevos ojos unitarios/cíclope, comprobar el loop actual: Eyes renderiza dos instancias. No declarar soporte de un ojo central sin una estrategia explícita para esa topología y sus cejas, mirada y guiño. No hardcodear excepciones por nombre de variante.
- El contrato siempre requiere ojos, boca y cejas explícitos. Conservar none en cada parte, independiente del cuerpo. En la demo listar “Sin…” primero sin convertirlo en selección inicial.

## Resolver expresión y movimiento

1. Diseñar la identidad del estilo y sus seis poses con [la matriz de expresiones](references/expressions.md).
2. Calcular geometría desde FaceGeometry interpolada; no seleccionar paths sólo por el nombre de expresión. Considerar estados intermedios, expresiones personalizadas y geometría de identidad.
3. En ojos aplicar `geometry.eyeOpen * blink`: blink=1 abierto, blink=0 cerrado. Usar el fixture actual de cierre unilateral por índice para comprobar ambas mitades; no inventar una opción pública wink. No inferir sleepy de blink.
4. Mantener iris/brillo/pestañas dentro del mismo transform y clip que su ojo. Si se mueve sólo la pupila, mover su brillo con ella. Si se mueve todo el ojo, mover sus elementos juntos.
5. Respetar getFaceGaze: ojos sin blancos mueven el ojo y las cejas, boca sigue con menor distancia; ojos con blancos desplazan pupilas internamente y no arrastran toda la cara. No aplicar la mirada dos veces.
6. Resolver cejas y párpados respecto de baselines reales; inspeccionar entrecerrado y guiño para evitar gaps y superposición. Si una nueva topología exige otro contrato, evolucionarlo de forma tipada en vez de fingir soporte.
7. Mantener boca y decoraciones en el mismo espacio de coordenadas. Derivar dientes desde la curva superior real, recalcular con ancho/apertura/curvatura y clippear lengua/dientes al contorno abierto. No fijar y=65 para todas las expresiones.
8. Mantener una boca de trazo simple como un solo trazo sin relleno ni apertura. Para sonrisa de gatito cerrada, conservar dos lóbulos y cachetes propios de la boca; no añadir cachetes a un estilo de ojos. En sorpresa usar una abertura clara sin punta central accidental; en dormido preservar identidad.
9. Declarar capacidades honestas con isClosed, supportsTalking, lineOnly, hidden y getMotionCapabilities según el contrato actual. Usar la misma geometría/condición para el dibujo y el control; una variante puede admitir habla en sorpresa y no en happy. No dejar controles activos si no tienen efecto.
10. Usar color facial del contexto; generar clip IDs por instancia con useId y por ojo con index. Mantener hooks incondicionales aunque la parte esté oculta. Respetar reducedMotion y SSR.

## Integrar y comprobar

Actualizar unión, registro, chips de demo, documentación y pruebas cuando corresponda; no introducir presets faciales. Verificar combinaciones con otras bocas/ojos/cejas y none. Seguir [validación](references/validation.md), incluyendo revisión visual real y capacidades. Reportar la implementación y evidencia; publicar sólo dentro de la autorización vigente.
