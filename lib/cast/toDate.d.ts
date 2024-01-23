interface ToDate {
    (v: any): Date;
    <TDef>(v: any, defVal: TDef): Date | TDef;
    <TDef>(v: any, defVal?: TDef): Date | TDef | undefined;
}
/**
 * Converts a given value to a Date object. If the value is already a Date, it returns the value as-is.
 * If the value is a string or number, it tries to convert it to a Date. If the value is `null` or `undefined`,
 * it returns the current date. Otherwise, it returns a default value if provided.
 *
 * @param {any} v - The value to be converted to a Date.
 * @param {TDef} [defVal] - Optional default value to return if conversion is not possible.
 * @returns {Date | TDef | undefined} - Returns the Date object, the default value, or undefined if no default is provided.
 *
 * @template TDef - The type of the default value.
 *
 * @example
 * // returns a Date object for string input
 * toDate("2023-01-01");
 *
 * @example
 * // returns a Date object for numeric input
 * toDate(1672531200000);
 *
 * @example
 * // returns the current Date for null or undefined input
 * toDate(null);
 *
 * @example
 * // returns the default value if conversion is not possible
 * toDate("invalid-date-string", "default-value");
 */
export declare const toDate: ToDate;
export {};
