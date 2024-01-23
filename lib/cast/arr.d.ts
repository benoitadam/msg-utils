/**
 * Converts a given value to an array.
 *
 * This function is generic and works with values of any type. It takes a single argument which can be an array,
 * a single value of any type, or `null`/`undefined`. If the argument is already an array, it is returned as is.
 * If it's a single value (including `null` or `undefined`), the function wraps it in an array. This is useful
 * for ensuring that a value is always processed as an array, even if it's originally a single value or nullish.
 *
 * @param {T[] | T | null | undefined} v - The value to be converted to an array. Can be an existing array,
 *                                          a single value of any type, or null/undefined.
 * @returns {Array<T>} An array containing the input value(s). If the input is `null` or `undefined`,
 *                     it returns an array containing a single `null` or `undefined` element.
 * @template T - The type of the elements in the array. Defaults to `any`.
 *
 * @example
 * // Passing an array
 * arr([1, 2, 3]); // returns [1, 2, 3]
 *
 * @example
 * // Passing a single value
 * arr(1); // returns [1]
 *
 * @example
 * // Passing null or undefined
 * arr(null); // returns [null]
 * arr(undefined); // returns [undefined]
 */
export declare const arr: <T = any>(v: T | T[] | null | undefined) => T[];
