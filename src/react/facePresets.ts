import type { FacePreset, FaceStyle } from './types';

/** Defaults for each reference style; explicit face parts override these. */
export const FACE_PRESETS: Readonly<Record<FaceStyle, FacePreset>> = {
  minimal: { eyes: 'dots', mouth: 'gentle', eyebrows: 'none' },
  soft: { eyes: 'bright', mouth: 'tongue', eyebrows: 'none' },
  cheerful: { eyes: 'joyful', mouth: 'joyful', eyebrows: 'none' },
  cartoon: { eyes: 'cartoon', mouth: 'toothy', eyebrows: 'none' },
  sly: { eyes: 'sly', mouth: 'smirk', eyebrows: 'raised' },
  kawaii: { eyes: 'kawaii', mouth: 'cat', eyebrows: 'none', cheeks: true },
};
