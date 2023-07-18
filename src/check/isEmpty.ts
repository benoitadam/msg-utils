import { isArray } from './isArray';

const isRecordEmpty = (record) => {
  for (const _ in record) return false;
  return true;
};

export const isEmpty = (value: any): boolean =>
  !value || (isArray(value) ? value.length === 0 : isRecordEmpty(value));
