import { isNil } from '../check/isNil';

export const toString = (v: any, def: string = ''): string => (isNil(v) ? def : String(v));
