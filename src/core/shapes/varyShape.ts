import { createNameRandom } from '../identity';
import type { ShapeDefinition } from '../types';

/** Keep the face upright and scale its box together with the silhouette. */
export function varyShape(
  shape: ShapeDefinition,
  name: string | number,
  channel: string,
): ShapeDefinition {
  const random = createNameRandom(name, channel);
  const identityScale = 0.72 + random() * 0.25;
  const rotation = (random() * 2 - 1) * (shape.rotationRange ?? 0);
  const radians = (rotation * Math.PI) / 180;
  // A rotated 100 × 100 box needs this margin to stay inside the viewBox.
  const rotationExtent = Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians));
  const scale = identityScale / Math.max(1, rotationExtent);
  const box = shape.faceBox;
  return {
    ...shape,
    transform: `translate(50 50) rotate(${rotation}) scale(${scale}) translate(-50 -50)`,
    faceBox: {
      x: 0.5 + (box.x - 0.5) * scale,
      y: 0.5 + (box.y - 0.5) * scale,
      width: box.width * scale,
      height: box.height * scale,
    },
  };
}
