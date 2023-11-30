"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormData = void 0;
const getJson_1 = require("../json/getJson");
exports.toFormData = ((record) => {
    if (!record)
        return undefined;
    if (record instanceof FormData)
        return record;
    const formData = new FormData();
    for (const key in record) {
        let value = record[key];
        if (typeof value !== 'string')
            value = (0, getJson_1.getJson)(value);
        formData.append(key, value);
    }
    return formData;
});
