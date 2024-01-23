import { isArray } from './isArray';
import { isFunction } from './isFunction';

export const throwIf = <T>(
  value: T,
  check: boolean | ((value: T) => boolean),
  errorMessage: string | string[],
): T => {
  if (isFunction(check) ? check(value) : check) return value;
  throw new Error(isArray(errorMessage) ? errorMessage.join('') : errorMessage);
};
