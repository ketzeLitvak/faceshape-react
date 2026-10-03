import type { ComponentType } from 'react';
import type { FaceGeometry } from '../../core/types';
import type { FaceState } from '../types';

export interface EyeDimensions {
  rx: number;
  ry: number;
  whites: boolean;
  highlight: boolean;
}

export interface EyeRenderProps {
  face: FaceState;
  x: number;
  angle: number;
  index: number;
  id: string;
  dimensions: EyeDimensions;
  gaze: string;
}

export interface EyeAnchor {
  x: number;
  angle: number;
  side: -1 | 0 | 1;
}

export interface EyeStrategy {
  supportsBlink?: boolean;
  supportsLookAt?: boolean;
  anchors?: (geometry: FaceGeometry) => EyeAnchor[];
  hidden?: boolean;
  render: ComponentType<EyeRenderProps>;
  dimensions: EyeDimensions;
  isClosed: (openness: number) => boolean;
  gazeDistance: number;
  browBaseline: number;
  idleGlance: boolean;
}
