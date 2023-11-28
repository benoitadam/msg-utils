"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
/**
 * Returns the last item in the array.
 * @example last([3, 4, 5]) === 5
 * @param items
 * @returns
 */
const last = (items) => items[items.length - 1];
exports.last = last;
