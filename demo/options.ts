import type { EyebrowVariant, EyeVariant, MouthVariant } from '../src';

export const EYE_OPTIONS: { value: EyeVariant; label: string }[] = [
  { value: 'none', label: 'Sin ojos' },
  { value: 'dots', label: 'Ovalados simples' },
  { value: 'bright', label: 'Ovalados con brillo' },
  { value: 'joyful', label: 'Arcos sonrientes' },
  { value: 'cartoon', label: 'Blancos con pupilas' },
  { value: 'sly', label: 'Entrecerrados' },
  { value: 'capsule', label: 'Cápsulas animadas' },
  { value: 'closed', label: 'Cerrados' },
  { value: 'eyelashes', label: 'Con pestañas' },
  { value: 'heart', label: 'Pupilas corazón' },
  { value: 'star', label: 'Pupilas estrella' },
  { value: 'softLids', label: 'Párpados suaves' },
  { value: 'cyclops', label: 'Cíclope' },
  { value: 'spiral', label: 'Espirales' },
];

export const MOUTH_OPTIONS: { value: MouthVariant; label: string }[] = [
  { value: 'none', label: 'Sin boca' },
  { value: 'beak', label: 'Pico' },
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
  { value: 'none', label: 'Sin cejas' },
  { value: 'expression', label: 'Expresivas' },
  { value: 'soft', label: 'Suaves' },
  { value: 'raised', label: 'Elevadas' },
  { value: 'angry', label: 'Inclinadas hacia dentro' },
  { value: 'sad', label: 'Inclinadas hacia fuera' },
];
