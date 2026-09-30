import type { ReactNode, SVGProps } from 'react';
import type { Easing, ExpressionDefinition, ExpressionName, FaceBox, ShapeDefinition, ShapeName } from '../core/index';
export type EyeVariant = 'round' | 'oval' | 'cute' | 'happy' | 'closed';
export type MouthVariant = 'smile' | 'frown' | 'neutral' | 'open' | 'grin' | 'small';
export type EyebrowVariant = 'soft' | 'raised' | 'angry' | 'sad' | 'none';
export type LookTarget = 'cursor' | { x: number; y: number };
export interface MotionConfig { idle?: boolean; blink?: boolean; bounce?: boolean; shake?: boolean; talking?: boolean; lookAt?: LookTarget }
export interface FaceConfig { eyes?: EyeVariant; mouth?: MouthVariant; eyebrows?: EyebrowVariant }
export interface CustomShape extends Omit<ShapeDefinition,'path'> {
 path?: string;
 /** SVG nodes only, e.g. paths. Do not return a nested svg with a different coordinate space. */
 render?: (props: { color: string }) => ReactNode;
}
export type CharacterProps = Omit<SVGProps<SVGSVGElement>,'children'|'color'> & {
 shape?: ShapeName | CustomShape;
 faceBox?: FaceBox;
 expression?: ExpressionName | ExpressionDefinition;
 face?: FaceConfig;
 motion?: MotionConfig;
 transition?: { duration?: number; easing?: Easing };
 seed?: string | number;
 color?: string;
 faceColor?: string;
 size?: number | string;
 label?: string;
 /** Always honors the user's OS preference; true also disables motion explicitly. */
 reducedMotion?: boolean;
 children?: ReactNode;
};
