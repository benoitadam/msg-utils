interface ToNumber {
    /**
     * toNumber(3.5) -> 3.5
     */
    (v: number): number;
    /**
     * toNumber({}) -> undefined
     * toNumber('x') -> undefined
     * toNumber('5x') -> 5
     * toNumber(3.5) -> 3.5
     * toNumber('3.5') -> 3.5
     * toNumber('3,5') -> 3.5
     */
    (v: any): number | undefined;
    /**
     * toNumber({}, a) -> a
     * toNumber('x', a) -> a
     * toNumber('5x', a) -> 5
     * toNumber(3.5, a) -> 3.5
     * toNumber('3.5', a) -> 3.5
     * toNumber('3,5', a) -> 3.5
     */
    <D>(v: any, nanVal: D): number | D;
}
/**
 * Converts a given input to a number. If the input is a string, it attempts to normalize
 * it by replacing commas with dots and removing non-numeric characters. If the conversion fails
 * or results in an infinite number, a provided fallback value is returned. If no fallback is provided,
 * `undefined` is returned.
 *
 * @template D - The type of the fallback value.
 * @param {any} v - The input to be converted to a number.
 * @param {D} [nanVal] - An optional fallback value to return if the conversion is not successful.
 * @returns {number | D | undefined} The converted number, the fallback value, or `undefined`.
 */
export declare const toNumber: ToNumber;
export {};
