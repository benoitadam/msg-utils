import isString from '../check/isString';

interface ToNumber {
  (v: any): number | undefined;
  <D>(v: any, nanVal: D): number | D;
}

export default (<D>(v: any, nanVal?: D): number | D | undefined => {
  const clean = isString(v) ? v.replace(/,/g, '.').replace(/[^0-9\-\.]/g, '') : String(v);
  const nbr = clean !== '' ? Number(clean) : Number.NaN;
  return Number.isNaN(nbr) ? nanVal : nbr;
}) as ToNumber;
