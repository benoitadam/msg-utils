interface ToFormData {
    (record: Record<string, any> | FormData): FormData;
    (record?: Record<string, any> | FormData | null): FormData | undefined;
}
/**
 * A function or method that converts a given `Record<string, any>` or `FormData` object into `FormData`.
 * If the input is already an instance of `FormData`, it is returned as is. If the input is a `Record`,
 * a new `FormData` object is created and populated with the `Record`'s entries. If the input is `null`
 * or `undefined`, the function returns `undefined`.
 *
 * @param {Record<string, any> | FormData | null} [record] - The object to be converted to `FormData`.
 * @returns {FormData | undefined} The resulting `FormData` object or `undefined` if the input is `null` or `undefined`.
 */
export declare const toFormData: ToFormData;
export {};
