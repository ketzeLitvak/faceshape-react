import type { MouthVariant } from '../types';
import { beakMouth } from './beak';
import { catMouth } from './cat';
import { gentleMouth } from './gentle';
import { joyfulMouth } from './joyful';
import { noneMouth } from './none';
import { sharkMouth } from './shark';
import { smallMouth } from './small';
import { smirkMouth } from './smirk';
import { standardMouth } from './standard';
import { tongueMouth } from './tongue';
import { toothyMouth } from './toothy';
import type { MouthStrategy } from './types';
import { wideMouth } from './wide';

export const MOUTH_STRATEGIES: Record<string, MouthStrategy> = {
  none: noneMouth,
  beak: beakMouth,
  standard: standardMouth,
  wide: wideMouth,
  small: smallMouth,
  gentle: gentleMouth,
  tongue: tongueMouth,
  joyful: joyfulMouth,
  toothy: toothyMouth,
  shark: sharkMouth,
  smirk: smirkMouth,
  cat: catMouth,
} satisfies Record<Exclude<MouthVariant, `custom:${string}`>, MouthStrategy>;
