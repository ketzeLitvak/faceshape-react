import type { FaceStyle } from '../types';

export function defaultDimensions(style: FaceStyle) {
  return {
    rx: style === 'cartoon' ? 10.5 : 6.5,
    ry: style === 'cartoon' ? 12 : 13,
    whites: style === 'cartoon',
    highlight: true,
  };
}
