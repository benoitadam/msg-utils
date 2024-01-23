interface ToBoolean {
    (v: boolean | string | number): boolean;
    (v: any): boolean | undefined;
    <T>(v: any, defVal: T): boolean | T;
}
/**
 * Converts a given value to a boolean, or returns a default value if the conversion is not possible.
 *
 * @function toBoolean
 * @template T
 * @param {any} v - The value to convert to boolean. Can be of type boolean, string, number, or any other type.
 * @param {T|boolean} [defVal] - An optional default value to return if the conversion is not possible. The type of this parameter is either boolean or the type specified by the generic parameter T.
 * @returns {boolean|T|undefined} - Returns a boolean if the conversion is successful. Returns the default value (defVal) if provided and the conversion is not possible. Returns undefined if no default value is provided and the conversion is not possible.
 *
 * @description
 * The function attempts to convert various types of input values to a boolean. For strings, it checks if the string is one of 'true', 'ok', 'on', or '1' (case insensitive). For other non-null/undefined values, it returns the truthiness of the value. If the value is null or undefined, the function returns the provided default value or undefined if no default value is specified.
 *
 * This function also includes an overload:
 * 1. (v: boolean | string | number): boolean - Converts a boolean, string, or number to a boolean.
 * 2. (v: any): boolean | undefined - Converts any value to a boolean or undefined if conversion is not possible.
 * 3. <T>(v: any, defVal: T): boolean | T - Converts any value to a boolean, or returns a default value of type T if conversion is not possible.
 *
 * @example
 * toBoolean(true); // returns true
 * toBoolean("false"); // returns false
 * toBoolean("1"); // returns true
 * toBoolean(0); // returns false
 * toBoolean(null, "default"); // returns "default"
 * toBoolean(undefined); // returns undefined
 */
export declare const toBoolean: ToBoolean;
export {};
