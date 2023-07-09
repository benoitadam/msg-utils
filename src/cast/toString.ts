import isNil from '../check/isNil';

export default (v: any, def: string = ''): string => (isNil(v) ? def : String(v));
