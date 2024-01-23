"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const str_1 = require("../cast/str");
const isString_1 = require("../check/isString");
/**
 * Sorts an array of items based on a specified property. The function allows for sorting by strings, numbers, or dates.
 *
 * @template T - The type of elements in the array to be sorted.
 * @param {T[]} items - The array of items to be sorted.
 * @param {(item: T) => string | number | Date} [prop=str] - A function that takes an item of type T and returns the property value to sort by. By default, it converts the item to a string.
 * @returns {T[]} The sorted array. The sort is stable, meaning that if two elements are equal according to the comparator function, their order relative to each other remains unchanged.
 *
 * @example
 * // Sorting an array of objects by a number property
 * const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
 * const sorted = sort(items, item => item.value);
 * console.log(sorted); // [{ value: 1 }, { value: 2 }, { value: 3 }]
 *
 * @example
 * // Sorting an array of strings
 * const fruits = ["banana", "cherry", "apple"];
 * const sortedFruits = sort(fruits, fruit => fruit);
 * console.log(sortedFruits); // ["apple", "banana", "cherry"]
 *
 * @description
 * The `sort` function sorts an array of items based on a specified property. It can handle sorting of strings, numbers, and dates. If the property values are strings, it uses `localeCompare` for comparison, ensuring correct sorting for different locales. For non-string values, it converts them to numbers for sorting.
 * This function modifies the original array in place.
 */
const sort = (items, prop = str_1.str) => items.sort((a, b) => {
    const pA = prop(a);
    const pB = prop(b);
    return (0, isString_1.isString)(pA) || (0, isString_1.isString)(pB)
        ? String(pA).localeCompare(String(pB))
        : Number(pA) - Number(pB);
});
exports.sort = sort;
