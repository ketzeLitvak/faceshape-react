import type { FaceBox, FaceGeometry } from './types';
export function parseViewBox(viewBox = '0 0 100 100'): [
  number,
  number,
  number,
  number
] {
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isFinite(n)) || parts[2] <= 0 || parts[3] <= 0)
    throw new Error('viewBox must contain x y width height, with positive dimensions');
  return parts as [
    number,
    number,
    number,
    number
  ];
}
export function validateFaceBox(box: FaceBox): FaceBox {
  if (![box.x, box.y, box.width, box.height].every(Number.isFinite) || box.x < 0 || box.y < 0 || box.width <= 0 || box.height <= 0 || box.x + box.width > 1.000001 || box.y + box.height > 1.000001)
    throw new Error('faceBox must be a positive rectangle within normalized 0..1 bounds');
  return box;
}
export function faceTransform(box: FaceBox, viewBox = '0 0 100 100'): string {
  validateFaceBox(box);
  const [x, y, w, h] = parseViewBox(viewBox);
  return `translate(${x + box.x * w} ${y + box.y * h}) scale(${box.width * w / 100} ${box.height * h / 100})`;
}
/** Compatible path topology for every expression and in-between state. */
export function mouthPath(face: FaceGeometry): string {
  const left = 50 - face.mouthWidth / 2, right = 50 + face.mouthWidth / 2;
  const curve = face.mouthCurve * 13, open = face.mouthOpen * 14;
  return `M${left} 68 Q50 ${68 + curve - open} ${right} 68 Q50 ${68 + curve + open} ${left} 68Z`;
}
