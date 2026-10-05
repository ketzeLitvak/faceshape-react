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

export const SHAPE_GROUPS = [
  {
    label: 'Geométricas',
    shapes: ['circle', 'blob', 'square', 'triangle', 'star', 'heart'],
  },
  { label: 'Animales', shapes: ['shark', 'penguin', 'cat'] },
  {
    label: 'Objetos y naturaleza',
    shapes: ['device', 'robot', 'planet', 'cloud', 'ghost', 'flower', 'drop', 'toast'],
  },
] as const;
export const SHAPE_LABELS: Record<string, string> = {
  circle: 'Círculo',
  blob: 'Blob',
  square: 'Cuadrado',
  triangle: 'Triángulo',
  star: 'Estrella',
  heart: 'Corazón',
  shark: 'Tiburón',
  penguin: 'Pingüino',
  cat: 'Gato',
  device: 'Dispositivo',
  robot: 'Robot',
  planet: 'Planeta',
  cloud: 'Nube',
  ghost: 'Fantasma',
  flower: 'Flor',
  drop: 'Gota',
  toast: 'Tostada',
};
