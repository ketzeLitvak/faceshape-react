import {
  blobFromName,
  colorFromName,
  faceTransform,
  parseViewBox,
  SHAPES,
  varyShape,
} from '../../core/index';
import type { AppearanceOptions } from './types';

export function resolveCharacterAppearance({
  shape,
  faceBox,
  identity,
  color,
}: AppearanceOptions) {
  const baseDefinition =
    typeof shape === 'string'
      ? shape === 'blob' && identity !== undefined
        ? blobFromName(identity)
        : identity !== undefined && SHAPES[shape]
          ? varyShape(SHAPES[shape], identity, shape)
          : SHAPES[shape]
      : shape;
  const definition =
    identity !== undefined &&
    baseDefinition &&
    'fromName' in baseDefinition &&
    baseDefinition.fromName
      ? baseDefinition.fromName(identity)
      : baseDefinition;
  if (!definition) {
    throw new Error(`Unknown shape: ${shape}`);
  }
  if (!definition.path && !('render' in definition && definition.render)) {
    throw new Error('Custom shape needs path or render');
  }

  const viewBox = definition.viewBox ?? '0 0 100 100';
  const [x, y, width, height] = parseViewBox(viewBox);
  return {
    definition,
    color: color ?? (identity === undefined ? '#388697' : colorFromName(identity)),
    viewBox: `${x - width * 0.06} ${y - height * 0.06} ${width * 1.12} ${height * 1.12}`,
    transform: faceTransform(faceBox ?? definition.faceBox, viewBox),
  };
}
