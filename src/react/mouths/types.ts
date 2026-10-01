import type { ReactNode } from 'react';
import type { FaceGeometry } from '../../core/types';

export interface MouthShape {
  path: string;
  bottom: number;
  tongueHeight: number;
}

export interface MouthStrategy {
  widthScale: number;
  lineOnly?: boolean;
  shape: (geometry: FaceGeometry) => MouthShape;
  decoration?: (geometry: FaceGeometry) => ReactNode;
}
