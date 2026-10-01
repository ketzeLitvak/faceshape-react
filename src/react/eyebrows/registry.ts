import type { EyebrowVariant } from '../types';
import { angryBrows } from './angry';
import { noneBrows } from './none';
import { raisedBrows } from './raised';
import { sadBrows } from './sad';
import { softBrows } from './soft';
import type { BrowStrategy } from './types';

export const BROW_STRATEGIES = {
  none: noneBrows,
  raised: raisedBrows,
  angry: angryBrows,
  sad: sadBrows,
  soft: softBrows,
} satisfies Record<EyebrowVariant, BrowStrategy>;
