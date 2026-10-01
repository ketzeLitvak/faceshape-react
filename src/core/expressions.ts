import { clamp } from './math';
import type { ExpressionDefinition, ExpressionName, FaceGeometry } from './types';

export const DEFAULT_FACE: Readonly<FaceGeometry> = Object.freeze({
  eyeOpen: 1,
  eyeCurve: 0,
  eyeAngle: 0,
  eyeSpacing: 24,
  pupilSize: 4.2,
  mouthWidth: 30,
  mouthCurve: 0,
  mouthOpen: 0,
  browAngle: 0,
  browLift: 0,
  browOpacity: 0,
});

export const EXPRESSIONS: Readonly<Record<ExpressionName, Readonly<FaceGeometry>>> =
  Object.freeze({
    neutral: Object.freeze({ ...DEFAULT_FACE }),
    happy: Object.freeze({
      ...DEFAULT_FACE,
      eyeOpen: 0.95,
      eyeCurve: 1,
      mouthCurve: 0.8,
      mouthOpen: 0.85,
      mouthWidth: 36,
    }),
    sad: Object.freeze({
      ...DEFAULT_FACE,
      eyeOpen: 0.75,
      eyeCurve: -0.7,
      mouthCurve: -0.85,
      browAngle: -15,
      browLift: 2,
      browOpacity: 1,
    }),
    angry: Object.freeze({
      ...DEFAULT_FACE,
      eyeOpen: 0.65,
      eyeAngle: 9,
      mouthCurve: -0.25,
      mouthWidth: 26,
      browAngle: 20,
      browOpacity: 1,
    }),
    surprised: Object.freeze({
      ...DEFAULT_FACE,
      eyeOpen: 1.2,
      mouthWidth: 20,
      mouthOpen: 1,
      browLift: -5,
      browOpacity: 1,
    }),
    sleepy: Object.freeze({
      ...DEFAULT_FACE,
      eyeOpen: 0.12,
      mouthWidth: 18,
      mouthOpen: 0.12,
      browLift: 2,
    }),
  });
const limits: Record<keyof FaceGeometry, [number, number]> = {
  eyeOpen: [0, 1.5],
  eyeCurve: [-1, 1],
  eyeAngle: [-30, 30],
  eyeSpacing: [15, 30],
  pupilSize: [1, 6],
  mouthWidth: [8, 50],
  mouthCurve: [-1, 1],
  mouthOpen: [0, 1],
  browAngle: [-35, 35],
  browLift: [-10, 10],
  browOpacity: [0, 1],
};

export function resolveExpression(
  expression: ExpressionName | ExpressionDefinition = 'neutral',
): FaceGeometry {
  const source =
    typeof expression === 'string'
      ? EXPRESSIONS[expression]
      : { ...DEFAULT_FACE, ...expression };
  if (!source) {
    throw new Error(`Unknown expression: ${expression}`);
  }
  const result = { ...DEFAULT_FACE };
  for (const key of Object.keys(result) as (keyof FaceGeometry)[]) {
    const value = source[key];
    if (!Number.isFinite(value)) {
      throw new Error(`Invalid expression parameter: ${key}`);
    }
    result[key] = clamp(value, ...limits[key]);
  }
  return result;
}

export function defineExpression(expression: ExpressionDefinition): FaceGeometry {
  return resolveExpression(expression);
}
