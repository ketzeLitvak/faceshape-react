import type { MouthStrategy } from './types';

export const beakMouth: MouthStrategy = {
  widthScale: 1,
  solidFill: '#efa64f',
  supportsTalking: false,
  shape: () => ({
    path: 'M38 62 Q50 56 62 62 L50 75Z',
    bottom: 75,
    tongueHeight: 0,
  }),
};
