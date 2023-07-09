/**
 * Move an item in an array from an index to a new index.
 * @template T
 * @param {T[]} items - The array to move the item in.
 * @param {T} item - The item to move.
 * @param {number} addIndex - The index to move the item to.
 * @returns {T[]} A new array with the item moved.
 */
export default <T>(items: T[], from: number, to: number) => {
  if (from === to) return items;
  const removes = items.splice(from, 1);
  items.splice(to, 0, removes[0]);
  return items;
};
