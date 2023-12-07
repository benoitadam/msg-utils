"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChanges = void 0;
const isObject_1 = require("../check/isObject");
const isArray_1 = require("../check/isArray");
const uniq_1 = require("../array/uniq");
const getKeys_1 = require("./getKeys");
const getChanges = (source, target) => {
    if (source === target)
        return undefined;
    if (!(0, isObject_1.isObject)(source) || !(0, isObject_1.isObject)(target) || (0, isArray_1.isArray)(source) || (0, isArray_1.isArray)(target))
        return target;
    const result = {};
    const allKeys = (0, uniq_1.uniq)([...(0, getKeys_1.getKeys)(source), ...(0, getKeys_1.getKeys)(target)]);
    if (allKeys.length === 0)
        return undefined;
    for (const key of allKeys) {
        const sourceChild = source[key];
        const targetChild = target[key];
        if (sourceChild === targetChild)
            continue;
        if (targetChild === undefined) {
            result[key] = undefined;
            continue;
        }
        const changes = (0, exports.getChanges)(sourceChild, targetChild);
        if (changes === undefined)
            continue;
        result[key] = changes;
    }
    return result;
};
exports.getChanges = getChanges;
