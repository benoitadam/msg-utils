import { getJson } from '../json/getJson';
import { valueBy } from '../record/groupBy';

/**
 * Creates a unique array of elements, based on a JSON string representation of each element.
 *
 * This function takes an array of elements and returns a new array with duplicates removed.
 * It uses a JSON string representation of each element for comparison. This means that objects
 * and arrays are considered duplicates if they are structurally identical, even if they are
 * different instances.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which to create a unique set of elements.
 * @returns {T[]} A new array containing only one instance of each element in the original array.
 *
 * @example
 * // returns [{ id: 1 }, { id: 2 }]
 * uniq([{ id: 1 }, { id: 1 }, { id: 2 }]);
 *
 * @example
 * // returns [[1, 2], [3, 4]]
 * uniq([[1, 2], [1, 2], [3, 4]]);
 */
export const uniq = <T>(arr: T[]): T[] => Object.values(valueBy(arr, (v) => getJson(v))) as T[];
