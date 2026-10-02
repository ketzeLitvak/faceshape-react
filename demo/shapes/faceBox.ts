import type { FaceBox } from '../../src';

export function centeredFaceBox(width: number, height: number, x = 50, y = 50): FaceBox {
  return {
    x: (x - width / 2) / 100,
    y: (y - height / 2) / 100,
    width: width / 100,
    height: height / 100,
  };
}
