"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
const isArray_1 = require("../check/isArray");
const isNil_1 = require("../check/isNil");
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
exports.toArray = ((v, def = []) => (0, isNil_1.isNil)(v) ? def : (0, isArray_1.isArray)(v) ? v : [v]);
