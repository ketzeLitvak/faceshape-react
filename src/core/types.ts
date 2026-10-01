export type ExpressionName =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'surprised'
  | 'sleepy';

export type ShapeName = 'circle' | 'blob' | 'square' | 'star' | 'triangle';

export interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ShapeDefinition {
  path: string;
  viewBox?: string;
  /** Optional transform of the silhouette; the face stays upright. */
  transform?: string;
  /** Maximum identity-dependent rotation in degrees. */
  rotationRange?: number;
  /** The silhouette includes a permanent mouth or beak. */
  fixedMouth?: boolean;
  faceBox: FaceBox;
}

export interface FaceGeometry {
  eyeOpen: number;
  eyeCurve: number;
  eyeAngle: number;
  eyeSpacing: number;
  pupilSize: number;
  mouthWidth: number;
  mouthCurve: number;
  mouthOpen: number;
  browAngle: number;
  browLift: number;
  browOpacity: number;
}

export type ExpressionDefinition = Partial<FaceGeometry>;

export type Easing = 'linear' | 'ease-out' | 'ease-in-out';
