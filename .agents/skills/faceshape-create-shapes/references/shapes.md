# Contrato de siluetas

Verificar siempre las declaraciones actuales de faceshape-react.

```ts
interface FaceBox { x: number; y: number; width: number; height: number }
interface ShapeDefinition {
  path: string;
  viewBox?: string;
  transform?: string;
  rotationRange?: number;
  faceBox: FaceBox;
}
interface CustomShape extends Omit<ShapeDefinition, 'path'> {
  path?: string;
  fromName?: (name: string | number) => CustomShape;
  render?: (props: { color: string }) => React.ReactNode;
}
```

- Incluir path o render. Retornar nodos SVG, no otro `<svg>`.
- Usar viewBox original para faceBox; el resolver agrega un margen exterior para presentación. No normalizar con ese margen expandido.
- Validar x/y >= 0, width/height > 0 y x+width/y+height <= 1.
- El centro normalizado es `(x + width/2, y + height/2)`.
- `fromName` se resuelve una vez; no se encadenan generadores recursivamente. El resultado debe contener path o render y una faceBox válida.
- `varyShape` espera coordenadas 0–100 centradas en (50,50). Su implementación actual aplica margen de rotación, escala la caja facial y conserva su orientación. Leerla antes de asumir su rango de escala. Para otro viewBox o centro, calcular un transform propio.
- `rotationRange` es el máximo absoluto: 180 representa orientaciones de −180 a +180, una vuelta completa. No significa una animación de giro.

## Forma personalizada pública mínima

```tsx
import { Character, type CustomShape } from 'faceshape-react';

const gem: CustomShape = {
  viewBox: '0 0 100 100',
  path: 'M50 5 L95 50 L50 95 L5 50Z',
  faceBox: { x: 0.32, y: 0.32, width: 0.36, height: 0.36 },
};

<Character
  shape={gem}
  name="Gema de Ana"
  face={{ eyes: 'bright', mouth: 'cat', eyebrows: 'none' }}
  expression="happy"
/>
```

## Geometría equilateral centrada

Con centro (cx, cy) y radio circunscrito R:
- Superior: (cx, cy − R).
- Inferior derecho: (cx + sqrt(3)·R/2, cy + R/2).
- Inferior izquierdo: (cx − sqrt(3)·R/2, cy + R/2).
- Centroide: media de los tres vértices, exactamente (cx,cy).
- Inradio: R/2. Contener la caja facial en esa zona si el cuerpo puede rotar totalmente.

## Límites de extensión

El contrato público permite siluetas personalizadas. No permite registrar arbitrariamente nuevas variantes de ojos o bocas desde una app consumidora. Para nuevas variantes faciales, modificar la implementación de la librería mediante la skill faceshape-create-face-styles.
