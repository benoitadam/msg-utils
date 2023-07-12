import { isArray } from '../check/isArray';
import { isNil } from '../check/isNil';

interface ToArray {
  <T = any>(v: T[] | T | null | undefined): T[];
  <T = any>(v: any, def: T[]): T[];
}

export const toArray = (<T = any>(v: any, def: T[] = []): T[] =>
  isNil(v) ? def : isArray(v) ? v : [v]) as ToArray;
