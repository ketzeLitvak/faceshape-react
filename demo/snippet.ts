import type { SnippetOptions } from './types';
export function buildSnippet({ shape, expression, faceStyle, face, color, seed, motion }: SnippetOptions) {
  const motionLines = Object.entries(motion).filter(([, value]) => value).map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`).join('\n');
  return `${shape === 'heart' || shape === 'shark' ? `// ${shape} es tu forma personalizada\n` : ''}<Character\n  shape=${shape === 'heart' || shape === 'shark' ? `{${shape}}` : JSON.stringify(shape)}\n  expression="${expression}"\n  faceStyle="${faceStyle}"\n  face={${JSON.stringify(face)}}\n  color="${color}"\n  seed={${JSON.stringify(seed)}}\n  size={280}\n  motion={{\n${motionLines}\n  }}\n/>`;
}
