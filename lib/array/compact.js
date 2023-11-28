"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = void 0;
/**
 * Creates an array with all falsy values removed.
 * @param items
 * @returns
 */
const compact = (value) => value.filter(Boolean);
exports.compact = compact;
