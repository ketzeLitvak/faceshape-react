import { CUSTOM_SHAPES } from './shapes';
import type { SnippetOptions } from './types';

export function buildSnippet({
  shape,
  expression,
  face,
  color,
  name,
  motion,
}: SnippetOptions) {
  const motionLines = Object.entries(motion)
    .filter(([, value]) => value)
    .map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`)
    .join('\n');
  return `${shape in CUSTOM_SHAPES ? `// ${shape} es tu forma personalizada\n` : ''}<Character\n  name=${JSON.stringify(name)}\n  shape=${shape in CUSTOM_SHAPES ? `{${shape}}` : JSON.stringify(shape)}\n  expression="${expression}"\n  face={${JSON.stringify(face)}}\n${color === undefined ? '' : `  color="${color}"\n`}  size={280}\n  motion={{\n${motionLines}\n  }}\n/>`;
}
