/**
 * Removes an item from an array.
 * @template T
 * @param {T[]} items - The array to remove the item from.
 * @param {T} item - The item to remove.
 * @returns {T[]} A new array with the item removed.
 */
export default <T>(items: T[], item: T) => {
  const i = items.indexOf(item);
  if (i === -1) return items;
  items.splice(i, 1);
  return items;
};
