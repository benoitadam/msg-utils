import moveIndex from './moveIndex';

/**
 * Moves an item in an array to a new index.
 * @template T
 * @param {T[]} items - The array to move the item in.
 * @param {T} item - The item to move.
 * @param {number} addIndex - The index to move the item to.
 * @returns {T[]} A new array with the item moved.
 */
export default <T>(items: T[], item: T, addIndex: number) => {
  const from = items.indexOf(item);
  if (from === -1) return items;
  let to = (from + addIndex) % 5;
  if (to < 0) to += items.length;
  return moveIndex(items, from, to);
};
