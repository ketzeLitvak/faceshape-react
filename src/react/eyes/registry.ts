import type { EyeVariant } from '../types';
import { brightEyes } from './bright';
import { capsuleEyes } from './capsule';
import { cartoonEyes } from './cartoon';
import { closedEyes } from './closed';
import { cuteEyes } from './cute';
import { cyclopsEyes } from './cyclops';
import { dotsEyes } from './dots';
import { eyelashesEyes } from './eyelashes';
import { happyEyes } from './happy';
import { heartEyes } from './heart';
import { joyfulEyes } from './joyful';
import { noneEyes } from './none';
import { ovalEyes } from './oval';
import { roundEyes } from './round';
import { slyEyes } from './sly';
import { softLidsEyes } from './softLids';
import { spiralEyes } from './spiral';
import { starEyes } from './star';
import type { EyeStrategy } from './types';

export const EYE_STRATEGIES: Record<string, EyeStrategy> = {
  none: noneEyes,
  eyelashes: eyelashesEyes,
  heart: heartEyes,
  star: starEyes,
  softLids: softLidsEyes,
  cyclops: cyclopsEyes,
  spiral: spiralEyes,

  round: roundEyes,
  oval: ovalEyes,
  cute: cuteEyes,
  happy: happyEyes,
  closed: closedEyes,
  dots: dotsEyes,
  bright: brightEyes,
  joyful: joyfulEyes,
  cartoon: cartoonEyes,
  sly: slyEyes,
  capsule: capsuleEyes,
} satisfies Record<Exclude<EyeVariant, `custom:${string}`>, EyeStrategy>;
