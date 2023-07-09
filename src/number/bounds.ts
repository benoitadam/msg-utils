import isNumber from '../check/isNumber';

export default (val: number, min?: number, max?: number): number =>
  isNumber(min) && val < min ? min : isNumber(max) && val > max ? max : val;
