"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rec = void 0;
const toRecord_1 = require("./toRecord");
/**
 * Converts the provided value to a record, or returns a default value if the conversion is not possible.
 *
 * The function has three overloads:
 * - When a single argument is provided, it returns the argument itself if it can be a record, otherwise undefined.
 * - When a value and a default value are provided, it returns the value if it can be a record, otherwise the default value.
 * - If the provided value is null or undefined, the function returns undefined or the provided default value.
 *
 * @template T - The expected type of the record.
 * @param {T | null | undefined} v - The value to be converted to a record.
 * @returns {T | undefined} - The record or the default value.
 */
const rec = (v) => (0, toRecord_1.toRecord)(v);
exports.rec = rec;
