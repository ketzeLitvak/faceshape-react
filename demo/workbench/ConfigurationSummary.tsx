import { colorFromName } from '../../src';
import { BROW_OPTIONS, EYE_OPTIONS, MOUTH_OPTIONS } from '../options';
import type { PlaygroundConfiguration } from './configuration';

const labelFor = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

const shapeLabels: Record<string, string> = {
  circle: 'Círculo',
  blob: 'Blob',
  square: 'Cuadrado',
  star: 'Estrella',
  triangle: 'Triángulo',
  heart: 'Corazón',
  shark: 'Tiburón',
  penguin: 'Pingüino',
  device: 'Dispositivo',
  cloud: 'Nube',
  ghost: 'Fantasma',
  cat: 'Gato',
  robot: 'Robot',
  planet: 'Planeta',
  flower: 'Flor',
  drop: 'Gota',
  toast: 'Tostada',
};
const motionLabels: Record<string, string> = {
  idle: 'Movimiento suave',
  blink: 'Parpadeo',
  bounce: 'Rebote',
  shake: 'Sacudida',
  talking: 'Habla',
  glance: 'Mirada automática',
  lookAt: 'Mirada dirigida',
};

export function configurationDetails(config: PlaygroundConfiguration) {
  const motion = Object.entries(config.motion)
    .filter(([, value]) => value)
    .map(([key]) => motionLabels[key] ?? key)
    .sort()
    .join(', ');
  return {
    Nombre: config.name || 'Sin nombre',
    Forma: shapeLabels[config.shape] ?? config.shape,
    Ojos: labelFor(EYE_OPTIONS, config.face.eyes),
    Boca: labelFor(MOUTH_OPTIONS, config.face.mouth),
    Cejas: labelFor(BROW_OPTIONS, config.face.eyebrows),
    Expresión: config.expression,
    Color: `${config.color ? 'Fijo' : 'Por nombre'} · ${config.color ?? colorFromName(config.name)}`,
    Movimiento: `${config.reduced ? 'Pausado · ' : ''}${motion || 'Sin movimientos'}`,
  };
}
