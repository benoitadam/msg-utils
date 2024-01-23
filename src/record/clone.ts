import { getKeys } from './getKeys';

export const clone = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) return obj;
  let c: any;
  if (Array.isArray(obj)) {
    c = [];
    for (let i = 0, l = obj.length; i < l; i++) {
      c[i] = clone(obj[i]);
    }
  } else {
    c = {};
    const keys = getKeys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      c[key] = clone((obj as any)[key]);
    }
  }
  return c as T;
};
