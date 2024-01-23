import { isArray } from './isArray';
import { isObject } from './isObject';

export const isRecord = (value: any): value is Record<any, any> =>
  isObject(value) && !isArray(value);
