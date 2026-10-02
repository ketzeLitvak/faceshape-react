import type { FaceGeometry } from '../../core/types';

export interface BrowGeometry {
  hidden?: boolean;
  angle: number;
  lift: number;
  opacity: number;
}

export type BrowStrategy = (geometry: FaceGeometry) => BrowGeometry;
