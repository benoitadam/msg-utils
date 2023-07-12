import { str } from '../cast/str';
import { isString } from '../check/isString';

export const sort = <T = any>(items: T[], prop: (item: T) => string | number | Date = str) =>
  items.sort((a, b) => {
    const pA = prop(a);
    const pB = prop(b);
    return isString(pA) || isString(pB)
      ? String(pA).localeCompare(String(pB))
      : Number(pA) - Number(pB);
  });
