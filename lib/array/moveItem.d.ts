/**
 * Moves an item in an array to a new index.
 * @template T
 * @param {T[]} items - The array to move the item in.
 * @param {T} item - The item to move.
 * @param {number} addIndex - The index to move the item to.
 * @returns {T[]} A new array with the item moved.
 */
export declare const moveItem: <T>(items: T[], item: T, addIndex: number) => T[];
