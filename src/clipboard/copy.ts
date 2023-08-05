import { getJson } from '../json/getJson';
import { storage } from '../storage/storage';

export const copy = (value: any): Promise<void> => {
  storage.set('__copy', value);
  if (navigator && navigator.clipboard) {
    return navigator.clipboard.writeText(getJson(value, ''));
  }
  return Promise.resolve();
};
