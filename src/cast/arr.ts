import { toArray } from './toArray';

export const arr = <T = any>(v: T[] | T | null | undefined) => toArray(v);
