import { parseJson } from '../json/parseJson';
import { storage } from '../storage/storage';

export const paste = () => {
  if (navigator && navigator.clipboard) {
    return navigator.clipboard
      .readText()
      .then((v) => parseJson(v, v))
      .catch(() => storage.get('__copy'));
  }
  return Promise.resolve(storage.get('__copy'));
};
