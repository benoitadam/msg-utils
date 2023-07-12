import { parseJson } from '../json/parseJson';
import { getStored } from '../stored/getStored';

export const paste = () => {
  if (navigator && navigator.clipboard) {
    return navigator.clipboard
      .readText()
      .then((v) => parseJson(v, v))
      .catch(() => getStored('__clipboard'));
  }
  return Promise.resolve(getStored('__clipboard'));
};
