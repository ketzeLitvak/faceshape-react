import type { ReactNode, RefObject, SVGProps } from 'react';
import type {
  Easing,
  ExpressionDefinition,
  ExpressionName,
  FaceBox,
  FaceGeometry,
  ShapeDefinition,
  ShapeName,
} from '../core/index';

export type EyeVariant =
  | 'none'
  | 'round'
  | 'oval'
  | 'cute'
  | 'happy'
  | 'closed'
  | 'dots'
  | 'bright'
  | 'joyful'
  | 'cartoon'
  | 'sly'
  | 'capsule';

export type MouthVariant =
  | 'none'
  | 'beak'
  | 'standard'
  | 'wide'
  | 'small'
  | 'gentle'
  | 'tongue'
  | 'joyful'
  | 'toothy'
  | 'shark'
  | 'smirk'
  | 'cat';

export type EyebrowVariant = 'expression' | 'soft' | 'raised' | 'angry' | 'sad' | 'none';

export type LookTarget =
  | 'cursor'
  | {
      x: number;
      y: number;
    };

export interface MotionConfig {
  idle?: boolean;
  blink?: boolean;
  bounce?: boolean;
  shake?: boolean;
  talking?: boolean;
  lookAt?: LookTarget;
  glance?: boolean;
}

export interface FaceConfig {
  eyes: EyeVariant;
  mouth: MouthVariant;
  eyebrows: EyebrowVariant;
}

export interface CustomShape extends Omit<ShapeDefinition, 'path'> {
  path?: string;
  /** Resolve identity-dependent geometry once, before rendering. */
  fromName?: (name: string | number) => CustomShape;
  /** SVG nodes only, e.g. paths. Do not return a nested svg with a different coordinate space. */
  render?: (props: { color: string }) => ReactNode;
}

export type CharacterProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'color'> & {
  shape?: ShapeName | CustomShape;
  faceBox?: FaceBox;
  expression?: ExpressionName | ExpressionDefinition;
  face: FaceConfig;
  motion?: MotionConfig;
  transition?: {
    duration?: number;
    easing?: Easing;
  };
  /** Identity used for deterministic silhouette, face traits and automatic color. */
  name?: string;
  /** @deprecated Use name. Retained for existing consumers. */
  seed?: string | number;
  color?: string;
  faceColor?: string;
  size?: number | string;
  label?: string;
  /** Always honors the user's OS preference; true also disables motion explicitly. */
  reducedMotion?: boolean;
  children?: ReactNode;
};

export interface FaceState {
  geometry: FaceGeometry;
  blink: number;
  talk: number;
  look: {
    x: number;
    y: number;
  };
  color: string;
  eyeVariant: EyeVariant;
}

export interface AnimatedFaceOptions {
  duration: number;
  easing: Easing;
  blink: boolean;
  talking: boolean;
  reduced: boolean;
  seedPhase: number;
  glance: boolean;
}

export type FaceProps = FaceConfig & { children?: ReactNode };

export interface SharkTeethProps {
  geometry: FaceGeometry;
}

export interface MotionCapabilities {
  blink: boolean;
  talking: boolean;
  lookAt: boolean;
}

export interface AnimatedFaceProps {
  geometry: FaceGeometry;
  face: FaceConfig;
  motion: MotionConfig;
  transition: NonNullable<CharacterProps['transition']>;
  reduced: boolean;
  svgRef: RefObject<SVGSVGElement | null>;
  color: string;
  children?: ReactNode;
}
