import { EYE_STRATEGIES } from './eyes/registry';
import type { EyeStrategy } from './eyes/types';
import { MOUTH_STRATEGIES } from './mouths/registry';
import type { MouthStrategy } from './mouths/types';

export type CustomStyleName = `custom:${string}`;
export type CustomEyeStrategy = EyeStrategy & {
  supportsBlink: boolean;
  supportsLookAt: boolean;
};
export type CustomMouthStrategy = MouthStrategy & { supportsTalking: boolean };

function validateName(name: string, registry: object) {
  if (!/^custom:[a-zA-Z][a-zA-Z0-9-]*$/.test(name)) {
    throw new Error('Custom styles need a name such as custom:my-style');
  }
  if (Object.keys(registry).includes(name)) {
    throw new Error(`Style already registered: ${name}`);
  }
}

/** Register once at module initialization, on both server and client. No built-in overrides. */
export function registerEyeStyle(
  name: CustomStyleName,
  strategy: CustomEyeStrategy,
): CustomStyleName {
  validateName(name, EYE_STRATEGIES);
  if (
    typeof strategy.render !== 'function' ||
    typeof strategy.isClosed !== 'function' ||
    typeof strategy.supportsBlink !== 'boolean' ||
    typeof strategy.supportsLookAt !== 'boolean' ||
    !strategy.dimensions ||
    ![
      strategy.dimensions.rx,
      strategy.dimensions.ry,
      strategy.gazeDistance,
      strategy.browBaseline,
    ].every(Number.isFinite) ||
    strategy.dimensions.rx < 0 ||
    strategy.dimensions.ry < 0
  ) {
    throw new Error(
      'Invalid eye strategy: renderer, dimensions and motion capabilities are required',
    );
  }
  EYE_STRATEGIES[name] = Object.freeze({
    ...strategy,
    dimensions: Object.freeze({ ...strategy.dimensions }),
  });
  return name;
}

export function registerMouthStyle(
  name: CustomStyleName,
  strategy: CustomMouthStrategy,
): CustomStyleName {
  validateName(name, MOUTH_STRATEGIES);
  if (
    typeof strategy.shape !== 'function' ||
    typeof strategy.supportsTalking !== 'boolean' ||
    !Number.isFinite(strategy.widthScale) ||
    strategy.widthScale <= 0
  ) {
    throw new Error(
      'Invalid mouth strategy: shape, positive width scale and talking capability are required',
    );
  }
  MOUTH_STRATEGIES[name] = Object.freeze({ ...strategy });
  return name;
}

export function getEyeStyleNames(): string[] {
  return Object.keys(EYE_STRATEGIES);
}
export function getMouthStyleNames(): string[] {
  return Object.keys(MOUTH_STRATEGIES);
}
