import { parseJson } from './parseJson';
import { getJson } from './getJson';

type Writable<T> = { -readonly [P in keyof T]: T[P] };

interface CloneJson {
  <T = any>(v: T): Writable<T> | undefined;
  <T = any>(v: T, defVal: T): Writable<T>;
}

export const cloneJson = (<T>(v: T, defVal?: T): Writable<T> | undefined =>
  parseJson(getJson(v), defVal)) as CloneJson;
