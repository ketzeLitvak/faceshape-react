import { useState } from 'react';
import {
  colorFromName,
  type ExpressionName,
  type EyebrowVariant,
  type EyeVariant,
  type FaceConfig,
  getMotionCapabilities,
  type MotionConfig,
  type MouthVariant,
  resolveExpression,
  type ShapeName,
} from '../../src';
import { useReducedMotion } from '../../src/react/hooks/useReducedMotion';
import { heart, shark } from '../shapes';

export function usePlayground() {
  const [shape, setShape] = useState<ShapeName | 'heart' | 'shark'>('shark');
  const [eyes, setEyes] = useState<EyeVariant>('bright');
  const [mouth, setMouth] = useState<MouthVariant>('tongue');
  const [eyebrows, setEyebrows] = useState<EyebrowVariant>('expression');
  const face: FaceConfig = { eyes, mouth, eyebrows };
  const [expression, setExpression] = useState<ExpressionName>('happy');
  const [name, setName] = useState('Tiburoncito');
  const [fixedColor, setFixedColor] = useState<string | undefined>();
  const color = fixedColor ?? colorFromName(name);
  const [reduced, setReduced] = useState(false);
  const motionDisabled = useReducedMotion(reduced);
  const [requestedMotion, setMotion] = useState<MotionConfig>({
    idle: true,
    blink: true,
    lookAt: 'cursor',
  });
  const capabilities = getMotionCapabilities(eyes, mouth, resolveExpression(expression));
  const motion: MotionConfig = {
    idle: !motionDisabled && requestedMotion.idle,
    bounce: !motionDisabled && requestedMotion.bounce,
    shake: !motionDisabled && requestedMotion.shake,
    blink: !motionDisabled && capabilities.blink && requestedMotion.blink,
    talking: !motionDisabled && capabilities.talking && requestedMotion.talking,
    lookAt: !motionDisabled && capabilities.lookAt ? requestedMotion.lookAt : undefined,
  };
  const toggle = (key: 'idle' | 'blink' | 'bounce' | 'shake' | 'talking') =>
    setMotion((value) => ({ ...value, [key]: !value[key] }));
  const selectedShape = shape === 'heart' ? heart : shape === 'shark' ? shark : shape;
  return {
    shape,
    setShape,
    eyes,
    setEyes,
    mouth,
    setMouth,
    eyebrows,
    setEyebrows,
    face,
    expression,
    setExpression,
    color,
    fixedColor,
    setFixedColor,
    name,
    setName,
    reduced,
    setReduced,
    motionDisabled,
    capabilities,
    motion,
    setMotion,
    toggle,
    selectedShape,
  };
}
