import type { EyebrowVariant, EyeVariant, MouthVariant } from '../src';

export const EYE_OPTIONS: { value: EyeVariant; label: string }[] = [
  { value: 'dots', label: 'Ovalados simples' },
  { value: 'bright', label: 'Ovalados con brillo' },
  { value: 'joyful', label: 'Arcos sonrientes' },
  { value: 'cartoon', label: 'Blancos con pupilas' },
  { value: 'sly', label: 'Entrecerrados' },
  { value: 'kawaii', label: 'Puntos redondos' },
  { value: 'capsule', label: 'Cápsulas animadas' },
  { value: 'closed', label: 'Cerrados' },
];

export const MOUTH_OPTIONS: { value: MouthVariant; label: string }[] = [
  { value: 'gentle', label: 'Sonrisa pequeña' },
  { value: 'tongue', label: 'Abierta con lengua' },
  { value: 'joyful', label: 'Sonrisa amplia' },
  { value: 'toothy', label: 'Dientes y lengua' },
  { value: 'shark', label: 'Dientes de tiburón' },
  { value: 'smirk', label: 'Sonrisa de costado' },
  { value: 'cat', label: 'Boca de gatito' },
  { value: 'standard', label: 'Trazo simple' },
];

export const BROW_OPTIONS: { value: EyebrowVariant; label: string }[] = [
  { value: 'expression', label: 'Expresivas' },
  { value: 'none', label: 'Sin cejas' },
  { value: 'soft', label: 'Suaves' },
  { value: 'raised', label: 'Elevadas' },
  { value: 'angry', label: 'Inclinadas hacia dentro' },
  { value: 'sad', label: 'Inclinadas hacia fuera' },
];
