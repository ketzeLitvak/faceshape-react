import { DEMO_SHAPES } from './shapes';
import type { PlaygroundConfiguration } from './workbench/configuration';

export function buildComponentExport(configuration: PlaygroundConfiguration): string {
  const { shape, reduced, ...settings } = configuration;
  const supplied = shape in DEMO_SHAPES;
  const imports = `import { Character, type CharacterProps } from 'faceshape-react';${supplied ? `\nimport { ${shape} } from 'faceshape-react/shapes';` : ''}`;
  const props = { ...settings, size: 280, reducedMotion: reduced };
  return `${imports}\n\nconst characterProps: CharacterProps = {\n  ...${JSON.stringify(props, null, 2)},\n  shape: ${supplied ? shape : JSON.stringify(shape)},\n};\n\nexport default function MyCharacter(props: Partial<CharacterProps>) {\n  return <Character {...characterProps} {...props} />;\n}\n`;
}
