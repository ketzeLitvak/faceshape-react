export * from './core/index';
export { Character } from './react/Character';
export { getMotionCapabilities } from './react/capabilities';
export type {
  EyeAnchor,
  EyeDimensions,
  EyeRenderProps,
  EyeStrategy,
} from './react/eyes/types';
export { Eyebrows, Eyes, Face, Mouth } from './react/Face';
export type { MouthShape, MouthStrategy } from './react/mouths/types';
export type {
  CustomEyeStrategy,
  CustomMouthStrategy,
  CustomStyleName,
} from './react/registerStyles';
export {
  getEyeStyleNames,
  getMouthStyleNames,
  registerEyeStyle,
  registerMouthStyle,
} from './react/registerStyles';
export type * from './react/types';
