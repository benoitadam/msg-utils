import { getJson } from '../json/getJson';
import { storage } from '../storage/storage';

export const copy = async (value: any): Promise<void> => {
  storage.set('__copy', value);
  try {
    await navigator.clipboard.writeText(getJson(value, ''));
  }
  catch(e) {}
};
