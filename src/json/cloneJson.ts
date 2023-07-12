import { parseJson } from './parseJson';
import { getJson } from './getJson';

interface CloneJson {
  <T = any>(v: T): T;
  <T = any>(v: T, defVal: T): T;
}

export const cloneJson = (<T>(v: T, defVal?: T): T | undefined =>
  parseJson(getJson(v), defVal)) as CloneJson;
