# Decisiones de implementación

- Un único paquete con un subpath `/core` independiente de React.
- Formas y expresiones propias se pasan como definiciones reutilizables. Sin un registro global mutable.
- faceBox normalizado respecto del viewBox; la cara trabaja en coordenadas 0..100.
- Presets expresivos parametrizados; topología estable de la boca para interpolación.
- Configuración motion con flags combinables. bounce y shake se repiten mientras están activos.
- Composición por children reemplaza toda la cara predeterminada. Las variantes explícitas reemplazan la geometría de su parte.
- Preferencia del sistema de movimiento reducido siempre respetada. Prop reducedMotion agrega desactivación explícita.
- Seed modifica separación de ojos, tamaño de pupilas y fase de parpadeo. Parámetros propios explícitos prevalecen.
- Audio excluido. talking es solamente movimiento visual de la boca.
- CSS embebido en SVG para funcionar sin importar una hoja de estilos externa.
- Nombre npm provisional y licencia pendiente: no se publicó en npm.
