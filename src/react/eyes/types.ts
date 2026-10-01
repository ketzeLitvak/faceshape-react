import type { ComponentType } from 'react';
import type { FaceState, FaceStyle } from '../types';

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

export interface EyeStrategy {
  render: ComponentType<EyeRenderProps>;
  dimensions: (style: FaceStyle) => EyeDimensions;
  isClosed: (openness: number) => boolean;
  gazeDistance: number;
  browBaseline: number;
  cheeks: boolean;
  idleGlance: boolean;
  restingBrows?: 'soft';
}
