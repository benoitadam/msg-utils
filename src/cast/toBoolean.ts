import isNil from '../check/isNil';
import isString from '../check/isString';

interface ToBoolean {
  (v: any): boolean | undefined;
  <T>(v: any, defVal: T): boolean | T;
}

export default (<T = boolean>(v: any, defVal?: T | boolean): boolean | T | undefined =>
  isString(v)
    ? ['true', 'ok', 'on', '1'].indexOf(String(v).toLowerCase()) !== -1
    : isNil(v)
    ? defVal
    : !!v) as ToBoolean;
