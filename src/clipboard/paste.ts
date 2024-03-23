import { parseJson } from '../json/parseJson';
import { storage } from '../storage/storage';

export const paste = async () => {
  try {
    const json = await navigator.clipboard.readText();
    return parseJson(json, json);
  }
  catch(e) {
    return Promise.resolve(storage.get('__copy'));
  }
};
