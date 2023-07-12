import { isNil } from '../check/isNil';
import { getJson } from '../json/getJson';

export const setStored = <T = any>(key: string, value: T) => {
  const json = isNil(value) ? undefined : getJson(value);
  if (isNil(json)) globalThis.localStorage.removeItem(key);
  else globalThis.localStorage.setItem(key, json);
};
