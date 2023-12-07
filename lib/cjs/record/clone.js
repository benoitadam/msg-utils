"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const getKeys_1 = require("./getKeys");
const clone = (obj) => {
    if (typeof obj !== "object" || obj === null)
        return obj;
    let c;
    if (Array.isArray(obj)) {
        c = [];
        for (let i = 0, l = obj.length; i < l; i++) {
            c[i] = (0, exports.clone)(obj[i]);
        }
    }
    else {
        c = {};
        const keys = (0, getKeys_1.getKeys)(obj);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            c[key] = (0, exports.clone)(obj[key]);
        }
    }
    return c;
};
exports.clone = clone;
