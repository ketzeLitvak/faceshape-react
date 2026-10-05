import { renderToStaticMarkup } from 'react-dom/server';
import type { CustomShape } from '../src';
import { CUSTOM_SHAPES } from './shapes';
import type { PlaygroundConfiguration } from './workbench/configuration';

const colorToken = '__FACESHAPE_EXPORT_COLOR__';

function svgToJSX(markup: string): string {
  return markup
    .replace(/\b([a-z]+(?:-[a-z]+)+)=/g, (attribute) => {
      if (attribute.startsWith('data-') || attribute.startsWith('aria-')) {
        return attribute;
      }
      return attribute.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    })
    .replace(/\bclass=/g, 'className=')
    .split(`"${colorToken}"`)
    .join('{color}');
}

/** Export custom geometry as a snapshot; expressions and motion remain live. */
export function buildComponentExport(configuration: PlaygroundConfiguration): string {
  const { shape, reduced, ...settings } = configuration;
  const custom = CUSTOM_SHAPES[shape as keyof typeof CUSTOM_SHAPES] as
    | CustomShape
    | undefined;
  let definition = '';
  if (custom) {
    const resolved = custom.fromName?.(configuration.name) ?? custom;
    const { render, fromName: _fromName, ...geometry } = resolved;
    const body = render
      ? svgToJSX(renderToStaticMarkup(render({ color: colorToken })))
      : '';
    definition = `// Silueta personalizada correspondiente al nombre exportado.\nconst customShape: CustomShape = {\n  ...${JSON.stringify(geometry, null, 2)},${render ? `\n  render: ({ color }) => (<>${body}</>),` : ''}\n};\n\n`;
  }
  const props = { ...settings, size: 280, reducedMotion: reduced };
  return `import { Character, type CharacterProps${custom ? ', type CustomShape' : ''} } from 'faceshape-react';\n\n${definition}const characterProps: CharacterProps = {\n  ...${JSON.stringify(props, null, 2)},\n  shape: ${custom ? 'customShape' : JSON.stringify(shape)},\n};\n\nexport default function MyCharacter() {\n  return <Character {...characterProps} />;\n}\n`;
}
