/**
 * Calculates the sum of all elements in an array of numbers, optionally adding a specified margin between each element.
 *
 * @param {number[]} list - An array of numbers to be summed.
 * @param {number} [margin=0] - An optional margin to be added between each element in the list. Defaults to 0 if not provided.
 * @returns {number} The total sum of the elements in the array, including the margins between elements if specified.
 */
export const sum = (list: number[], margin?: number) => {
  let r = 0;
  for (const n of list) r += n;
  return r + (list.length - 1) * (margin || 0);
};
