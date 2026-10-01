import type { ReactNode, SVGProps } from 'react';
import type {
  Easing,
  ExpressionDefinition,
  ExpressionName,
  FaceBox,
  FaceGeometry,
  ShapeDefinition,
  ShapeName,
} from '../core/index';

export type FaceStyle = 'minimal' | 'soft' | 'cheerful' | 'cartoon' | 'sly' | 'kawaii';

export type EyeVariant =
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
  | 'kawaii'
  | 'capsule';

export type MouthVariant =
  | 'smile'
  | 'frown'
  | 'neutral'
  | 'open'
  | 'grin'
  | 'small'
  | 'gentle'
  | 'tongue'
  | 'joyful'
  | 'toothy'
  | 'shark'
  | 'smirk'
  | 'cat';

export type EyebrowVariant = 'soft' | 'raised' | 'angry' | 'sad' | 'none';

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
  eyes?: EyeVariant;
  mouth?: MouthVariant;
  eyebrows?: EyebrowVariant;
}

export interface FacePreset {
  eyes: EyeVariant;
  mouth: MouthVariant;
  eyebrows: EyebrowVariant;
  cheeks?: boolean;
  restingBrows?: EyebrowVariant;
}

export interface CustomShape extends Omit<ShapeDefinition, 'path'> {
  path?: string;
  /** SVG nodes only, e.g. paths. Do not return a nested svg with a different coordinate space. */
  render?: (props: { color: string }) => ReactNode;
}

export type CharacterProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'color'> & {
  shape?: ShapeName | CustomShape;
  faceBox?: FaceBox;
  expression?: ExpressionName | ExpressionDefinition;
  face?: FaceConfig;
  /** soft: black pill eyes (B); cartoon: eye whites and teeth (D). */
  faceStyle?: FaceStyle;
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
  faceStyle: FaceStyle;
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
  width: number;
  openness: number;
}

export interface MotionCapabilities {
  blink: boolean;
  talking: boolean;
  lookAt: boolean;
}
