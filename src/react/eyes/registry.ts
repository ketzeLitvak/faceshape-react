import type { EyeVariant } from '../types';
import { brightEyes } from './bright';
import { capsuleEyes } from './capsule';
import { cartoonEyes } from './cartoon';
import { closedEyes } from './closed';
import { cuteEyes } from './cute';
import { dotsEyes } from './dots';
import { happyEyes } from './happy';
import { joyfulEyes } from './joyful';
import { ovalEyes } from './oval';
import { roundEyes } from './round';
import { slyEyes } from './sly';
import type { EyeStrategy } from './types';

export const EYE_STRATEGIES = {
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
} satisfies Record<EyeVariant, EyeStrategy>;
