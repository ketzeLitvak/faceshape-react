import { type CustomShape, createNameRandom } from '../../src';
import { desktopFromName } from './device/desktop';
import { notebookFromName } from './device/notebook';
import { phoneFromName } from './device/phone';
import { tabletFromName } from './device/tablet';

const devices = [
  { kind: 'desktop', create: desktopFromName },
  { kind: 'notebook', create: notebookFromName },
  { kind: 'phone', create: phoneFromName },
  { kind: 'tablet', create: tabletFromName },
] as const;

function deviceFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'device-kind');
  const selected = devices[Math.floor(random() * devices.length)];
  const shape = selected.create(name);
  return {
    ...shape,
    render: ({ color }) => (
      <g data-faceshape-device="" data-device-kind={selected.kind}>
        {shape.render?.({ color })}
      </g>
    ),
  };
}

export const device: CustomShape = {
  ...deviceFromName('default'),
  fromName: deviceFromName,
};
