"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toError = void 0;
/**
 * Converts a given input to an `Error` object. If the input is already an instance of `Error`,
 * it is returned as is. Otherwise, the input is converted to a string and used to create a new `Error` object.
 *
 * @param {any} error - The input to be converted to an `Error` object.
 * @returns {Error} The resulting `Error` object.
 */
const toError = (error) => error instanceof Error ? error : new Error(String(error));
exports.toError = toError;
