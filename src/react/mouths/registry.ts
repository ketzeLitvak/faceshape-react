import type { MouthVariant } from '../types';
import { catMouth } from './cat';
import { frownMouth } from './frown';
import { gentleMouth } from './gentle';
import { grinMouth } from './grin';
import { joyfulMouth } from './joyful';
import { neutralMouth } from './neutral';
import { openMouth } from './open';
import { sharkMouth } from './shark';
import { smallMouth } from './small';
import { smileMouth } from './smile';
import { smirkMouth } from './smirk';
import { tongueMouth } from './tongue';
import { toothyMouth } from './toothy';
import type { MouthStrategy } from './types';

export const MOUTH_STRATEGIES = {
  smile: smileMouth,
  frown: frownMouth,
  neutral: neutralMouth,
  open: openMouth,
  grin: grinMouth,
  small: smallMouth,
  gentle: gentleMouth,
  tongue: tongueMouth,
  joyful: joyfulMouth,
  toothy: toothyMouth,
  shark: sharkMouth,
  smirk: smirkMouth,
  cat: catMouth,
} satisfies Record<MouthVariant, MouthStrategy>;
