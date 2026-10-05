import type { CustomShape } from '../react/types';

/** Preserve a base silhouette while resolving future identities with the same factory. */
export function createNamedShape(
  fromName: NonNullable<CustomShape['fromName']>,
  base: CustomShape = fromName('default'),
): CustomShape {
  return { ...base, fromName };
}
