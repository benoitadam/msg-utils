import { isNotNull } from '..';
import { tryCatch } from '../cast/tryCatch';

interface ParseJson {
  <T = any>(v: any): T | undefined;
  <T = any, U = any>(v: any, def: U): T | U;
}

export const parseJson = (<T, U>(v: any, def?: U): T | U | undefined =>
  tryCatch(() => (isNotNull(v) ? (JSON.parse(v) as T) : def), def)) as ParseJson;
