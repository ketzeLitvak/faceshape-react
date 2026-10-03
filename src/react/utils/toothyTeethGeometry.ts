import { quadraticDerivative, quadraticValue } from '../../core/drawing';
import type { FaceGeometry } from '../../core/types';

/** Follow the mouth's upper quadratic edge instead of floating inside its opening. */
export function toothyTeethPath(geometry: FaceGeometry): string {
  const { mouthWidth: width, mouthOpen: openness, mouthCurve: curve } = geometry;
  const smiling = curve > 0 && openness > 0.015;
  const baseline = smiling ? 64 : 68;
  const control = smiling ? 64 : 68 + curve * 13 - openness * 14;
  const start = 0.14;
  const end = 0.86;
  const edge = (t: number) => quadraticValue(baseline, control, baseline, t);
  const left = 50 - width * 0.36;
  const right = 50 + width * 0.36;
  const leftY = edge(start);
  const rightY = edge(end);
  const controlY =
    leftY + (quadraticDerivative(baseline, control, baseline, start) * (end - start)) / 2;
  const depth = 4 * openness;
  return `M${left} ${leftY} Q50 ${controlY} ${right} ${rightY} L${right} ${rightY + depth} Q50 ${controlY + depth} ${left} ${leftY + depth}Z`;
}
