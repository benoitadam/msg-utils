/**
 * Returns the last item in the array.
 * @example last([3, 4, 5]) === 5
 * @param items
 * @returns
 */
export default <T>(items: T[]) => items[items.length - 1];
