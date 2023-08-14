import { isRecord } from '..';

export const isEmptyRecord = (record: any): boolean => {
  if (!isRecord(record)) return false;
  for (const _ in record) return false;
  return true;
};