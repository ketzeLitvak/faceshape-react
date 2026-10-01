import { resolveExpression, seededTraits } from '../../core/index';
import type { ExpressionDefinition, ExpressionName } from '../../core/types';

export function resolveFaceGeometry(
  expression: ExpressionName | ExpressionDefinition,
  identity?: string | number,
) {
  const resolved = resolveExpression(expression);
  const geometry = { ...resolved, ...seededTraits(identity) };
  if (typeof expression !== 'string') {
    if (expression.eyeSpacing !== undefined) {
      geometry.eyeSpacing = resolved.eyeSpacing;
    }
    if (expression.pupilSize !== undefined) {
      geometry.pupilSize = resolved.pupilSize;
    }
  }
  return geometry;
}
