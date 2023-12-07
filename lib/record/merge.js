"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const isRecord_1 = require("../check/isRecord");
const getKeys_1 = require("./getKeys");
exports.merge = ((target, changes) => {
    if (!(0, isRecord_1.isRecord)(target) || !(0, isRecord_1.isRecord)(changes))
        return changes;
    const keys = (0, getKeys_1.getKeys)(changes);
    for (const key of keys) {
        const v = changes[key];
        if (v === undefined) {
            delete target[key];
            continue;
        }
        target[key] = (0, exports.merge)(target[key], v);
    }
    return target;
});
