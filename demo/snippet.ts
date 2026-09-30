import type { SnippetOptions } from './types';
export function buildSnippet({ shape, expression, face, color, name, motion }: SnippetOptions) {
  const motionLines = Object.entries(motion).filter(([, value]) => value).map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`).join('\n');
  return `${shape === 'heart' || shape === 'shark' ? `// ${shape} es tu forma personalizada\n` : ''}<Character\n  name=${JSON.stringify(name)}\n  shape=${shape === 'heart' || shape === 'shark' ? `{${shape}}` : JSON.stringify(shape)}\n  expression="${expression}"\n  face={${JSON.stringify(face)}}\n${color === undefined ? '' : `  color="${color}"\n`}  size={280}\n  motion={{\n${motionLines}\n  }}\n/>`;
}
