import type { ShapeDefinition } from '../types';

const radius = 46;
const halfSide = (Math.sqrt(3) * radius) / 2;

export const triangleShape: Readonly<ShapeDefinition> = Object.freeze({
  path: `M50 ${50 - radius} L${50 + halfSide} ${50 + radius / 2} L${50 - halfSide} ${50 + radius / 2}Z`,
  faceBox: Object.freeze({ x: 0.35, y: 0.355, width: 0.3, height: 0.29 }),
  rotationRange: 180,
});
