import type { ReactNode } from 'react';
import type { FaceGeometry } from '../../core/types';

export interface MouthShape {
  path: string;
  bottom: number;
  tongueHeight: number;
  closed?: boolean;
  cheeks?: boolean;
}

export interface MouthStrategy {
  hidden?: boolean;
  widthScale: number;
  resolveGeometry?: (geometry: FaceGeometry) => FaceGeometry;
  lineOnly?: boolean;
  solidFill?: string;
  supportsTalking?: boolean;
  isClosed?: (geometry: Partial<FaceGeometry>) => boolean;
  shape: (geometry: FaceGeometry) => MouthShape;
  decoration?: (geometry: FaceGeometry) => ReactNode;
}
