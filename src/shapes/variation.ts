import { createNameRandom } from '../core/index';

export function shapeVariation(name: string | number, shape: string) {
  const random = createNameRandom(name, shape);
  return {
    width: 0.82 + random() * 0.16,
    height: 0.82 + random() * 0.16,
    detail: 0.75 + random() * 0.5,
  };
}

export function scaledFaceBox(
  box: { x: number; y: number; width: number; height: number },
  width: number,
  height: number,
) {
  return {
    x: 0.5 + (box.x - 0.5) * width,
    y: 0.5 + (box.y - 0.5) * height,
    width: box.width * width,
    height: box.height * height,
  };
}
