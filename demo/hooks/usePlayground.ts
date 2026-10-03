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
} from '../../src';
import { useReducedMotion } from '../../src/react/hooks/useReducedMotion';
import { resolveDemoShape } from '../shapes/resolveDemoShape';
import type { DemoShape } from '../types';
import {
  type PlaygroundConfiguration,
  readSharedConfiguration,
} from '../workbench/configuration';

export function usePlayground() {
  const [initial] = useState(readSharedConfiguration);
  const [shape, setShapeState] = useState<DemoShape>(initial?.shape ?? 'shark');
  const [eyes, setEyes] = useState<EyeVariant>(initial?.face.eyes ?? 'bright');
  const [mouth, setMouth] = useState<MouthVariant>(initial?.face.mouth ?? 'tongue');
  const setShape = (value: DemoShape) => {
    setShapeState(value);
    if (value === 'penguin') {
      setMouth('beak');
    }
  };
  const [eyebrows, setEyebrows] = useState<EyebrowVariant>(
    initial?.face.eyebrows ?? 'expression',
  );
  const face: FaceConfig = { eyes, mouth, eyebrows };
  const [expression, setExpression] = useState<ExpressionName>(
    initial?.expression ?? 'happy',
  );
  const [name, setName] = useState(initial?.name ?? 'Tiburoncito');
  const [fixedColor, setFixedColor] = useState<string | undefined>(initial?.color);
  const color = fixedColor ?? colorFromName(name);
  const [reduced, setReduced] = useState(initial?.reduced ?? false);
  const motionDisabled = useReducedMotion(reduced);
  const [requestedMotion, setMotion] = useState<MotionConfig>(
    initial?.motion ?? {
      idle: true,
      blink: true,
      lookAt: 'cursor',
    },
  );
  const selectedShape = resolveDemoShape(shape);
  const capabilities = getMotionCapabilities(eyes, mouth, resolveExpression(expression));
  const motion: MotionConfig = {
    idle: !motionDisabled && requestedMotion.idle,
    bounce: !motionDisabled && requestedMotion.bounce,
    shake: !motionDisabled && requestedMotion.shake,
    blink: !motionDisabled && capabilities.blink && requestedMotion.blink,
    glance: !motionDisabled && capabilities.lookAt && requestedMotion.glance,
    talking: !motionDisabled && capabilities.talking && requestedMotion.talking,
    lookAt: !motionDisabled && capabilities.lookAt ? requestedMotion.lookAt : undefined,
  };
  const toggle = (key: 'idle' | 'blink' | 'bounce' | 'shake' | 'talking') =>
    setMotion((value) => ({ ...value, [key]: !value[key] }));

  const configuration: PlaygroundConfiguration = {
    shape,
    face,
    expression,
    name,
    color: fixedColor,
    motion: requestedMotion,
    reduced,
  };
  const loadConfiguration = (config: PlaygroundConfiguration) => {
    setShapeState(config.shape);
    setEyes(config.face.eyes);
    setMouth(config.face.mouth);
    setEyebrows(config.face.eyebrows);
    setExpression(config.expression);
    setName(config.name);
    setFixedColor(config.color);
    setMotion(config.motion);
    setReduced(config.reduced);
  };
  return {
    configuration,
    loadConfiguration,
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
