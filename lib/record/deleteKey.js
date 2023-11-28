"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKey = void 0;
const deleteKey = (record, ...keys) => {
    for (const key of keys)
        delete record[key];
    return record;
};
exports.deleteKey = deleteKey;
