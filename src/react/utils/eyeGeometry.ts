import type { EyeVariant, FaceStyle } from '../types';

export function getEyeDimensions(variant: EyeVariant, style: FaceStyle) {
  switch (variant) {
    case 'blobatar': return { rx: 6, ry: 15, whites: false, highlight: false };
    case 'dots': return { rx: 5.5, ry: 8, whites: false, highlight: false };
    case 'bright': return { rx: 6.5, ry: 14, whites: false, highlight: true };
    case 'cartoon': return { rx: 12, ry: 15, whites: true, highlight: true };
    case 'kawaii': return { rx: 5, ry: 5.5, whites: false, highlight: false };
    default: return {
      rx: variant === 'oval' ? 7.5 : style === 'cartoon' ? 10.5 : 6.5,
      ry: variant === 'cute' ? 14 : style === 'cartoon' ? 12 : 13,
      whites: style === 'cartoon', highlight: true,
    };
  }
}
