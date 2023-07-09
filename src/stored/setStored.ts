import isNil from '../check/isNil';
import getJson from '../json/getJson';

export default <T = any>(key: string, value: T) => {
  const json = isNil(value) ? undefined : getJson(value);
  if (isNil(json)) localStorage.removeItem(key);
  else localStorage.setItem(key, json);
};
