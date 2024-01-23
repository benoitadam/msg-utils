import { isArray } from '../check/isArray';
import { isNil } from '../check/isNil';

interface ToArray {
  <T = any>(v: T[] | T | null | undefined): T[];
  <T = any>(v: any, def: T[]): T[];
}

/**
 * Converts the input value to an array. If the input is already an array, it is returned as is.
 * If the input is `null` or `undefined`, a default array is returned, which is an empty array by default.
 * If the input is neither an array nor `null`/`undefined`, it is wrapped in an array.
 *
 * @template T - The type of elements expected in the output array.
 * @param {T[] | T | null | undefined} v - The value to be converted to an array.
 * @param {T[]} [def = []] - The default array to return when `v` is `null` or `undefined`.
 * @returns {T[]} - An array of type T.
 *
 * @example
 * // returns [1, 2, 3]
 * toArray([1, 2, 3]);
 *
 * @example
 * // returns [123]
 * toArray(123);
 *
 * @example
 * // returns []
 * toArray(null);
 *
 * @example
 * // returns ['default']
 * toArray(undefined, ['default']);
 */
export const toArray = (<T = any>(v: any, def: T[] = []): T[] =>
  isNil(v) ? def : isArray(v) ? v : [v]) as ToArray;
