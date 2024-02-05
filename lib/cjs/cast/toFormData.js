"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormData = void 0;
const getJson_1 = require("../json/getJson");
/**
 * A function or method that converts a given `Record<string, any>` or `FormData` object into `FormData`.
 * If the input is already an instance of `FormData`, it is returned as is. If the input is a `Record`,
 * a new `FormData` object is created and populated with the `Record`'s entries. If the input is `null`
 * or `undefined`, the function returns `undefined`.
 *
 * @param {Record<string, any> | FormData | null} [record] - The object to be converted to `FormData`.
 * @returns {FormData | undefined} The resulting `FormData` object or `undefined` if the input is `null` or `undefined`.
 */
exports.toFormData = ((record) => {
    if (!record)
        return undefined;
    if (record instanceof FormData)
        return record;
    const formData = new FormData();
    for (const key in record) {
        let value = record[key];
        if (typeof value !== 'string' &&
            !(typeof File === 'function' && value instanceof File) &&
            !(typeof Blob === 'function' && value instanceof Blob)) {
            value = (0, getJson_1.getJson)(value);
        }
        formData.append(key, value);
    }
    return formData;
});
