import { toString } from './toString';

/**
 * Converts the provided value to a string, or returns a default string if the conversion is not possible.
 *
 * This function checks if the provided value is null or undefined (`isNil`). If it is, the function returns
 * the default string. Otherwise, it converts the value to a string using `String(v)`.
 *
 * @param {any} v - The value to be converted to a string.
 * @returns {string} - The converted string or the default string.
 */
export const str = (v: any) => toString(v);
