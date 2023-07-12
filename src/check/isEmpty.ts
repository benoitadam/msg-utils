import { isArray } from './isArray';

export const isEmpty = (value: any): boolean =>
  !value || (isArray(value) ? value : Object.keys(value)).length === 0;
