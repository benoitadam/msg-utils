"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
const isNil_1 = require("../check/isNil");
/**
 * Converts the provided value to a string, or returns a default string if the conversion is not possible.
 *
 * This function checks if the provided value is null or undefined (`isNil`). If it is, the function returns
 * the default string. Otherwise, it converts the value to a string using `String(v)`.
 *
 * @param {any} v - The value to be converted to a string.
 * @param {string} [def=''] - The default string to return if the conversion is not possible.
 * @returns {string} - The converted string or the default string.
 */
const toString = (v, def = '') => ((0, isNil_1.isNil)(v) ? def : String(v));
exports.toString = toString;
