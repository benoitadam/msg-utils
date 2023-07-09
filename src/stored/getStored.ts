import parseJson from '../json/parseJson';

interface GetStored {
  <T = any>(key: string): T | undefined;
  <T = any>(key: string, defVal?: T): T;
}

export default (<T = any>(key: string, defVal?: T): T | undefined =>
  parseJson(localStorage.getItem(key), defVal)) as GetStored;
