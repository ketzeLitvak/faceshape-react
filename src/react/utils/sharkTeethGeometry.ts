import { quadraticDerivative, quadraticValue } from '../../core/drawing';
import type { FaceGeometry } from '../../core/types';

/** Trace each tooth base along the exact upper quadratic mouth contour. */
export function sharkTeethPaths(geometry: FaceGeometry): string[] {
  const { mouthWidth: width, mouthOpen: openness, mouthCurve: curve } = geometry;
  const smiling = curve > 0 && openness > 0.015;
  const baseline = smiling ? 64 : 68;
  const control = smiling ? 64 : 68 + curve * 13 - openness * 14;
  const edge = (t: number) => quadraticValue(baseline, control, baseline, t);
  const derivative = (t: number) => quadraticDerivative(baseline, control, baseline, t);
  const depth = 8 * openness;

  return [-1, 0, 1].map((position) => {
    const center = 50 + position * width * 0.24;
    const left = center - width * 0.09;
    const right = center + width * 0.09;
    const start = (left - (50 - width / 2)) / width;
    const end = (right - (50 - width / 2)) / width;
    const middle = (start + end) / 2;
    const controlY = edge(start) + (derivative(start) * (end - start)) / 2;
    return `M${left} ${edge(start)} Q${center} ${controlY} ${right} ${edge(end)} L${center} ${edge(middle) + depth}Z`;
  });
}
