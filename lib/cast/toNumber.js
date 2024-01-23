"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = void 0;
const isString_1 = require("../check/isString");
/**
 * Converts a given input to a number. If the input is a string, it attempts to normalize
 * it by replacing commas with dots and removing non-numeric characters. If the conversion fails
 * or results in an infinite number, a provided fallback value is returned. If no fallback is provided,
 * `undefined` is returned.
 *
 * @template D - The type of the fallback value.
 * @param {any} v - The input to be converted to a number.
 * @param {D} [nanVal] - An optional fallback value to return if the conversion is not successful.
 * @returns {number | D | undefined} The converted number, the fallback value, or `undefined`.
 */
exports.toNumber = ((v, nanVal) => {
    const clean = (0, isString_1.isString)(v) ? v.replace(/,/g, '.').replace(/[^0-9\-\.]/g, '') : String(v);
    const nbr = clean !== '' ? Number(clean) : Number.NaN;
    return Number.isNaN(nbr) || !Number.isFinite(nbr) ? nanVal : nbr;
});
