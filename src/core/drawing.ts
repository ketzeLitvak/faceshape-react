import type { FaceBox } from './types';

export interface Point {
  x: number;
  y: number;
}

export function quadraticValue(
  start: number,
  control: number,
  end: number,
  t: number,
): number {
  return (1 - t) ** 2 * start + 2 * (1 - t) * t * control + t ** 2 * end;
}

export function quadraticDerivative(
  start: number,
  control: number,
  end: number,
  t: number,
): number {
  return 2 * ((1 - t) * (control - start) + t * (end - control));
}

/** Coordinates are expressed in the original viewBox, never the presentation margin. */
export function centeredFaceBox(
  width: number,
  height: number,
  x = 50,
  y = 50,
  viewBoxWidth = 100,
  viewBoxHeight = 100,
): FaceBox {
  if (
    ![width, height, x, y, viewBoxWidth, viewBoxHeight].every(Number.isFinite) ||
    width <= 0 ||
    height <= 0 ||
    viewBoxWidth <= 0 ||
    viewBoxHeight <= 0
  ) {
    throw new Error('Face box dimensions must be finite and positive');
  }
  return {
    x: (x - width / 2) / viewBoxWidth,
    y: (y - height / 2) / viewBoxHeight,
    width: width / viewBoxWidth,
    height: height / viewBoxHeight,
  };
}

/** A planar perspective projection whose lateral edges share a vanishing point. */
export function createPerspectivePlane(
  backWidth: number,
  frontWidth: number,
  backY: number,
  frontY: number,
  centerX = 50,
) {
  if (
    ![backWidth, frontWidth, backY, frontY, centerX].every(Number.isFinite) ||
    backWidth <= 0 ||
    frontWidth <= 0 ||
    frontY <= backY
  ) {
    throw new Error('Perspective plane needs positive widths and increasing depth');
  }
  const convergence = 1 - backWidth / frontWidth;
  return (x: number, depth: number): Point => {
    if (!Number.isFinite(x) || !Number.isFinite(depth) || depth < 0 || depth > 1) {
      throw new Error('Plane depth must be between zero and one');
    }
    const denominator = 1 - convergence * depth;
    return {
      x: centerX + ((x - 0.5) * backWidth) / denominator,
      y: backY + ((frontY - backY) * (1 - convergence) * depth) / denominator,
    };
  };
}

export function polygonPath(points: readonly Point[]): string {
  if (
    points.length < 3 ||
    points.some((p) => !Number.isFinite(p.x) || !Number.isFinite(p.y))
  ) {
    throw new Error('Polygon needs at least three finite points');
  }
  return `${points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ')}Z`;
}
