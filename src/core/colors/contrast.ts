export type RGB = [number, number, number];

export function parseHexColor(value: string): RGB {
  if (
    typeof value !== 'string' ||
    !/^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(value) ||
    value.trim() !== value
  ) {
    throw new Error('background must be an opaque hex color: #RGB or #RRGGBB');
  }
  const hex =
    value.length === 4
      ? [...value.slice(1)].map((digit) => digit + digit).join('')
      : value.slice(1);
  return [0, 2, 4].map((index) =>
    Number.parseInt(hex.slice(index, index + 2), 16),
  ) as RGB;
}

export function toHexColor(channels: RGB): string {
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

function luminance(channels: RGB): number {
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrastRatio(foreground: RGB, background: RGB): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function mixColor(color: RGB, target: number, amount: number): RGB {
  return color.map((channel) => Math.round(channel + (target - channel) * amount)) as RGB;
}
