import { isArray } from './isArray';
import { isEmptyRecord } from './isEmptyRecord';

export const isEmpty = (value: any): boolean =>
  !value || (isArray(value) ? value.length === 0 : isEmptyRecord(value));
