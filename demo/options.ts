import type { EyeVariant, FaceStyle, MouthVariant } from '../src';

export const STYLE_OPTIONS: { value: FaceStyle; label: string }[] = [
  { value: 'minimal', label: 'A · Simple' },
  { value: 'soft', label: 'B · Ovalados con brillo' },
  { value: 'cheerful', label: 'C · Alegre' },
  { value: 'cartoon', label: 'D · Cartoon' },
  { value: 'sly', label: 'E · Pícaro' },
  { value: 'kawaii', label: 'F · Kawaii' },
];
export const EYE_OPTIONS: { value: EyeVariant; label: string }[] = [
  { value: 'dots', label: 'A · Ovalados simples' },
  { value: 'bright', label: 'B · Ovalados con brillo' },
  { value: 'joyful', label: 'C · Arcos sonrientes' },
  { value: 'cartoon', label: 'D · Blancos con pupilas' },
  { value: 'sly', label: 'E · Entrecerrados' },
  { value: 'kawaii', label: 'F · Puntos redondos' },
  ...(['round', 'oval', 'cute', 'happy', 'closed'] as const).map(value => ({ value, label: value })),
];
export const MOUTH_OPTIONS: { value: MouthVariant; label: string }[] = [
  { value: 'gentle', label: 'A · Sonrisa pequeña' },
  { value: 'tongue', label: 'B · Abierta con lengua' },
  { value: 'joyful', label: 'C · Sonrisa amplia' },
  { value: 'toothy', label: 'D · Dientes y lengua' },
  { value: 'shark', label: 'D · Dientes de tiburón' },
  { value: 'smirk', label: 'E · Sonrisa de costado' },
  { value: 'cat', label: 'F · Boca de gatito' },
  ...(['smile', 'frown', 'neutral', 'open', 'grin', 'small'] as const).map(value => ({ value, label: value })),
];
