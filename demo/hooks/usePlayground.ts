import { useState } from 'react';
import type { ShapeName, FaceStyle, EyeVariant, MouthVariant, ExpressionName, MotionConfig } from '../../src';
import { heart, shark } from '../shapes';
export function usePlayground() {
  const [shape, setShape] = useState<ShapeName | 'heart' | 'shark'>('shark');
  const [faceStyle, setFaceStyle] = useState<FaceStyle>('soft');
  const [eyes, setEyes] = useState<EyeVariant | ''>('');
  const [mouth, setMouth] = useState<MouthVariant | ''>('');
  const face = { eyes: eyes || undefined, mouth: mouth || undefined };
  const [expression, setExpression] = useState<ExpressionName>('happy');
  const [color, setColor] = useState('#329cb0');
  const [seed, setSeed] = useState('hello');
  const [reduced, setReduced] = useState(false);
  const [motion, setMotion] = useState<MotionConfig>({ idle: true, blink: true, lookAt: 'cursor' });
  const toggle = (key: 'idle' | 'blink' | 'bounce' | 'shake' | 'talking') => setMotion(m => ({ ...m, [key]: !m[key] }));
  const selectedShape = shape === 'heart' ? heart : shape === 'shark' ? shark : shape;
  return { shape, setShape, faceStyle, setFaceStyle, eyes, setEyes, mouth, setMouth, face, expression, setExpression, color, setColor, seed, setSeed, reduced, setReduced, motion, setMotion, toggle, selectedShape };
}
