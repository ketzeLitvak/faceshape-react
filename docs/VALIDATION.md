# Validación de la versión 0.1.0

Fecha: 29 de septiembre de 2026.

- TypeScript: compilación de librería y demo sin errores.
- 4 pruebas de core: seed reproducible, todas las interpolaciones entre presets, validación de parámetros y faceBox/viewBox.
- 6 pruebas de render en servidor: 24 combinaciones forma/emoción, accesibilidad, IDs de clip únicos, SVG personalizado, reduced motion y exports CommonJS.
- Navegador Chromium: cambio de expresiones con estados intermedios distintos, SVG propio, talking visual, seguimiento del cursor, movimientos simultáneos y preferencia de movimiento reducido.
- Demo revisada visualmente en escritorio y móvil; sin errores de JavaScript ni desbordamiento horizontal de página.
- Build de la demo para producción y tarball npm generados correctamente.
- Tarball instalado en un proyecto independiente con React 18 y renderizado correctamente. El proyecto principal usa React 19.

Las pruebas de core y servidor se reproducen con `npm test`. La validación de navegador se ejecutó en el entorno de desarrollo; no forma parte del workflow CI de esta versión. No se verificó todavía en Safari ni Firefox, ni con cientos de personajes simultáneos.
