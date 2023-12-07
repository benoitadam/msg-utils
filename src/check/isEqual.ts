import { getJson } from '../json/getJson';
import { getKeys } from '../record/getKeys';
import { isRecord } from './isRecord';

export const isEqual = (a: any, b: any) => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0, l = a.length; i < l; i++) if (!isEqual(a[i], b[i])) return false;
    return true;
  }
  if (a instanceof Object) {
    if (!isRecord(b)) return false;
    if (getKeys(a).length !== getKeys(b).length) return false;
    for (const prop in a) if (!isEqual(a[prop], b[prop])) return false;
    return true;
  }
  return getJson(a) === getJson(b);
};
