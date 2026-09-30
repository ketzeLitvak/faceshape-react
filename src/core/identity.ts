import type { ShapeDefinition } from './types';

/** Independent random streams keep color, contour and face traits stable. */
export function createNameRandom(name: string | number, channel = 'face') {
  let hash = 2166136261;
  for (const character of `${channel}:${name}`) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return () => {
    hash = (hash + 0x6D2B79F5) | 0;
    let value = Math.imul(hash ^ (hash >>> 15), hash | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function colorFromName(name: string | number): string {
  const random = createNameRandom(name, 'color');
  const hue = random() * 360;
  const saturation = .48 + random() * .18;
  const lightness = .57 + random() * .08;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const intermediate = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  const offset = lightness - chroma / 2;
  const channels = hue < 60 ? [chroma, intermediate, 0] : hue < 120 ? [intermediate, chroma, 0] : hue < 180 ? [0, chroma, intermediate] : hue < 240 ? [0, intermediate, chroma] : hue < 300 ? [intermediate, 0, chroma] : [chroma, 0, intermediate];
  return '#' + channels.map(channel => Math.round((channel + offset) * 255).toString(16).padStart(2, '0')).join('');
}

/** Smooth radial contour; the guaranteed inner radius keeps the face inside. */
export function blobFromName(name: string | number): ShapeDefinition {
  const random = createNameRandom(name, 'blob');
  const count = 6 + Math.floor(random() * 5);
  const phase = random() * Math.PI * 2;
  const points = Array.from({ length: count }, (_, index) => {
    const angle = phase + index * Math.PI * 2 / count;
    const radius = 34 + random() * 14;
    return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
  });
  const midpoint = (a: typeof points[number], b: typeof points[number]) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const start = midpoint(points[count - 1], points[0]);
  const number = (value: number) => value.toFixed(3);
  let path = `M${number(start.x)} ${number(start.y)}`;
  for (let index = 0;index < count;index++) {
    const end = midpoint(points[index], points[(index + 1) % count]);
    path += ` Q${number(points[index].x)} ${number(points[index].y)} ${number(end.x)} ${number(end.y)}`;
  }
  return { path: path + 'Z', faceBox: { x: .22, y: .28, width: .56, height: .44 } };
}
