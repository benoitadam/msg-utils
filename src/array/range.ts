import isNil from '../check/isNil';

interface Range {
  /**
   * Returns an array of min to max item
   * @example range(3, 5) => [3, 4, 5]
   * @param min
   * @param max
   */
  (min: number, max: number): number[];

  /**
   * Returns an array of length item
   * @example range(3) => [0, 1, 2]
   * @param length
   */
  (length: number): number[];
}

const range = ((min: number, max?: number | null) => {
  if (!isNil(max)) return range(max - min + 1).map((i) => i + min);
  return Array.from(Array(min).keys());
}) as Range;

export default range;
