import { isNumber } from '../check/isNumber';

export const bounds = (val: number, min?: number, max?: number): number =>
  isNumber(min) && val < min ? min : isNumber(max) && val > max ? max : val;
