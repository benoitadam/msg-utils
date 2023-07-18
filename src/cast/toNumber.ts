import { isString } from '../check/isString';

interface ToNumber {
  /**
   * toNumber({}) -> undefined
   * toNumber('x') -> undefined
   * toNumber('5x') -> 5
   * toNumber(3.5) -> 3.5
   * toNumber('3.5') -> 3.5
   * toNumber('3,5') -> 3.5
   */
  (v: any): number | undefined;
  
  /**
   * toNumber({}, a) -> a
   * toNumber('x', a) -> a
   * toNumber('5x', a) -> 5
   * toNumber(3.5, a) -> 3.5
   * toNumber('3.5', a) -> 3.5
   * toNumber('3,5', a) -> 3.5
   */
  <D>(v: any, nanVal: D): number | D;
}

export const toNumber = (<D>(v: any, nanVal?: D): number | D | undefined => {
  const clean = isString(v) ? v.replace(/,/g, '.').replace(/[^0-9\-\.]/g, '') : String(v);
  const nbr = clean !== '' ? Number(clean) : Number.NaN;
  return Number.isNaN(nbr) ? nanVal : nbr;
}) as ToNumber;
