"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyRecord = void 0;
const isRecord_1 = require("./isRecord");
const isEmptyRecord = (record) => {
    if (!(0, isRecord_1.isRecord)(record))
        return false;
    for (const _ in record)
        return false;
    return true;
};
exports.isEmptyRecord = isEmptyRecord;
