import type { PlaygroundConfiguration } from './workbench/configuration';

export function initialPlaygroundConfiguration(): PlaygroundConfiguration {
  return {
    shape: 'shark',
    name: 'Tiburoncito',
    expression: 'happy',
    face: { eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' },
    motion: { idle: true, blink: true, lookAt: 'cursor' },
    reduced: false,
  };
}

const adjectives = ['Cósmico', 'Curioso', 'Dorado', 'Travieso', 'Brillante', 'Sereno'];
const names = ['Nube', 'Cometa', 'Coral', 'Pixel', 'Luna', 'Chispa', 'Mango', 'Coco'];

/** Random discovery changes the name, never the deterministic character algorithm. */
export function randomCharacterName(current: string): string {
  const numbers = new Uint32Array(3);
  crypto.getRandomValues(numbers);
  const next = `${names[numbers[0] % names.length]} ${adjectives[numbers[1] % adjectives.length]} ${numbers[2] % 1000}`;
  return next === current ? `${next} nuevo` : next;
}
