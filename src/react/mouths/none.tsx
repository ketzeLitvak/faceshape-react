import type { MouthStrategy } from './types';

export const noneMouth: MouthStrategy = {
  hidden: true,
  widthScale: 1,
  supportsTalking: false,
  shape: () => ({ path: '', bottom: 68, tongueHeight: 0 }),
};
