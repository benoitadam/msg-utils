"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyRecord = void 0;
const __1 = require("..");
const isEmptyRecord = (record) => {
    if (!(0, __1.isRecord)(record))
        return false;
    for (const _ in record)
        return false;
    return true;
};
exports.isEmptyRecord = isEmptyRecord;
