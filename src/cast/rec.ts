import { toRecord } from './toRecord';

export const rec = <T = any>(v: T | null | undefined) => toRecord<T>(v);
